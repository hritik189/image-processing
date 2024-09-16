import React, { useState } from 'react';
import axios from 'axios';
import { useImage } from '../context/ImageContext';
import { Upload, AlertCircle } from 'lucide-react';

const ImageUploader: React.FC = () => {
    const { setImage } = useImage();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const SERVER_URL = 'http://localhost:5000';

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (!['image/png', 'image/jpeg'].includes(file.type)) {
                setError('Unsupported file type. Only PNG and JPEG are allowed.');
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select an image to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post(`${SERVER_URL}/images/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setImage(response.data.preview);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to upload image.');
        }
    };

    return (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Image</h2>
            <div className="flex flex-col items-center space-y-4">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-purple-500 rounded-lg shadow-lg tracking-wide uppercase border border-purple-500 cursor-pointer hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out">
                    <Upload className="w-8 h-8" />
                    <span className="mt-2 text-base leading-normal">Select an image</span>
                    <input type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleFileChange} />
                </label>
                {selectedFile && (
                    <p className="text-sm text-gray-600">
                        Selected file: {selectedFile.name}
                    </p>
                )}
                <button
                    onClick={handleUpload}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                >
                    Upload
                </button>
                {error && (
                    <div className="flex items-center space-x-2 text-red-500">
                        <AlertCircle className="w-5 h-5" />
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;
