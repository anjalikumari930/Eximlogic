import Customer from '../models/Customer.js';
import generateRandomId from '../utils/generateRandomId.js';

// Controller to create a new customer
export const createCustomerController = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['companyName', 'contactName', 'contactTitle', 'region', 'postalCode', 'country', 'city', 'phone'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ success: false, message: `${field} is required` });
      }
    }

    const randomId = generateRandomId();
    const newCustomer = new Customer({ id: randomId, ...req.body });
    const savedCustomer = await newCustomer.save();
    res.status(201).json({ success: true, customer: savedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating customer', error });
  }
};

// Controller to get all customers with pagination, searching, and sorting
export const getAllCustomersController = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Searching
    const searchQuery = req.query.search || '';

    // Sorting
    const sortField = req.query.sortBy || 'id';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
    const sort = { [sortField]: sortOrder };

    // Query to fetch customers with pagination, searching, and sorting
    const query = {
      $or: [
        { id: { $regex: searchQuery, $options: 'i' } },
        { companyName: { $regex: searchQuery, $options: 'i' } },
        // Add other fields for searching as needed
      ],
    };

    const customers = await Customer.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort);

    const totalCustomers = await Customer.countDocuments(query);

    res.status(200).json({
      success: true,
      customers,
      currentPage: page,
      totalPages: Math.ceil(totalCustomers / limit),
    });
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