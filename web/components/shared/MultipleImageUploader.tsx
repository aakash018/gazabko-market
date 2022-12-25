import React, { useEffect, useRef, useState } from "react";

import styles from "../../styles/components/shared/MultipleImageUploader.module.scss";
import Button from "./Button";
import Image from "next/image";

interface Props {
  width: number;
  height: number;
  selectedImage: any;
  setSelectedImage: React.Dispatch<any>;
  images: any[];
  setImages: React.Dispatch<React.SetStateAction<any[]>>;
}

const MultipleImageUploader: React.FC<Props> = ({
  height,
  selectedImage,
  setSelectedImage,
  width,
  images,
  setImages,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (images.length !== 0) {
  //     setSelectedImage(images[0]);
  //   } else {
  //     setSelectedImage(null);
  //   }
  // }, [images]);

  return (
    <div>
      {selectedImage && (
        <div>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <Image
              src={URL.createObjectURL(selectedImage)}
              width={width}
              height={height}
              objectFit="cover"
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              margin: "10px 0",
            }}
          >
            {images.map((img) => (
              <Image
                src={URL.createObjectURL(img)}
                width={50}
                height={50}
                objectFit="cover"
                onClick={() => {
                  setSelectedImage(img);
                }}
              />
            ))}
          </div>
        </div>
      )}
      <input
        type={"file"}
        onChange={(event: any) => {
          if (event.target.files) {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
            setImages((prev) => [...prev, event.target.files[0]]);
          }
        }}
        style={{ display: "none" }}
        ref={inputFileRef}
      />
      <div
        style={{
          display: "flex",
          gap: 30,
        }}
      >
        <Button onClick={() => inputFileRef.current?.click()}>
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            +
          </span>
          <span>{selectedImage ? "Add Image    " : "Add Image"}</span>
        </Button>
        {selectedImage && (
          <Button
            color="error"
            onClick={() => {
              setImages((prev) =>
                prev.filter((img, i) => {
                  if (img === selectedImage) {
                    if (images[i - 1] != null) {
                      setSelectedImage(images[i - 1]);
                    } else {
                      setSelectedImage(images[i + 1]);
                    }
                  }
                  return img !== selectedImage;
                })
              );
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultipleImageUploader;
