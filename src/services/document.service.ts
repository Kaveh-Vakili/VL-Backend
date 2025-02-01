import fs from 'fs/promises';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import Document from '../models/document.model';
import { IDocument } from '../models/interfaces/document.interface';

export class DocumentService {
  static async extractContent(filePath: string, fileType: string): Promise<string> {
    try {
      if (fileType === 'application/pdf') {
        const dataBuffer = await fs.readFile(filePath);
        const data = await pdf(dataBuffer);
        return data.text;
      } else {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
      }
    } catch (error) {
      console.error('Content extraction failed:', error);
      return '';
    }
  }

  static async createDocument(documentData: Partial<IDocument>): Promise<IDocument> {
    const document = new Document(documentData);
    return await document.save();
  }

  static async searchDocuments(query: string): Promise<IDocument[]> {
    return await Document.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    }).sort({ uploadDate: -1 });
  }

  static async getDocumentById(id: string): Promise<IDocument | null> {
    return await Document.findById(id);
  }
}