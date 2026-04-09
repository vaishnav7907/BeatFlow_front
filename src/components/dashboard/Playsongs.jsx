import React, { useEffect, useRef, useState } from "react";
import vv from "../../assets/welcomepageimg/vv.png";
// import { PiShuffleFill } from "react-icons/pi";
import { IoPlaySkipBackOutline } from "react-icons/io5";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";
import { FiVolume2 } from "react-icons/fi";
// import { FiVolumeX } from "react-icons/fi";
import ReactPlayer from "react-player";
import AudioPlayer from "react-h5-audio-player";
import ReactAudioPlayer from "react-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Homepage from "./Homepage";
import { useNavigate } from "react-router-dom";
const Playsongs = () => {

const navigation=useNavigate()

  const musicref = useRef(null);
  const [isplay, setIsplay] = useState(false);

  const [currentTime, setCurrettime] = useState(0);
  const [duration, setDuration] = useState(0);
  //playpause
  const playmusic = () => {
    musicref.current.play();
    setIsplay(true);
  };

  const pausemusic = () => {
    musicref.current.pause();
    setIsplay(false);
  };

  const musicplaypause = () => {
    if (isplay) {
      pausemusic();
    } else {
      playmusic();
    }
  };

  const settingCurrentTime = () => {
    setCurrettime(musicref.current.currentTime);
  };

  const settingDuration = () => {
    setDuration(musicref.current.duration);
  };

  //format time (9:00)

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5999/authentication/getallsongs")
      .then((res) => res.json())
      .then((data) => {
        console.log("songs:", data);
        setSongs(data);
        setCurrentSong(data[0]);
      });
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-[#0b0f19]/80 to-transparent backdrop-blur-xl border-t border-white/10 px-6 py-3" onClick={()=>{navigation("/musicplayer")}}>
      <div className="flex items-center justify-between">
        {/* LEFT - SONG INFO */}
        <div className="flex items-center gap-4 w-1/4">
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

        {/* CENTER - CONTROLS + PROGRESS */}
        <div className="flex flex-col items-center w-2/4">
          {/* CONTROLS */}
          <div className="flex items-center gap-6 mb-2">
            <button className="text-gray-400 hover:text-white transition">
              <IoPlaySkipBackOutline className="w-5 h-5" />
            </button>

            <button
              onClick={musicplaypause}
              className="bg-white text-black p-2 rounded-full hover:scale-110 active:scale-95 transition"
            >
              {isplay ? (
                <FaRegCirclePause className="w-6 h-6" />
              ) : (
                <FaRegCirclePlay className="w-6 h-6" />
              )}
            </button>

            <button className="text-gray-400 hover:text-white transition">
              <IoPlaySkipForwardOutline className="w-5 h-5" />
            </button>
          </div>

          {/* PROGRESS BAR */}
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
                musicref.current.currentTime = e.target.value;
                setCurrettime(e.target.value);
              }}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />

            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* RIGHT - VOLUME */}
        <div className="flex items-center gap-3 w-1/4 justify-end">
          <FiVolume2 className="text-white w-5 h-5" />

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={(e) => {
              musicref.current.volume = e.target.value;
            }}
            className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>
      </div>

      {/* AUDIO */}
      <audio
        src={
          currentSong ? `http://localhost:5999/uploads/${currentSong.file}` : ""
        }
        ref={musicref}
        onTimeUpdate={settingCurrentTime}
        onLoadedMetadata={settingDuration}
        className="hidden"
      />
    </div>
  );
};

export default Playsongs;
