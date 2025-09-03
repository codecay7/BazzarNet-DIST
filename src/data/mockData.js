export const stores = [
  { 
    id: 1,
    name: 'Fresh Groceries', 
    description: 'Organic fruits, vegetables, and daily essentials.',
    products: [
      { id: 101, name: 'Fresh Apples', price: 150.00, originalPrice: null, stock: 100, category: 'Fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b5cbd6?w=200&h=200&fit=crop', description: 'Crisp and juicy apples, perfect for a healthy snack or baking.', rating: 4.5, reviews: 120 },
      { id: 102, name: 'Organic Milk', price: 80.00, originalPrice: 90.00, stock: 50, category: 'Dairy', image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=200&h=200&fit=crop', description: 'Fresh, creamy organic milk from grass-fed cows.', rating: 4, reviews: 95 },
      { id: 103, name: 'Avocados', price: 120.00, originalPrice: null, stock: 75, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=200&fit=crop', description: 'Creamy and delicious avocados.', rating: 5, reviews: 300 },
    ]
  },
  { 
    id: 2,
    name: 'Local Bakery', 
    description: 'Freshly baked bread, cakes, and pastries.',
    products: [
      { id: 201, name: 'Sourdough Bread', price: 250.00, originalPrice: null, stock: 30, category: 'Bakery', image: 'https://images.unsplash.com/photo-1534620808146-d33874f689d8?w=200&h=200&fit=crop', description: 'Artisanal sourdough bread with a chewy crust.', rating: 5, reviews: 250 },
      { id: 202, name: 'Croissants', price: 100.00, originalPrice: 120.00, stock: 60, category: 'Bakery', image: 'https://images.unsplash.com/photo-1598373154423-0c41813df157?w=200&h=200&fit=crop', description: 'Buttery and flaky, fresh from the oven.', rating: 4.5, reviews: 150 },
    ]
  },
];

export const allProducts = stores.flatMap(store => store.products);

export const mockOrders = [
    { 
      id: '#BN5214', 
      customer: { name: 'Aarav Sharma', email: 'aarav@example.com' },
      date: '2025-08-04',
      shipping: { trackingNumber: 'TRK123456', carrier: 'FedEx' },
      notes: 'Customer requested express delivery.',
      items: [
        { ...allProducts.find(p => p.id === 101), quantity: 2 },
        { ...allProducts.find(p => p.id === 201), quantity: 1 },
      ],
      total: (150.00 * 2) + 250.00, 
      status: 'Shipped' 
    },
    { 
      id: '#BN5215', 
      customer: { name: 'Priya Patel', email: 'priya@example.com' },
      date: '2025-08-03',
      shipping: { trackingNumber: 'TRK654321', carrier: 'Blue Dart' },
      notes: '',
      items: [
        { ...allProducts.find(p => p.id === 102), quantity: 1 },
      ],
      total: 80.00, 
      status: 'Delivered' 
    },
    { 
      id: '#BN5216', 
      customer: { name: 'Rohan Mehta', email: 'rohan@example.com' },
      date: '2025-08-05',
      shipping: { trackingNumber: 'TRK789012', carrier: 'Delhivery' },
      notes: '',
      items: [
        { ...allProducts.find(p => p.id === 103), quantity: 2 },
        { ...allProducts.find(p => p.id === 202), quantity: 1 },
      ],
      total: (120.00 * 2) + 100.00, 
      status: 'Pending' 
    },
];

export const mockPayments = [
  { id: 'PAY101', orderId: '#BN5214', amount: 550.00, date: '2025-08-05', status: 'Paid' },
  { id: 'PAY102', orderId: '#BN5215', amount: 80.00, date: '2025-08-04', status: 'Paid' },
  { id: 'PAY103', orderId: '#BN5216', amount: 340.00, date: '2025-08-06', status: 'Pending' },
];

// New mock data for the vendor dashboard
export const dashboardStats = {
  totalRevenue: { value: '₹12,34,567', change: '+10% this month' },
  totalOrders: { value: '1,234', change: '+5% this month' },
  newCustomers: { value: '789', change: '+8% this month' },
  products: { value: '56', change: '-2 this month', changeType: 'decrease' },
};

export const salesData = [
  { name: 'Feb', sales: 200000 },
  { name: 'Mar', sales: 300000 },
  { name: 'Apr', sales: 500000 },
  { name: 'May', sales: 250000 },
  { name: 'Jun', sales: 400000 },
  { name: 'Jul', sales: 450000 },
  { name: 'Aug', sales: 520000 },
];

export const topProductsData = [
  { name: 'Apples', sales: 150 },
  { name: 'Sourdough', sales: 98 },
  { name: 'Milk', sales: 120 },
];