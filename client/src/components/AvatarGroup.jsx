import React from "react";

const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
  return (
    <div className="flex items-center">
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt=""
          className="
            w-9 h-9 rounded-full
            border border-white/30
            -ml-3 first:ml-0
            backdrop-blur-sm
          "
        />
      ))}

      {avatars.length > maxVisible && (
        <div
          className="
            w-9 h-9 flex items-center justify-center
            bg-white/15 text-white text-sm
            rounded-full border border-white/30
            -ml-3 backdrop-blur-md
          "
        >
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
