'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to play the audio
    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        // Autoplay was prevented, will play on first user interaction
        console.log('Autoplay prevented, waiting for user interaction');

        // Play on any user interaction
        const playOnInteraction = () => {
          audio.play().catch(() => {});
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('keydown', playOnInteraction);
        };

        document.addEventListener('click', playOnInteraction);
        document.addEventListener('keydown', playOnInteraction);
      }
    };

    playAudio();

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      className="hidden"
    >
      <source src="/sounds/Avatars_Love.mp3" type="audio/mpeg" />
      <source src="/sounds/Avatars_Love.wav" type="audio/wav" />
      <source src="/sounds/Avatars_Love.ogg" type="audio/ogg" />
    </audio>
  );
}
