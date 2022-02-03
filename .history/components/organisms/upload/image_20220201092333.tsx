import React, { useState } from "react";
import { useFileUpload } from "use-file-upload";
import { Button } from "react-bootstrap";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { child } from "firebase/database";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const storage = getStorage();
  /**=============
   * @param event 画像をFirebaseにアップロード
   *=============*/
  const onSubmit = (event) => {
    event.preventDefault();
    if (image === "") {
      console.log("ファイルが選択されていません");
    }
    // アップロード処理
    const storageRef = ref(storage, "/images/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);
    uploadTask.then((snapshot: any) => {
      console.log(snapshot);
    });
    getDownloadURL(storageRef).then((url) => {
      setUrl(url);
      console.log(url);
    });
  };
  /**===========
   * @param event 画像をstateに保存する処理
   *===========*/
  function handleChange(event) {
    setFile(event.target.files[0]);
    setImage(file);
  }
  /**==========
   * @param event 画像のurlを取得
   *==========*/

  return (
    <div>
      <h1>プロフィール画像</h1>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleChange} />
        <button>Upload</button>
      </form>
    </div>
  );
}
