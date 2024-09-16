import React, { createContext, useState, useContext, ReactNode } from 'react';

type ImageContextType = {
    image: string | null;
    setImage: (image: string) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [image, setImage] = useState<string | null>(null);

    return <ImageContext.Provider value={{ image, setImage }}>{children}</ImageContext.Provider>;
};

export const useImage = () => {
    const context = useContext(ImageContext);
    if (!context) throw new Error('useImage must be used within ImageProvider');
    return context;
};
