import Customer from '../models/Customer.js';
import generateRandomId from '../utils/generateRandomId.js';

// Controller to create a new customer
export const createCustomerController = async (req, res) => {
  try {
    const randomId = generateRandomId();
    const newCustomer = new Customer({ id: randomId, ...req.body });
    const savedCustomer = await newCustomer.save();
    res.status(201).json({ success: true, customer: savedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating customer', error });
  }
};

// Controller to get all customers
export const getAllCustomersController = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ success: true, customers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error getting customers', error });
  }
};

// Controller to get a customer by ID
export const getCustomerByIdController = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findOne({ id: customerId });
    
    if (customer) {
      res.status(200).json({ success: true, customer });
    } else {
      res.status(404).json({ success: false, message: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error getting customer', error });
  }
};

// Controller to update a customer by ID
export const updateCustomerController = async (req, res) => {
  try {
    const { customerId } = req.params;
    const updatedCustomer = await Customer.findOneAndUpdate({ id: customerId }, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (updatedCustomer) {
      res.status(200).json({ success: true, customer: updatedCustomer });
    } else {
      res.status(404).json({ success: false, message: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating customer', error });
  }
};

// Controller to delete a customer by ID
export const deleteCustomerController = async (req, res) => {
  try {
    const { customerId } = req.params;
    const deletedCustomer = await Customer.findOneAndDelete({ id: customerId });
    
    if (deletedCustomer) {
      res.status(200).json({ success: true, message: 'Customer deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting customer', error });
  }
};
