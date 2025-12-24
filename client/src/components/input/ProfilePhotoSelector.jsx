import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const styles = {
  wrapper: `
    flex flex-col items-center gap-3 mb-6
  `,

  /* Polished Glass Avatar Circle */
  avatar: `
    relative w-28 h-28 rounded-full
    bg-white/20
    backdrop-blur-2xl
    border-2 border-white/40
    shadow-[0_10px_30px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.3)]
    flex items-center justify-center
    transition-all duration-300
    hover:border-white/60
  `,

  avatarIcon: `
    text-4xl text-[#003465]/40
  `,

  image: `
    w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover 
    border border-white/20
  `,

  /* Floating Action Button */
  actionBtn: `
    absolute bottom-0 right-0
    w-10 h-10 rounded-full
    bg-white/90
    backdrop-blur-md
    border border-white
    flex items-center justify-center
    text-[#003465]
    shadow-lg
    hover:bg-white
    hover:scale-110
    active:scale-90
    transition-all duration-200
  `,

  removeIcon: `
    text-rose-500
  `,

  hint: `
    text-[12px] font-bold text-[#003465]/60 uppercase tracking-widest
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
