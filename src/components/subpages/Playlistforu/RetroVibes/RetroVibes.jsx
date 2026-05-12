import React, { useEffect, useState } from "react";
import axios from "axios";
import { useplayer } from "../../../context/Playerprovider";
import Playsongs from "../../../dashboard/Playsongs";
import { FaHeart } from "react-icons/fa";
import { CgPlayListAdd } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
const RetroVibes = () => {
  const [songs, setSongs] = useState([]);

  const navigate = useNavigate();

  const fetcholdsongs = async () => {
    try {
      const oldsongapi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Beatflow/getoldsongs`,
      );
      setSongs(oldsongapi.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetcholdsongs();
  }, []);
  const { setCurrentSong, setSonglist, setCurrentindex } = useplayer();
  const [playretrosongs, setPlayretrosongs] = useState(false);

  const addSongToPlaylist = async (playlistId) => {
    if (!songId) {
      // navigation("/urplaylist");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/Beatflow/addsongplaylist`,
        {
          playlistId,
          songId,
        },
      );

      alert("✅ Song added!");
    } catch (error) {
      console.log(error);
    }
  };

  const addtofav = async (songId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/Beatflow/addtofav`,
        { songId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("✅ Added to favourites");
    } catch (error) {
      console.log("Fav error", error.response?.data || error);
    }
  };

  return (
    <div className="">
      <div className="pl-4 sm:px-8 md:px-8 lg:px-8 overflow-y-auto scroll-smooth w-full">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-5xl  font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
            RETRO
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-lg md:text-lg lg:text-lg">
            Step into the past . . . with timeless melodies . . .
          </p>
        </div>

        <div className="mb-12 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-semibold tracking-wide"></h2>
          <p className="text-gray-400 mt-1">
            Perfect for calm & emotional tracks
          </p>
        </div>

        {/* SONG GRID */}

        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-1 sm:p-7 md:p-7 lg-p-7 rounded-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {songs.map((oldsongs, index) => (
            <div
              className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-2 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-xl"
              key={oldsongs._id}
              onClick={() => {
                setPlayretrosongs(true);
                setSonglist(songs);
                setCurrentindex(index);
                setCurrentSong(songs[index]);
              }}
            >
              {/* IMAGE */}
              <div className="w-full h-40 rounded-xl overflow-hidden mb-3">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${oldsongs.songimage}`}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <FaHeart
                  className="hover:text-red-500 hover:scale-125 absolute top-4 right-4"
                  size={17}
                  onClick={(e) => {
                    (e.stopPropagation(), addtofav(oldsongs._id));
                  }}
                />
              </div>

              {/* TEXT */}
              <div>
                <h1 className="text-white text-sm font-semibold truncate">
                  {oldsongs.songname}
                </h1>

                <p className="text-gray-400 text-xs mt-1 truncate">
                  {oldsongs.artist}
                </p>

                <CgPlayListAdd
                  className="text-green-400 text-2xl cursor-pointer hover:scale-110 transition duration-300"
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate("/dashboard/playlist", {
                      state: { songId: oldsongs._id },
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {playretrosongs && (
          <div className="fixed bottom-0 left-0 w-full z-50">
            <Playsongs />
          </div>
        )}
      </div>
    </div>
  );
};

export default RetroVibes;
