import { DragEventHandler, useState } from "react";
import "../styles/ImageUploader.scss";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  onUploadImage: (e: File) => void;
}

export function ImageUploader({ onUploadImage }: Props) {
  const handleDrop = (e: React.DragEvent) => {
    if (e.dataTransfer && e.dataTransfer.files) {
      let file = e.dataTransfer.files[0];
      let fileType = file.type;
      if (fileType.startsWith("image/")) {
        onUploadImage(file);
      }
    }

    e.preventDefault();
  };

  return (
    <>
      <label
        className="image-upload-label full-width-box"
        htmlFor="image-upload"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="image-upload-border">
          click or drag to{" "}
          <span style={{ whiteSpace: "nowrap" }}>
            upload <FontAwesomeIcon icon={faUpload} />
          </span>
        </div>
      </label>
      <input
        id="image-upload"
        className="image-upload"
        type="file"
        accept="image/*"
        onChange={(e) => onUploadImage(e.target.files![0])}
      />
    </>
  );
}
