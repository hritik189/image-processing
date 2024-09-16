import React from 'react';
import ImageUploader from './components/ImageUploader';
import ImageEditor from './components/ImageEditor';

const App: React.FC = () => {
  return (

    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full space-y-6 my-[1rem]">
        <h1 className="text-2xl font-bold text-center text-gray-800">Image Processing Tool</h1>
        <ImageUploader />
        <ImageEditor />
      </div>
    </div>

  );
};

export default App;
