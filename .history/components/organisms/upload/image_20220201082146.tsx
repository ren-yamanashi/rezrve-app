import React, { useState } from "react";
import { useFileUpload } from "use-file-upload";
import { Button } from "react-bootstrap";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage();

  const handleImage = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (image === "") {
      console.log("ファイルが選択されていません");
    }
    // アップロード処理
    const storageRef = ref(storage, "/images/" + image.name);
    const uploadTask = uploadBytes(storageRef, file);
    uploadTask.then((snapshot: any) => {
      console.log(snapshot);
    });
  };

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  return (
    <div>
      <form>
        <h1>File Upload</h1>
        <input type="file" onChange={handleChange} />
        <button onClick={() => upload()}>Upload</button>
      </form>
    </div>
  );
}
