import React, { useEffect, useRef, useState } from "react";
import { IoPlaySkipBackOutline } from "react-icons/io5";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { useplayer } from "../../context/Playerprovider";

const MusicPlayer = () => {
  const {
    currentSong,
    setCurrentSong,
    songlist,
    currentindex,
    setCurrentindex,
  } = useplayer();

  const song = currentSong;
  // const location = useLocation();
  // const song = location.state?.currentSong;

  const forwardsong = () => {
    if (!songlist.length) return;

    const nextindex = (currentindex + 1) % songlist.length;

    setCurrentindex(nextindex);
    setCurrentSong(songlist[nextindex]);
  };

  const backwardsong = () => {
    if (!songlist.length) return;

    const previndex = (currentindex - 1 + songlist.length) % songlist.length;

    setCurrentindex(previndex);
    setCurrentSong(songlist[previndex]);
  };
  const musicref = useRef(null);

  const [isplay, setIsplay] = useState(false);
  const [currentTime, setCurrettime] = useState(0);
  const [duration, setDuration] = useState(0);

  // PLAY
  const playmusic = () => {
    musicref.current.play();
    setIsplay(true);
  };

  // PAUSE
  const pausemusic = () => {
    musicref.current.pause();
    setIsplay(false);
  };

  // PLAY / PAUSE
  const musicplaypause = () => {
    if (isplay) {
      pausemusic();
    } else {
      playmusic();
    }
  };

  // CURRENT TIME
  const settingCurrentTime = () => {
    setCurrettime(musicref.current.currentTime);
  };

  // DURATION
  const settingDuration = () => {
    setDuration(musicref.current.duration);
  };

  // FORMAT TIME
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const navigation = useNavigate();

  // useEffect(() => {
  //   if (song && musicref.current) {
  //     musicref.current.play();
  //     setIsplay(true);
  //   }
  // }, [song]);

  useEffect(() => {
    if (!song || !musicref.current) return;

    musicref.current.load();

    playmusic();
    setCurrettime(0);
    setDuration(0);
  }, [song]);

  return (
    <div
      className="min-h-screen p-4 sm:p-6 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url(${import.meta.env.VITE_API_URL}/${song?.songimage?.replace(
          /\\/g,
          "/",
        )})`,
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

      <div className="relative z-10">
        <div className="mb-6">
          <FaArrowLeftLong
            size={28}
            onClick={() => navigation(-1)}
            className="cursor-pointer text-gray-400 hover:text-white transition duration-300"
          />
        </div>

        <div className="flex flex-col items-center justify-center min-h-[85vh]">
          <div className="w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl rounded-3xl p-5 sm:p-8">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-white text-lg sm:text-3xl md:text-4xl font-bold tracking-wide capitalize break-words">
                  {song?.songname || "No Song"}
                </h1>

                <p className="text-zinc-300 text-sm sm:text-base md:text-lg mt-3 tracking-wide">
                  {song?.artist || "Unknown Artist"}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 pt-2">
                <button
                  onClick={backwardsong}
                  className="w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition duration-300"
                >
                  <IoPlaySkipBackOutline className="w-5 h-5" />
                </button>

                <button
                  onClick={musicplaypause}
                  className="bg-green-500 text-black p-4 sm:p-5 rounded-full hover:scale-110 active:scale-95 transition duration-300 shadow-lg shadow-green-500/30"
                >
                  {isplay ? (
                    <FaRegCirclePause className="w-5 h-5 sm:w-8 sm:h-8" />
                  ) : (
                    <FaRegCirclePlay className="w-5 h-5 sm:w-8 sm:h-8" />
                  )}
                </button>

                <button
                  onClick={forwardsong}
                  className="w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition duration-300"
                >
                  <IoPlaySkipForwardOutline className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 w-full">
                <span className="text-[10px] sm:text-xs text-gray-300 w-10 text-right">
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
                  className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-green-500 bg-zinc-700"
                />

                <span className="text-[10px] sm:text-xs text-gray-300 w-10">
                  {formatTime(duration)}
                </span>
              </div>

              {/* AUDIO */}
              <audio
                className="hidden"
                ref={musicref}
                src={`${import.meta.env.VITE_API_URL}/${song?.file?.replace(
                  /\\/g,
                  "/",
                )}`}
                onTimeUpdate={settingCurrentTime}
                onLoadedMetadata={settingDuration}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
