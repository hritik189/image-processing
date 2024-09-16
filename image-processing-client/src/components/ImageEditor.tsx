import React, { useState } from 'react';
import axios from 'axios';
import { useImage } from '../context/ImageContext';
import { Sliders, RotateCw, Download } from 'lucide-react';

const ImageEditor: React.FC = () => {
    const { image, setImage } = useImage();
    const [brightness, setBrightness] = useState(1);
    const [contrast, setContrast] = useState(1);
    const [saturation, setSaturation] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [downloadFormat, setDownloadFormat] = useState<'jpeg' | 'png'>('jpeg');

    const SERVER_URL = 'http://localhost:5000';

    const handleAdjustments = async () => {
        if (!image) return;

        const imagePath = image.replace(`${SERVER_URL}/`, '');

        const response = await axios.post(`${SERVER_URL}/images/adjust`, {
            path: imagePath,
            brightness,
            contrast,
            saturation,
        });
        setImage(response.data.preview);
    };

    const handleRotation = async () => {
        if (!image) return;

        const imagePath = image.replace(`${SERVER_URL}/`, '');

        const response = await axios.post(`${SERVER_URL}/images/rotate`, {
            path: imagePath,
            angle: rotation,
        });
        setImage(response.data.preview);
    };

    const handleDownload = () => {
        if (!image) return;

        const imagePath = image.replace(`${SERVER_URL}/`, '');
        const downloadUrl = `${SERVER_URL}/images/download?path=${encodeURIComponent(imagePath)}&format=${downloadFormat}`;
        window.open(downloadUrl, '_blank');
    };

    return (
        <div className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Image Editor</h2>
            {image && (
                <img src={image} alt="Preview" className="max-w-full h-auto rounded-lg shadow-md mb-6" />
            )}
            <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-3 flex items-center text-blue-600">
                        <Sliders className="w-5 h-5 mr-2" />
                        Adjustments
                    </h3>
                    <div className="space-y-4">
                        {['Brightness', 'Contrast', 'Saturation'].map((adjustment) => (
                            <div key={adjustment} className="flex flex-col space-y-2">
                                <label className="text-sm font-medium text-gray-700">{adjustment}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    step="0.1"
                                    value={eval(adjustment.toLowerCase())}
                                    onChange={(e) => eval(`set${adjustment}`)(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        ))}
                        <button
                            onClick={handleAdjustments}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                        >
                            Apply Adjustments
                        </button>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-3 flex items-center text-green-600">
                        <RotateCw className="w-5 h-5 mr-2" />
                        Rotation
                    </h3>
                    <div className="flex items-center space-x-4">
                        <input
                            type="number"
                            min="0"
                            max="360"
                            value={rotation}
                            onChange={(e) => setRotation(parseInt(e.target.value) || 0)}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={handleRotation}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                        >
                            Rotate
                        </button>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-3 flex items-center text-purple-600">
                        <Download className="w-5 h-5 mr-2" />
                        Download
                    </h3>
                    <div className="flex items-center space-x-4">
                        <select
                            value={downloadFormat}
                            onChange={(e) => setDownloadFormat(e.target.value as 'jpeg' | 'png')}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="jpeg">JPEG</option>
                            <option value="png">PNG</option>
                        </select>
                        <button
                            onClick={handleDownload}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                        >
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageEditor;
