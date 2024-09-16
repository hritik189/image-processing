import { Router } from 'express';
import multer from 'multer';
import {
    processImage,
    rotateImage,
    adjustImage,
    downloadImage,
} from '../controllers/imageController';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), processImage);
router.post('/rotate', rotateImage);
router.post('/adjust', adjustImage);
router.get('/download', downloadImage);

export default router;
