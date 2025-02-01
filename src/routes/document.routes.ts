// src/routes/document.routes.ts
import express from 'express';
import { DocumentController } from '../controllers/document.controller';
import { uploadConfig } from '../config/multer.config';

const router = express.Router();

router.post('/upload', uploadConfig.single('file'), DocumentController.uploadDocument);
router.get('/search', DocumentController.searchDocuments);
router.get('/:id', DocumentController.getDocument);

export default router;