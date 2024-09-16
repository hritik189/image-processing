import sharp from 'sharp';
import path from 'path';

export const convertImage = async (filePath: string): Promise<string> => {
    const parsedPath = path.parse(filePath);
    const outputFilePath = path.join(parsedPath.dir, `${parsedPath.name}-preview.jpeg`);
    await sharp(filePath)
        .resize(500) // Adjust as needed for preview size
        .jpeg({ quality: 60 }) // Lower quality for speed
        .toFile(outputFilePath);
    return outputFilePath;
};

export const rotate = async (filePath: string, angle: number): Promise<string> => {
    const parsedPath = path.parse(filePath);
    const outputFilePath = path.join(parsedPath.dir, `${parsedPath.name}-rotated.jpeg`);
    await sharp(filePath)
        .rotate(angle)
        .jpeg({ quality: 60 })
        .toFile(outputFilePath);
    return outputFilePath;
};

export const adjust = async (
    filePath: string,
    brightness: number,
    contrast: number,
    saturation: number
): Promise<string> => {
    const parsedPath = path.parse(filePath);
    const outputFilePath = path.join(parsedPath.dir, `${parsedPath.name}-adjusted.jpeg`);
    await sharp(filePath)
        .modulate({
            brightness,
            saturation,
        })
        .linear(contrast, -(128 * (contrast - 1))) // Sharp doesn't have direct contrast, workaround
        .jpeg({ quality: 60 })
        .toFile(outputFilePath);
    return outputFilePath;
};
