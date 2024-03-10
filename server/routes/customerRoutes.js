// routes/customers.js
import express from 'express';
import {
  createCustomerController,
  getAllCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  deleteCustomerController,
} from '../controller/customerController.js';

const router = express.Router();

// Create a new customer
router.post('/customers', createCustomerController);

// Get all customers
router.get('/customers',  getAllCustomersController);

// Get a specific customer by ID
router.get('/customers/:id', getCustomerByIdController);

// Update a customer by ID
router.put('/customers/:id', updateCustomerController);

// Delete a customer by ID
router.delete('/customers/:id', deleteCustomerController);

export default router;
