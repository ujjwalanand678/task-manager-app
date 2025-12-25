import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const styles = {
  wrapper: `
    flex flex-col items-center gap-2 mb-2
  `,

  /* Polished Glass Avatar Circle */
  avatar: `
    relative w-24 h-24 rounded-full
    bg-white/85
    backdrop-blur-2xl
    border-1 border-white/10
   [box-shadow:inset_0_4px_15px_rgba(0,0,0,0.5)]
    flex items-center justify-center
    transition-all duration-300
   
  `,

  avatarIcon: `
    text-3xl text-black/60
  `,

  image: `
    w-[calc(100%-9px)] h-[calc(100%-9px)] rounded-full object-cover w-full h-full
    border-2 border-white/80
  `,

  /* Floating Action Button */
  actionBtn: `
  cursor-pointer
    absolute bottom-0 right-0
    w-9 h-9 rounded-full
    bg-white/80
    backdrop-blur-md
    border border-black/40
    flex items-center justify-center
    text-black/70
    shadow-lg
    hover:bg-white/90
    hover:scale-110
    active:scale-90
    transition-all duration-200
  `,

  removeIcon: `
    text-rose-500
  `,

  hint: `
    text-[12px] font-semibold text-white/80 uppercase tracking-widest
  `,
};
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
    <div className={styles.wrapper}>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Glass Avatar */}
      <div className={styles.avatar}>
        {!image ? (
          <LuUser className={styles.avatarIcon} />
        ) : (
          <img
            src={previewUrl}
            alt="Profile"
            className={styles.image}
          />
        )}

        {/* Upload / Remove Button */}
        <button
          type="button"
          onClick={image ? handleRemoveImage : onChooseFile}
          className={styles.actionBtn}
        >
          {image ? (
            <LuTrash className={styles.removeIcon} size={18} />
          ) : (
            <LuUpload size={18} />
          )}
        </button>
      </div>

      {/* Hint */}
      <p className={styles.hint}>Upload profile photo</p>
    </div>
  );
};

export default ProfilePhotoSelector;
