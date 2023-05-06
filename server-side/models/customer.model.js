import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
});

const Customer = model('customer', customerSchema);

export default Customer;
