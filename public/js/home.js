document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/featured')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('featured-products');
      
      if (data && data.length) {
        data.forEach(product => {
          console.log(product);

          const price = product.items && product.items[0] && product.items[0].priceInfo && product.items[0].priceInfo.regularPrice;
          
          const div = document.createElement('div');
          div.innerHTML = `
            <h3>${product.description || 'No description available'}</h3>
            <p>Price: $${price ? price : 'N/A'}</p>
          `;
          container.appendChild(div);
        });
      } else {
        container.innerHTML = '<p>No featured products available</p>';
      }
    })
    .catch(err => {
      console.error('Error fetching featured products:', err);
      const container = document.getElementById('featured-products');
      container.innerHTML = '<p>Failed to load featured products.</p>';
    });
});