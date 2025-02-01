// src/controllers/document.controller.ts
import { Request, Response } from 'express';

export class DocumentController {
    public static async uploadDocument(req: Request, res: Response) {
        try {
            if (!req.file) {
                res.status(400).json({ error: 'No file uploaded' });
                return;
            }

            const { title, description } = req.body;

            res.status(201).json({
                message: 'Document uploaded successfully',
                file: req.file,
                title,
                description
            });
        } catch (error) {
            res.status(500).json({ error: 'Upload failed' });
        }
    }

    public static async searchDocuments(req: Request, res: Response) {
        try {
            res.json({ message: 'Search endpoint' });
        } catch (error) {
            res.status(500).json({ error: 'Search failed' });
        }
    }

    public static async getDocument(req: Request, res: Response) {
        try {
            res.json({ message: 'Get document endpoint' });
        } catch (error) {
            res.status(500).json({ error: 'Document retrieval failed' });
        }
    }
}