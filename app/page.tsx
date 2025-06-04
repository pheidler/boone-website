"use client";

import React, { useState, useEffect, useCallback } from "react";
import * as Tone from "tone";
import AudioTrack from "./components/AudioTrack";

interface Track {
  id: string;
  name: string;
  src: string;
}

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [players, setPlayers] = useState<Tone.Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPlayers, setLoadedPlayers] = useState(0);
  const [isContextStarted, setIsContextStarted] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);

  const tracks: Track[] = [
    {
      id: "1",
      name: "Track 02",
      src: "/tracks/02aa.mp3",
    },
    {
      id: "2",
      name: "Track 03",
      src: "/tracks/03aa.mp3",
    },
    {
      id: "3",
      name: "Track 04",
      src: "/tracks/04aa.mp3",
    },
    {
      id: "4",
      name: "Track 05",
      src: "/tracks/05aa.mp3",
    },
    {
      id: "5",
      name: "Track 06",
      src: "/tracks/06aa.mp3",
    },
    {
      id: "6",
      name: "Track 07",
      src: "/tracks/07aa.mp3",
    },
    {
      id: "7",
      name: "Track 08",
      src: "/tracks/08aa.mp3",
    },
    {
      id: "8",
      name: "Track 09",
      src: "/tracks/09aa.mp3",
    },
    {
      id: "9",
      name: "Track 10",
      src: "/tracks/10aa.mp3",
    },
    {
      id: "10",
      name: "Track 11",
      src: "/tracks/11aa.mp3",
    },
    {
      id: "11",
      name: "Track 12",
      src: "/tracks/12aa.mp3",
    },
    {
      id: "12",
      name: "Track 13",
      src: "/tracks/13aa.mp3",
    },
    {
      id: "13",
      name: "Track 14",
      src: "/tracks/14aa.mp3",
    },
    {
      id: "14",
      name: "Track 15",
      src: "/tracks/15aa.mp3",
    },
    {
      id: "15",
      name: "Track 16",
      src: "/tracks/16aa.mp3",
    },
  ];

  const handlePlayerCreate = useCallback(
    (player: Tone.Player) => {
      setPlayers((prev) => [...prev, player]);
      setLoadedPlayers((prev) => {
        const newCount = prev + 1;
        if (newCount === tracks.length) {
          setIsLoading(false);
        }
        return newCount;
      });
    },
    [tracks.length]
  );

  const startAudioContext = async () => {
    if (!isContextStarted) {
      await Tone.start();
      setIsContextStarted(true);
    }
  };

  const togglePlayback = async () => {
    try {
      await startAudioContext();

      if (isPlaying) {
        // Store current position before stopping
        const currentPosition = Tone.Transport.seconds;
        setPlaybackPosition(currentPosition);

        // Stop all players
        players.forEach((player) => {
          if (player.loaded) {
            player.stop();
          }
        });
        Tone.Transport.stop();
      } else {
        // Schedule all players to start at the same precise time
        const now = Tone.now();
        const startTime = now;

        // Schedule the Transport to start at the same time
        Tone.Transport.seconds = playbackPosition;
        Tone.Transport.start(startTime);

        // Schedule all players to start at the same time
        players.forEach((player) => {
          if (player.loaded) {
            player.start(startTime, playbackPosition);
          }
        });
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      players.forEach((player) => {
        if (player.loaded) {
          player.stop();
          player.dispose();
        }
      });
      Tone.Transport.stop();
    };
  }, []); // Empty dependency array since we only want this to run on unmount

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Multi-Track Audio Player
        </h1>

        <div className="mb-6 flex justify-center">
          <button
            onClick={togglePlayback}
            disabled={isLoading}
            className={`px-6 py-3 rounded-lg transition-colors ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            {isLoading
              ? `Loading... (${loadedPlayers}/${tracks.length})`
              : isPlaying
              ? "Pause All"
              : "Play All"}
          </button>
        </div>

        <div className="space-y-4">
          {tracks.map((track) => (
            <AudioTrack
              key={track.id}
              src={track.src}
              name={track.name}
              onPlayerCreate={handlePlayerCreate}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
