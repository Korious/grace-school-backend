import Contact from '../models/contact.model.js';

export const saveContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: 'Message saved successfully' });
    } catch (error) {
        console.error('Error saving contact message:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}