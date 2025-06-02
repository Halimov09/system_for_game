import React, { useState } from "react";
import "../style.css";

const YouTubeModal = ({ videoId, buttonText = "Videoni ko‘rish", title = "YouTube Video" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openModal} className="youtube-btn">
        {buttonText}
      </button>

      {isOpen && (
        <div className="youtube-modal-overlay">
          <div className="youtube-modal-content">
            {/* ❌ Close icon visible and large */}
            <button onClick={closeModal} className="youtube-close-btn" aria-label="Close modal">
              ✖
            </button>

            <div className="youtube-video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeModal;
