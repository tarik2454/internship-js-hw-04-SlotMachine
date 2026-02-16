"use client";

import { Howl, Howler } from "howler";
import { useCallback, useEffect, useRef } from "react";
import { useSlotStore } from "../store/useSlotStore";

const SOUNDS = {
  spin: "/sounds/spin.mp3",
  reelStop: "/sounds/reel-stop.mp3",
  win: "/sounds/win.mp3",
  jackpot: "/sounds/jackpot.wav",
  lose: "/sounds/lose.wav",
  click: "/sounds/click.wav",
};

const VOLUME: Record<keyof typeof SOUNDS, number> = {
  spin: 0.4,
  reelStop: 0.4,
  win: 0.3,
  jackpot: 0.6,
  lose: 0.5,
  click: 0.3,
};

const LOOP_SOUNDS: Set<keyof typeof SOUNDS> = new Set(["spin"]);

type SoundName = keyof typeof SOUNDS;

interface UseSoundReturn {
  playSound: (type: SoundName) => void;
  stopSound: (type: SoundName) => void;
}

export const useSound = (): UseSoundReturn => {
  const isMuted = useSlotStore((s) => s.isMuted);
  const sounds = useRef<Record<SoundName, Howl | null>>({
    spin: null,
    reelStop: null,
    win: null,
    jackpot: null,
    lose: null,
    click: null,
  });

  useEffect(() => {
    Object.entries(SOUNDS).forEach(([key, src]) => {
      const typedKey = key as SoundName;
      sounds.current[typedKey] = new Howl({
        src: [src],
        volume: VOLUME[typedKey],
        loop: LOOP_SOUNDS.has(typedKey),
      });
    });

    const currentSounds = sounds.current;

    return () => {
      Object.values(currentSounds).forEach((sound) => sound?.unload());
    };
  }, []);

  useEffect(() => {
    Howler.mute(isMuted);
  }, [isMuted]);

  const playSound = useCallback(
    (type: SoundName) => {
      if (!isMuted && sounds.current[type]) {
        sounds.current[type]!.stop();
        sounds.current[type]!.play();
      }
    },
    [isMuted],
  );

  const stopSound = useCallback((type: SoundName) => {
    sounds.current[type]?.stop();
  }, []);

  return { playSound, stopSound };
};
