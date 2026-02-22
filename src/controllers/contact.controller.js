import { createContactService } from "../models/contact.model";
import handleResponse from "../utils/handleResponse";

export const createContactController = async (req, res, next) => {
  try {
    const newContact = await createContactService(req.body);    

    handleResponse(res, 201, 'Message saved successfully', newContact);
    } catch (error) {
    next(error);
  }
}