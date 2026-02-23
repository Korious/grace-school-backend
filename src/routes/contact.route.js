import express from 'express';
import { saveContact } from '../controllers/contact.controller';

const router = express.Router();
router.post('/api/contact', saveContact);

export default router;