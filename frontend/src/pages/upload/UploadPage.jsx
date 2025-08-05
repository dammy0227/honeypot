import React, { useState } from "react";
import API from "../../services/api";
import './upload.css'


const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setStatus("❗ Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setStatus("✅ Upload received (thanks, attacker 👀)");
    } catch (err) {
      console.error("Upload error", err);
      setStatus("❌ Failed to upload");
    }
  };

  return (
    <div className="container">
      <h2>📤 Upload Your File</h2>
      <p>This portal allows you to upload files for system processing.</p>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Upload
        </button>
      </form>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
};

export default UploadPage;
