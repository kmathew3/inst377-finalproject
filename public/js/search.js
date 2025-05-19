import { searchProducts } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const resultsDiv = document.getElementById('results');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    resultsDiv.innerHTML = 'Loading...';

    try {
      const data = await searchProducts(query); // this hits /api/search?query=...
      const products = data.data;

      if (!Array.isArray(products) || products.length === 0) {
        resultsDiv.innerHTML = '<p>No products found.</p>';
        return;
      }

      resultsDiv.innerHTML = products.map(product => {
        const name = product.description || product.productId || 'Unnamed Product';
        const price = product.items?.[0]?.price?.regular || 'N/A';
        const promoPrice = product.items?.[0]?.price?.promo;
        const availability = product.items?.[0]?.fulfillment?.inStore?.available ? 'In Stock' : 'Out of Stock';
        const aisle = product.aisleLocations?.[0]?.description || 'Not Available';

        return `
          <div class="product-item">
            <strong>${name}</strong><br>
            Brand: ${product.brand}<br>
            Price: $${promoPrice ?? price}<br>
            Availability: ${availability}<br>
            Aisle: ${aisle}<br>
            <button>Add to Cart</button>
            <hr>
          </div>
        `;
      }).join('');
    } catch (err) {
      console.error('Search error:', err);
      resultsDiv.innerHTML = `<p>Error: ${err.message}</p>`;
    }
  });
});

const ctx = document.getElementById('categoryChart').getContext('2d');

const chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Dairy', 'Bakery', 'Produce'],
        datasets: [{
            label: 'Product Category Breakdown',
            data: [10, 5, 8],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
        }]
    }
});