import React, { useEffect, useRef, useState } from "react";
import { IoPlaySkipBackOutline, IoPlaySkipForwardOutline } from "react-icons/io5";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { FiVolume2 } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const Playsongs = ({currentSong}) => {
  
  const navigation = useNavigate();

  const musicref = useRef(null);

  const [isplay, setIsplay] = useState(false);
  const [currentTime, setCurrettime] = useState(0);
  const [duration, setDuration] = useState(0);
  // const [currentSong, setCurrentSong] = useState(null);

  // ✅ set song from navigation
  // useEffect(() => {
  //   if (songplay) {
  //     setCurrentSong(songplay);
  //     setIsplay(false);
  //   }
  // }, [songplay]);

  // ✅ autoplay when song changes
  useEffect(() => {
    if (currentSong && musicref.current) {
      musicref.current.load();
      playmusic();
    }
  }, [currentSong]);

  // ▶️ play
  const playmusic = async () => {
    try {
      await musicref.current?.play();
      setIsplay(true);
    } catch (err) {
      console.log("Play failed:", err);
    }
  };

  // ⏸ pause
  const pausemusic = () => {
    musicref.current?.pause();
    setIsplay(false);
  };

  // 🔁 toggle
  const musicplaypause = () => {
    if (isplay) {
      pausemusic();
    } else {
      playmusic();
    }
  };

  // ⏱ update time
  const settingCurrentTime = () => {
    if (musicref.current) {
      setCurrettime(musicref.current.currentTime);
    }
  };

  // ⏱ duration
  const settingDuration = () => {
    if (!isNaN(musicref.current.duration)) {
      setDuration(musicref.current.duration);
    }
  };

  // 🧮 format time
  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-3">
      <div className="flex items-center justify-between w-full">

        {/* LEFT */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() =>
            navigation("/musicplayer", {
              state: { currentSong },
            })
          }
        >
          <div className="w-14 h-14 rounded-lg overflow-hidden">
            <img
              src={`http://localhost:5999/${currentSong?.songimage}`}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          <div className="min-w-0">
            <h1 className="text-white text-sm font-semibold truncate">
              {currentSong?.songname || "No Song"}
            </h1>
            <p className="text-gray-400 text-xs truncate">
              {currentSong?.artist || "Unknown"}
            </p>
          </div>
        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center gap-6 mb-2">
            <button className="text-gray-400 hover:text-white">
              <IoPlaySkipBackOutline />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                musicplaypause();
              }}
              className="bg-white text-black p-2 rounded-full"
            >
              {isplay ? <FaRegCirclePause /> : <FaRegCirclePlay />}
            </button>

            <button className="text-gray-400 hover:text-white">
              <IoPlaySkipForwardOutline />
            </button>
          </div>

          {/* PROGRESS */}
          <div className="flex items-center gap-3 w-full max-w-xl">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => {
                e.stopPropagation();
                const value = Number(e.target.value);
                musicref.current.currentTime = value;
                setCurrettime(value);
              }}
              className="w-full"
            />

            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 w-1/4 justify-end">
          <FiVolume2 className="text-white" />

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={(e) => {
              e.stopPropagation();
              musicref.current.volume = Number(e.target.value);
            }}
            className="w-24"
          />
        </div>
      </div>

      {/* AUDIO */}
      <audio
        ref={musicref}
       src={`http://localhost:5999/${currentSong?.file.replace(/\\/g, "/")}`}
        onTimeUpdate={settingCurrentTime}
        onLoadedMetadata={settingDuration}
        onEnded={() => setIsplay(false)}
        className="hidden"
      />
    </div>
  );
};

export default Playsongs;