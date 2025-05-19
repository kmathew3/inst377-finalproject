import { searchProducts } from './api.js';

const cart = [];

function updateCartDisplay() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = cart.map(item => `
    <li>
      ${item.productId} - Qty: ${item.quantity}
      <button data-id="${item.productId}" class="remove-btn">Remove</button>
    </li>
  `).join('');

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const index = cart.findIndex(i => i.productId === id);
      if (index > -1) {
        cart.splice(index, 1);
        updateCartDisplay();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const output = document.querySelector('#order-results');
  output.innerHTML = 'Loading popular items...';

  try {
    const data = await searchProducts('snacks');
    output.innerHTML = data.data.map(item => `
      <div>
        <strong>${item.description}</strong> - ${item.brand}
        <button data-id="${item.productId}" class="add-to-cart">Add to Cart</button>
      </div>
    `).join('');

fetch('/api/orders')
  .then(res => res.json())
  .then(data => {
    const pastOrdersDiv = document.createElement('div');
    pastOrdersDiv.innerHTML = '<h3>Past Orders</h3>' + data.map(order => `
      <div>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Items:</strong> ${order.items.map(i => `${i.productId} x${i.quantity}`).join(', ')}</p>
        <p><strong>Delivery:</strong> ${order.delivery_method}</p>
        <hr>
      </div>
    `).join('');
    document.body.appendChild(pastOrdersDiv);
  })
  .catch(err => {
    console.error('Failed to load past orders:', err);
  });

    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const existing = cart.find(i => i.productId === id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ productId: id, quantity: 1 });
        }
        updateCartDisplay();
      });
    });
  } catch (e) {
    output.innerHTML = 'Failed to load products.';
  }

  const button = document.getElementById('place-order');
  button.addEventListener('click', async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const order = {
      items: cart,
      locationId: '70600092',
      deliveryMethod: 'curbside'
    };

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      const result = await res.json();
      if (res.ok) {
        alert(`Order placed! Order ID: ${result.orderId}`);
        cart.length = 0;
        updateCartDisplay();
      } else {
        alert('Failed to place order: ' + result.error);
      }
    } catch (err) {
      console.error('Order error:', err);
      alert('An error occurred while placing the order.');
    }
  });
});