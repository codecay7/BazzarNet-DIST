import Joi from 'joi';

// Schema for user (customer) registration
const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Name is required.',
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name cannot exceed 50 characters.',
    'any.required': 'Name is required.',
  }),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'in'] } }).required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Please enter a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
    'any.required': 'Password is required.',
  }),
  phone: Joi.string().pattern(/^\+?\d{10,15}$/).messages({
    'string.pattern.base': 'Phone number is invalid.',
  }).allow(''), // Allow empty string for optional fields
  address: Joi.object({
    houseNo: Joi.string().trim().allow(''),
    landmark: Joi.string().trim().allow(''),
    city: Joi.string().trim().allow(''),
    state: Joi.string().trim().allow(''),
    pinCode: Joi.string().pattern(/^\d{6}$/).messages({
      'string.pattern.base': 'Pin Code must be 6 digits.',
    }).allow(''),
  }).default({}), // Default to empty object if not provided
});

// Schema for vendor registration
const registerVendorSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Full Name is required.',
    'string.min': 'Full Name must be at least 3 characters long.',
    'string.max': 'Full Name cannot exceed 50 characters.',
    'any.required': 'Full Name is required.',
  }),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'in'] } }).required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Please enter a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
    'any.required': 'Password is required.',
  }),
  storeName: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Business Name is required.',
    'string.min': 'Business Name must be at least 3 characters long.',
    'string.max': 'Business Name cannot exceed 100 characters.',
    'any.required': 'Business Name is required.',
  }),
  businessDescription: Joi.string().min(10).max(500).required().messages({
    'string.empty': 'Business Description is required.',
    'string.min': 'Business Description must be at least 10 characters long.',
    'string.max': 'Business Description cannot exceed 500 characters.',
    'any.required': 'Business Description is required.',
  }),
  category: Joi.string().valid('Groceries', 'Bakery', 'Butcher', 'Cafe', 'Electronics', 'Furniture', 'Decor', 'Clothing', 'Other').required().messages({
    'string.empty': 'Category is required.',
    'any.only': 'Please select a valid category.',
    'any.required': 'Category is required.',
  }),
  phone: Joi.string().pattern(/^\+?\d{10,15}$/).required().messages({
    'string.empty': 'Phone number is required.',
    'string.pattern.base': 'Phone number is invalid.',
    'any.required': 'Phone number is required.',
  }),
  pan: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).required().messages({
    'string.empty': 'PAN is required.',
    'string.pattern.base': 'Invalid PAN format.',
    'any.required': 'PAN is required.',
  }),
  gst: Joi.string().pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).messages({
    'string.pattern.base': 'Invalid GST format.',
  }).allow(''),
  address: Joi.object({
    houseNo: Joi.string().trim().required().messages({ 'string.empty': 'House No. is required.' }),
    landmark: Joi.string().trim().allow(''),
    city: Joi.string().trim().required().messages({ 'string.empty': 'City is required.' }),
    state: Joi.string().trim().required().messages({ 'string.empty': 'State is required.' }),
    pinCode: Joi.string().pattern(/^\d{6}$/).required().messages({
      'string.empty': 'Pin Code is required.',
      'string.pattern.base': 'Pin Code must be 6 digits.',
    }),
  }).required().messages({
    'object.base': 'Address is required.',
    'any.required': 'Address is required.',
  }),
});

// Schema for login (common for all roles)
const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'in'] } }).required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Please enter a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required.',
    'any.required': 'Password is required.',
  }),
});

export { registerUserSchema, registerVendorSchema, loginSchema };