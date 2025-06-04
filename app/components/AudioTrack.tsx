import React, { useState, useEffect } from "react";
import * as Tone from "tone";

interface AudioTrackProps {
  src: string;
  name: string;
  onPlayerCreate: (player: Tone.Player) => void;
}

export default function AudioTrack({
  src,
  name,
  onPlayerCreate,
}: AudioTrackProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [player, setPlayer] = useState<Tone.Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Create a new player when the component mounts
    const newPlayer = new Tone.Player({
      url: src,
      loop: true,
      volume: 0, // Start with volume at 0 to prevent clicks
      onload: () => {
        setIsLoading(false);
        onPlayerCreate(newPlayer);
      },
    }).toDestination();

    setPlayer(newPlayer);

    // Cleanup when the component unmounts
    return () => {
      if (newPlayer.loaded) {
        newPlayer.stop();
        newPlayer.dispose();
      }
    };
  }, [src, onPlayerCreate]);

  useEffect(() => {
    if (player && player.loaded) {
      player.mute = isMuted;
      // Fade in the volume when unmuting
      if (!isMuted) {
        player.volume.rampTo(0, 0.1);
      }
    }
  }, [isMuted, player]);

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <span className="font-medium">{name}</span>
      <button
        onClick={() => setIsMuted(!isMuted)}
        disabled={isLoading}
        className={`px-4 py-2 rounded-md transition-colors ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : isMuted
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        } text-white`}
      >
        {isLoading ? "Loading..." : isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
}
