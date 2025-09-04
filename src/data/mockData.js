export const stores = [
  { 
    id: 1,
    name: 'Fresh Groceries', 
    description: 'Organic fruits, vegetables, and daily essentials.',
    products: [
      { id: 101, name: 'Fresh Apples', price: 150.00, originalPrice: null, stock: 100, category: 'Fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b5cbd6?w=200&h=200&fit=crop', description: 'Crisp and juicy apples, perfect for a healthy snack or baking.', rating: 4.5, reviews: 120, storeId: 1 },
      { id: 102, name: 'Organic Milk', price: 80.00, originalPrice: 90.00, stock: 50, category: 'Dairy', image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=200&h=200&fit=crop', description: 'Fresh, creamy organic milk from grass-fed cows.', rating: 4, reviews: 95, storeId: 1 },
      { id: 103, name: 'Avocados', price: 120.00, originalPrice: null, stock: 75, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=200&fit=crop', description: 'Creamy and delicious avocados.', rating: 5, reviews: 300, storeId: 1 },
    ]
  },
  { 
    id: 2,
    name: 'Local Bakery', 
    description: 'Freshly baked bread, cakes, and pastries.',
    products: [
      { id: 201, name: 'Sourdough Bread', price: 250.00, originalPrice: null, stock: 30, category: 'Bakery', image: 'https://images.unsplash.com/photo-1534620808146-d33874f689d8?w=200&h=200&fit=crop', description: 'Artisanal sourdough bread with a chewy crust.', rating: 5, reviews: 250, storeId: 2 },
      { id: 202, name: 'Croissants', price: 100.00, originalPrice: 120.00, stock: 60, category: 'Bakery', image: 'https://images.unsplash.com/photo-1598373154423-0c41813df157?w=200&h=200&fit=crop', description: 'Buttery and flaky, fresh from the oven.', rating: 4.5, reviews: 150, storeId: 2 },
    ]
  },
];

export const allProducts = stores.flatMap(store => store.products);

export const mockOrders = [
    { 
      id: '#BN5214', 
      customer: { name: 'Aarav Sharma', email: 'aarav@example.com' },
      customerUsername: 'aarav', // Keeping for now, will remove later if not used
      customerEmail: 'aarav@example.com', // Added for linking to user by email
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
      customerUsername: 'priya', // Keeping for now, will remove later if not used
      customerEmail: 'priya@example.com', // Added for linking to user by email
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
      customerUsername: 'rohan', // Keeping for now, will remove later if not used
      customerEmail: 'rohan@example.com', // Added for linking to user by email
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

// New mock data for Admin Dashboard
export const adminDashboardData = {
  totalRevenue: 3050000, // ₹30,50,000
  activeUsers: 908,
  vendorStatus: [
    { name: 'Active', value: 85, color: '#4CAF50' }, // Green
    { name: 'Inactive', value: 24, color: '#FFC107' }, // Yellow
    { name: 'Offline', value: 30, color: '#F44336' }, // Red
  ],
  userStatus: [
    { name: 'Active', value: 850, color: '#2196F3' }, // Blue
    { name: 'Inactive', value: 58, color: '#607D8B' }, // Grey
  ],
  orderCompletion: [
    { name: 'Pending', value: 150, color: '#FFC107' }, // Yellow
    { name: 'Completed', value: 850, color: '#4CAF50' }, // Green
  ],
  salesTrend: [
    { name: 'Monthly', sales: 450000, color: '#00BCD4' }, // Cyan
    { name: 'Yearly', sales: 2850000, color: '#2196F3' }, // Blue
  ],
};

export const mockUsers = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', password: 'password123', role: 'user', isActive: true },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', password: 'password123', role: 'user', isActive: true },
  { id: 3, name: 'Rohan Mehta', email: 'rohan@example.com', password: 'password123', role: 'user', isActive: true },
  { id: 4, name: 'Vendor One', email: 'vendor1@example.com', password: 'vendor123', role: 'vendor', storeId: 1, storeName: 'Fresh Groceries', isActive: true },
  { id: 5, name: 'Vendor Two', email: 'vendor2@example.com', password: 'vendor123', role: 'vendor', storeId: 2, storeName: 'Local Bakery', isActive: true },
  { id: 6, name: 'Inactive User', email: 'inactive@example.com', password: 'password123', role: 'user', isActive: false },
];