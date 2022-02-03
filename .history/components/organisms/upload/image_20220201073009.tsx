import React, { useState } from "react";
import { useFileUpload } from "use-file-upload";
import { Button } from "react-bootstrap";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  console.log(file);
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  return (
    <div>
      <form>
        <h1>File Upload</h1>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
