"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { PodcastEpisode, PODCAST_EPISODES } from "@/data/mockData";

interface AudioContextType {
  currentEpisode: PodcastEpisode | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  playEpisode: (episode: PodcastEpisode) => void;
  togglePlay: () => void;
  pause: () => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  volume: number;
  isAudioBarVisible: boolean;
  setIsAudioBarVisible: (visible: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode | null>(PODCAST_EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isAudioBarVisible, setIsAudioBarVisible] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
      const audio = audioRef.current;

      const updateProgress = () => {
        if (audio.duration) {
          setProgress(audio.currentTime);
          setDuration(audio.duration);
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("ended", handleEnded);
        audio.pause();
      };
    }
  }, []);

  const playEpisode = (episode: PodcastEpisode) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (currentEpisode?.id === episode.id && audio.src) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch(console.error);
        setIsPlaying(true);
      }
    } else {
      setCurrentEpisode(episode);
      audio.src = episode.audioUrl;
      audio.volume = volume;
      audio.play().catch(console.error);
      setIsPlaying(true);
    }
    setIsAudioBarVisible(true);
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentEpisode) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src) {
        audioRef.current.src = currentEpisode.audioUrl;
      }
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
      setIsAudioBarVisible(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setProgress(seconds);
    }
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        progress,
        duration,
        playEpisode,
        togglePlay,
        pause,
        seek,
        setVolume,
        volume,
        isAudioBarVisible,
        setIsAudioBarVisible,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
