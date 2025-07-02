"use client";

import { useEffect } from "react";

// Function to create a processed image with 4:3 aspect ratio, fitting to height
const createProcessedImage = async (imageSrc) => {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imageSrc;

  return new Promise((resolve) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set output dimensions with 4:3 aspect ratio
      const outputHeight = 768;
      const outputWidth = Math.round(outputHeight * (4 / 3)); // 1024 for 4:3 ratio

      // Set canvas to the output dimensions
      canvas.width = outputWidth;
      canvas.height = outputHeight;

      // Fill with white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate dimensions to fit by height
      const scale = outputHeight / image.height;
      const scaledWidth = image.width * scale;

      // Calculate x-offset for centering (with cropping or padding as needed)
      let xOffset = 0;
      if (scaledWidth > outputWidth) {
        // Image is too wide after scaling to height - crop the sides
        xOffset = (outputWidth - scaledWidth) / 2; // This will be negative, cropping both sides equally
      } else {
        // Image is narrower than output after scaling to height - center it with padding
        xOffset = (outputWidth - scaledWidth) / 2; // This will be positive, adding padding
      }

      // Draw the image centered (or cropped) horizontally, full height
      ctx.drawImage(image, xOffset, 0, scaledWidth, outputHeight);

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }

          blob.name = "processed.jpeg";
          const processedFile = new File([blob], "processed.jpeg", {
            type: "image/jpeg",
          });
          resolve({ file: processedFile, preview: URL.createObjectURL(blob) });
        },
        "image/jpeg",
        0.9
      ); // Added quality parameter for better compression
    };
  });
};

// Modified component that automatically processes images without showing UI
const ImageEditModal = ({ image, onSave }) => {
  useEffect(() => {
    if (image) {
      const processImage = async () => {
        try {
          const processedImage = await createProcessedImage(image);
          if (onSave) {
            onSave(processedImage);
          }
        } catch (e) {
          console.error("Error processing image:", e);
        }
      };

      processImage();
    }
  }, [image, onSave]);

  // Return null since we don't want to render any UI
  return null;
};

export default ImageEditModal;
