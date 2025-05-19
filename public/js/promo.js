document.addEventListener('DOMContentLoaded', () => {
  const promos = [
    { title: 'Buy 1 Get 1 Free: Chips', discount: '50%' },
    { title: '20% Off Frozen Meals', discount: '20%' },
  ];

  const promoSection = document.querySelector('#promo-section');
  promoSection.innerHTML = promos.map(p => `
    <div>
      <h3>${p.title}</h3>
      <p>Discount: ${p.discount}</p>
    </div>
  `).join('');
});

