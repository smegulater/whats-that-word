import express from 'express';
import { getDocuments, setDocument, updateDocument, deleteDocument} from '../controllers/document-controller.js';
import protect from "../middleware/authMiddleware.js";

const documentsRouter = express.Router();

documentsRouter.route('/').get(protect, getDocuments).post(protect, setDocument);
documentsRouter.route('/:id').delete(protect, deleteDocument).put(protect, updateDocument);

export default documentsRouter;