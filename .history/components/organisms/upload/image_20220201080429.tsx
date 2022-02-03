import React, { useState } from "react";
import { useFileUpload } from "use-file-upload";
import { Button } from "react-bootstrap";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const storage = getStorage();
  const storageRef = ref(storage, file.name);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("完了");
  });

  console.log(file.name);
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
