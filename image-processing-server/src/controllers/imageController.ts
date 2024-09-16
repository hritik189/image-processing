import { Request, Response } from 'express';
import { convertImage, rotate, adjust } from '../services/imageService';
import { removeTempFile } from '../utils/fileUtils';
import path from 'path';
import sharp from 'sharp';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';

export const processImage = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: 'No file uploaded' });

        // Validate file type
        if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
            removeTempFile(file.path);
            return res.status(400).json({ error: 'Unsupported file type. Only PNG and JPEG are allowed.' });
        }

        const previewPath = await convertImage(file.path);
        const previewUrl = `${SERVER_URL}/uploads/${path.basename(previewPath)}`;
        res.status(200).json({ preview: previewUrl });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const rotateImage = async (req: Request, res: Response) => {
    try {
        const { path: imagePath, angle } = req.body;
        const rotatedPath = await rotate(imagePath, angle);
        const rotatedUrl = `${SERVER_URL}/uploads/${path.basename(rotatedPath)}`;
        res.status(200).json({ preview: rotatedUrl });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const adjustImage = async (req: Request, res: Response) => {
    try {
        const { path: imagePath, brightness, contrast, saturation } = req.body;
        const adjustedPath = await adjust(imagePath, brightness, contrast, saturation);
        const adjustedUrl = `${SERVER_URL}/uploads/${path.basename(adjustedPath)}`;
        res.status(200).json({ preview: adjustedUrl });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const downloadImage = async (req: Request, res: Response) => {
    try {
        const { path: imagePath, format } = req.query;

        if (!imagePath || typeof imagePath !== 'string') {
            return res.status(400).json({ error: 'Image path is required' });
        }

        const parsedPath = path.parse(imagePath);
        let outputFilePath = imagePath;

        if (format && (format === 'jpeg' || format === 'png')) {
            outputFilePath = path.join(parsedPath.dir, `${parsedPath.name}-final.${format}`);
            let transformer = sharp(imagePath);
            if (format === 'jpeg') {
                transformer = transformer.jpeg({ quality: 90 });
            } else if (format === 'png') {
                transformer = transformer.png({ compressionLevel: 9 });
            }
            await transformer.toFile(outputFilePath);
        }

        res.download(outputFilePath, err => {
            if (err) {
                res.status(500).json({ error: 'Failed to download image' });
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
