export const stores = [
  { 
    id: 1,
    name: 'Fresh Groceries', 
    description: 'Organic fruits, vegetables, and daily essentials.',
    products: [
      { id: 101, name: 'Fresh Apples', price: 2.99, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b5cbd6?w=200&h=200&fit=crop', description: 'Crisp and juicy apples, perfect for a healthy snack or baking.', rating: 4.5, reviews: 120 },
      { id: 102, name: 'Organic Milk', price: 3.99, image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=200&h=200&fit=crop', description: 'Fresh, creamy organic milk from grass-fed cows.', rating: 4, reviews: 95 },
      { id: 103, name: 'Avocados', price: 1.99, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=200&fit=crop', description: 'Creamy and delicious avocados.', rating: 5, reviews: 300 },
    ]
  },
  { 
    id: 2,
    name: 'Local Bakery', 
    description: 'Freshly baked bread, cakes, and pastries.',
    products: [
      { id: 201, name: 'Sourdough Bread', price: 4.50, image: 'https://images.unsplash.com/photo-1534620808146-d33874f689d8?w=200&h=200&fit=crop', description: 'Artisanal sourdough bread with a chewy crust.', rating: 5, reviews: 250 },
      { id: 202, name: 'Croissants', price: 2.50, image: 'https://images.unsplash.com/photo-1598373154423-0c41813df157?w=200&h=200&fit=crop', description: 'Buttery and flaky, fresh from the oven.', rating: 4.5, reviews: 150 },
    ]
  },
  { 
    id: 3,
    name: 'The Corner Butcher', 
    description: 'High-quality, locally sourced meats and poultry.',
    products: [
        { id: 301, name: 'Ribeye Steak', price: 15.99, image: 'https://images.unsplash.com/photo-1603048200690-54885434b4a2?w=200&h=200&fit=crop', description: 'Aged ribeye, perfect for grilling.', rating: 5, reviews: 180 },
    ]
  },
  { 
    id: 4,
    name: 'Morning Brew Cafe', 
    description: 'Artisanal coffee, teas, and delicious breakfast bites.',
    products: [
        { id: 401, name: 'Espresso Beans', price: 12.50, image: 'https://images.unsplash.com/photo-1511920183353-3c7c95a5742a?w=200&h=200&fit=crop', description: 'Rich and aromatic whole coffee beans.', rating: 4.8, reviews: 220 },
    ]
  },
];

export const allProducts = stores.flatMap(store => store.products);

export const mockOrders = [
    { 
      id: '#1234', 
      items: [
        { ...allProducts.find(p => p.id === 101), quantity: 2 }, // 2 Apples
        { ...allProducts.find(p => p.id === 201), quantity: 1 }, // 1 Sourdough
      ],
      total: (2.99 * 2) + 4.50, 
      status: 'Out for Delivery' 
    },
    { 
      id: '#1235', 
      items: [
        { ...allProducts.find(p => p.id === 102), quantity: 1 }, // 1 Milk
      ],
      total: 3.99, 
      status: 'Delivered' 
    },
];