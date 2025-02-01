import mongoose, { Schema } from 'mongoose';
import { IDocument } from './interfaces/document.interface';

const DocumentSchema = new Schema<IDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  content: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

export default mongoose.model<IDocument>('Document', DocumentSchema);