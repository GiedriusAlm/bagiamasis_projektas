// ----------------------

import express from 'express';
import mongoose from 'mongoose';
import Customer from './models/customer.model.js';

const app = express();
// app.use(cors());

const PORT = 5000;
const MONGODB_URI = 'mongodb+srv://giedrius:egzaminas@cluster0.lbe9lny.mongodb.net/clients?retryWrites=true&w=majority';
app.use(express.json());

//Connect to MongoDB

mongoose.set('strictQuery', false);
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.log('Error connecting MongoDB' + e));

// POST customer

app.post('/api/customers', (req, res) => {
  const newCustomerPayload = req.body;
  const customer = new Customer(newCustomerPayload);

  customer
    .save()
    .then((data) => {
      console.log(data);

      res.json();
    })
    .catch((e) => console.log(e));
});

// GET customers

app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error retrieving customer' });
  }
});

// UPDATE customer

app.put('/api/customers/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    const updatedCustomerData = req.body;
    await Customer.findByIdAndUpdate(customerId, updatedCustomerData);
    const updatedCustomer = await Customer.findById(customerId);

    res.json(updatedCustomer);
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error retrieving customer' });
  }
});

// DELETE customer

app.delete('/api/customers/:id', async (req, res) => {
  try {
    const customerId = req.params.id;

    const customerToBeDeleted = await Customer.findById(customerId);

    if (!customerToBeDeleted) {
      res.status(404).json({ message: 'Customer not found' });
    } else {
      await Customer.findByIdAndDelete(customerId);
    }

    res.json({ message: 'Customer deleted' });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error retrieving customer' });
  }
});

//Start server

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
