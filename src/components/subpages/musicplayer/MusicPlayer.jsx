import React, { useEffect, useRef, useState } from "react";
import { IoPlaySkipBackOutline } from "react-icons/io5";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";
import img from "../../../assets/welcomepageimg/vv.png";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const MusicPlayer = () => {
  const location = useLocation();
  const song = location.state?.songplay;
  console.log(song);
  
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

  const navigation = useNavigate();
  useEffect(() => {
    if (song && musicref.current) {
      musicref.current.play();
      setIsplay(true);
    }
  }, [song]);

  return (
    <div className="bg-black w-full h-screen p-6 ">
      <div>
        <FaArrowLeftLong
          size={37}
          onClick={() => navigation("/dashboard/homepage")}
          className="cursor-pointer text-gray-400 transition"
        />
      </div>

      <div className="flex w-full h-full  items-center justify-center flex-wrap md:items-center md:justify-between md:flex-nowrap xl:items-center xl:justify-between  xl:flex-nowrap">
        <div className="w-1/2 flex items-center justify-center">
          <div className=" w-96 h-96 bg-amber-600 rounded-3xl">
            <img
              src={`http://localhost:5999/${song.songimage}`}
              alt="music"
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>
        </div>
        <div className="w-full ">
          <div className="flex flex-col items-center ">
            <div>
              <h5 className="text-white">{song?.songname || "No song"}</h5>
              <p className="text-white">{song?.artist || "Unknown"}</p>
            </div>
            {/* CONTROLS */}
            <div className="flex items-center gap-6 mb-2 pt-4">
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
            <audio className="hidden"
              ref={musicref}
              src={`http://localhost:5999/${song?.file.replace(/\\/g, "/")}`}
              onTimeUpdate={settingCurrentTime}
              onLoadedMetadata={settingDuration}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
