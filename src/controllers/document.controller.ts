import { Request, Response } from 'express';
import Document from '../models/document.model';

export class DocumentController {
// src/controllers/document.controller.ts
// src/controllers/document.controller.ts
public static async uploadDocument(req: Request, res: Response) {
    try {
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);

        if (!req.file) {
            console.log('No file in request');
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        const { title, description } = req.body;

        // Create new document in MongoDB
        const newDocument = new Document({
            title,
            description,
            fileName: req.file.filename,
            fileType: req.file.mimetype,
            content: 'File content' // Add a placeholder content or make it optional
        });

        console.log('Attempting to save document:', newDocument);

        // Save to MongoDB
        await newDocument.save();
        console.log('Document saved successfully');

        res.status(201).json({
            message: 'Document uploaded successfully',
            document: newDocument
        });
    } catch (error: any) {
        console.error('Detailed upload error:', error);
        res.status(500).json({ 
            error: 'Upload failed',
            details: error.message || 'Unknown error occurred'
        });
    }
}

    public static async getAllDocuments(req: Request, res: Response) {
        try {
            const documents = await Document.find().sort({ uploadDate: -1 });
            res.json(documents);
        } catch (error) {
            console.error('Fetch error:', error);
            res.status(500).json({ error: 'Failed to fetch documents' });
        }
    }

    public static async getDocument(req: Request, res: Response) {
        try {
            const document = await Document.findById(req.params.id);
            if (!document) {
                res.status(404).json({ error: 'Document not found' });
                return;
            }
            res.json(document);
        } catch (error) {
            console.error('Fetch error:', error);
            res.status(500).json({ error: 'Failed to fetch document' });
        }
    }

    public static async searchDocuments(req: Request, res: Response) {
        try {
            const { query } = req.query;
            if (!query) {
                res.status(400).json({ error: 'Search query is required' });
                return;
            }

            const documents = await Document.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } }
                ]
            }).sort({ uploadDate: -1 });

            res.json(documents);
        } catch (error) {
            console.error('Search error:', error);
            res.status(500).json({ error: 'Search failed' });
        }
    }
}