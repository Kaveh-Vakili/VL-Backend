// src/utils/documentConverter.ts
import mammoth from 'mammoth';
import path from 'path';
import fs from 'fs';

interface ConversionOptions {
    fileName: string;
    path: string;
}

export async function convertToHtml(options: ConversionOptions): Promise<string> {
    try {
        if (!fs.existsSync(options.path)) {
            throw new Error('File not found');
        }

        const result = await mammoth.convertToHtml({
            path: options.path
        });

        return result.value;
    } catch (error) {
        console.error('Conversion error:', error);
        return '';
    }
}