import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import dns from 'dns';
// dns.setServers(['1.1.1.1', '8.8.8.8']);
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const mongo_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5001;
const allowedOrigins = process.env.FRONTEND_URL.split(',').map(origin => origin.trim());

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

mongoose.connect(mongo_URI,{
    dbName: 'graceSchool_form'})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', ContactSchema);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.post('/api/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));