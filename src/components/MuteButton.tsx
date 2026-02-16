"use client";

import { useSlotStore } from "../store/useSlotStore";
import styles from "./MuteButton.module.scss";

export const MuteButton = () => {
  const isMuted = useSlotStore((s) => s.isMuted);
  const toggleMute = useSlotStore((s) => s.toggleMute);

  return (
    <button
      className={styles.muteButton}
      onClick={toggleMute}
      type="button"
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
      title={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
};
