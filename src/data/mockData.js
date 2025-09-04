export const salesData = [
  { name: 'Feb', sales: 200000 },
  { name: 'Mar', sales: 300000 },
  { name: 'Apr', sales: 500000 },
  { name: 'May', sales: 250000 },
  { name: 'Jun', sales: 400000 },
  { name: 'Jul', sales: 450000 },
  { name: 'Aug', sales: 520000 },
];

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