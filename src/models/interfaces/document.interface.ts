import { Document } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  description: string;
  fileName: string;
  fileType: string;
  content?: string;
  uploadDate: Date;
}