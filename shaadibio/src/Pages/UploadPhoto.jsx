import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { saveProfile } from "../../utils/saveProfile";

export default function UploadPhoto() {
  const navigate = useNavigate();
  const fileRef = useRef();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    setUploading(true);
    let photoURL = "";
    if (file) {
      const storageRef = ref(storage, `photos/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(storageRef);
    }
    await saveProfile(auth.currentUser.uid, "photo", { photoURL });
    setUploading(false);
    navigate("/preview");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 p-6 flex items-center justify-center">
      <div className="max-w-md w-full">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Shaadi<span className="text-orange-500">Bio</span></h1>
          <p className="text-gray-400 text-sm mt-2">Almost done! Add your photo</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-orange-100 p-8 text-center">

          <div className="relative w-40 h-40 mx-auto mb-6">
            {preview ? (
              <img src={preview} alt="preview" className="w-40 h-40 rounded-full object-cover border-4 border-orange-300 shadow-md" />
            ) : (
              <div className="w-40 h-40 rounded-full bg-orange-50 border-2 border-dashed border-orange-300 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition"
                onClick={() => fileRef.current.click()}>
                <span className="text-4xl">📷</span>
                <span className="text-xs text-orange-400 mt-2 font-medium">Click to upload</span>
              </div>
            )}
            {preview && (
              <button onClick={() => fileRef.current.click()}
                className="absolute bottom-1 right-1 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm shadow hover:bg-orange-600 transition">
                ✏️
              </button>
            )}
          </div>

          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

          <button onClick={() => fileRef.current.click()}
            className="mb-4 px-6 py-2 border border-orange-300 text-orange-500 rounded-full text-sm font-medium hover:bg-orange-50 transition">
            {preview ? "Change Photo" : "Choose Photo"}
          </button>

          <p className="text-xs text-gray-400 mb-6">JPG, PNG supported • Max 5MB • Square photo recommended</p>

          <button onClick={handleUpload} disabled={uploading}
            className="w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:shadow-lg transition disabled:opacity-60">
            {uploading ? "Uploading..." : preview ? "Next → Preview Biodata" : "Skip & Preview Biodata →"}
          </button>

        </div>
      </div>
    </div>
  );
}
