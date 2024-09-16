# Full-Stack Image Processing Web Application

This is a full-stack web application that allows users to upload and manipulate images in real-time using Node.js, Express, Sharp for backend image processing, and React with Context API for frontend interaction. The app provides functionality for adjusting brightness, contrast, saturation, and rotation, as well as converting images between PNG and JPEG formats. Users can download the final high-quality processed image in their desired format.

## Features

- Image upload (PNG, JPEG)
- Real-time image processing: brightness, contrast, saturation, and rotation
- Image format conversion (PNG ↔ JPEG)
- Low-quality preview for real-time feedback
- Full-resolution final image download

---

## Technologies Used

- **Backend:** Node.js, Express, Sharp, TypeScript, Multer
- **Frontend:** React, Context API, TypeScript, Tailwind CSS

---

## File Structure

```bash
|-- client/
    |-- src/
        |-- components/
            |-- ImageUploader.tsx
            |-- ImageEditor.tsx
        |-- context/
        |-- App.tsx
        |-- index.tsx
    |-- public/
    |-- package.json
    |-- tailwind.config.js


|-- server/
    |-- src/
        |-- controllers/
            |-- imageController.ts
        |-- routes/
            |-- imageRoutes.ts
        |-- services/
            |-- imageServices.ts    
        |-- utils/
            |-- filesUtils.ts
        |-- app.ts
        |-- server.ts
    |-- uploads/
    |-- package.json
    |-- tsconfig.json
    |-- .env
```

## Installation and Setup
### Prerequisites
- Node.js (>= v14)
- npm or yarn
- A web browser for frontend

## Setup
Clone the Repository

```
git clone https://github.com/your-username/image-processing-app.git
cd image-processing-app
```
## Setup the Server
```
cd image-processing-server
npm install
touch .env
```
## Add the following variables to your .env file:
```
PORT=5000
```
## Start the server:
```
npm run dev
```

## Setup the Client
```
cd ../image-processing-client
npm install
npm run dev
```


## How to Use the Application
1.  Upload Image: The user uploads an image (PNG or JPEG).
2. Image Manipulation: The user adjusts brightness, contrast, saturation, or rotates the image via the frontend sliders. The app will send real-time requests to the backend to return a preview of the adjusted image.
3. Download: Once satisfied, the user can download the final processed image in their desired format (PNG or JPEG).

