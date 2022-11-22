import React, { useRef, useState } from "react";

import Image from "next/image";
import Button from "./Button";

interface Props {
  width: number;
  height: number;
  selectedImage: any;
  setSelectedImage: React.Dispatch<any>;
}

const ImageUploader: React.FC<Props> = ({
  height,
  selectedImage,
  setSelectedImage,
  width,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      {selectedImage && (
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
      )}
      <input
        type={"file"}
        onChange={(event) => {
          if (event.target.files) {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
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
          <span>{selectedImage ? "Change Image    " : "Add Image"}</span>
        </Button>
        {selectedImage && (
          <Button color="error" onClick={() => setSelectedImage(null)}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
