import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Avatar */}
      <div
        className="
          relative w-24 h-24 rounded-full
          bg-slate-200
          flex items-center justify-center

          shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff]
        "
      >
        {!image ? (
          <LuUser className="text-4xl text-slate-500" />
        ) : (
          <img
            src={previewUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        )}

        {/* Upload / Remove Button */}
        <button
          type="button"
          onClick={image ? handleRemoveImage : onChooseFile}
          className="
            absolute -bottom-2 -right-2
            w-9 h-9 rounded-full
            bg-slate-200

            flex items-center justify-center
            text-slate-600

            shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
            hover:shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff]
            active:shadow-[inset_3px_3px_6px_#b8bcc2,inset_-3px_-3px_6px_#ffffff]

            transition-all duration-150
          "
        >
          {image ? (
            <LuTrash className="text-rose-500" size={18} />
          ) : (
            <LuUpload size={18} />
          )}
        </button>
      </div>

      {/* Hint */}
      <p className="text-[11px] text-slate-500">Upload profile photo</p>
    </div>
  );
};

export default ProfilePhotoSelector;
