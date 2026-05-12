import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

import Playsongs from "../../dashboard/Playsongs";
import { FaHeart } from "react-icons/fa";
import { useplayer } from "../../context/Playerprovider";

const PlaylistContent = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const playlistId = location.state?.playlistId;
  const [openMenu, setOpenMenu] = useState(null);
  const [getallsongs, setGetallsongs] = useState([]);

  const getallplaylistSongs = async () => {
    const getallsongsapi = await axios.get(
      `${import.meta.env.VITE_API_URL}/Beatflow/getplaylists/${playlistId}`,
    );
    setGetallsongs(getallsongsapi.data.songs);
  };
  useEffect(() => {
    if (playlistId) {
      getallplaylistSongs();
    }
  }, [playlistId]);

  const dltplaylistsong = async (songid) => {
    try {
      const deleteapi = await axios.delete(
        `${import.meta.env.VITE_API_URL}/Beatflow/dltplaylistsong/${playlistId}/${songid}`,
      );

      setGetallsongs((sng) => sng.filter((item) => item._id !== songid));
    } catch (error) {
      console.log(error);
    }
  };

  const { setCurrentSong, setSonglist, setCurrentindex } = useplayer();

  const [playlistplay, setPlaylistplay] = useState(false);

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
    <div className="bg-[#0b0f19] min-h-screen p-6 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <FaArrowLeftLong
          size={32}
          onClick={() => navigation("/dashboard/playlist")}
          className="cursor-pointer hover:text-gray-400 transition"
        />

        <GoPlus
          size={26}
          className="cursor-pointer hover:text-green-400 transition"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-semibold mb-6 tracking-wide">
        My Collections
      </h1>

      {/* SONG CONTAINER */}

      <div className="bg-[#121826] rounded-2xl p-3 space-y-2 shadow-lg">
        {getallsongs.map((dothing, index) => (
          <div
            key={dothing._id}
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 transition duration-300 group"
            onClick={() => {
              (setPlaylistplay(true),
                setSonglist(getallsongs),
                setCurrentindex(index),
                setCurrentSong(getallsongs[index]));
            }}
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              {/* INDEX (nice touch) */}
              <span className="text-gray-500 text-sm w-5">{index + 1}</span>

              {/* IMAGE */}
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${dothing.songimage}`}
                  alt="song"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* TEXT */}
              <div>
                <h2 className="text-sm font-semibold text-white group-hover:text-green-400 transition">
                  {dothing.songname}
                </h2>
                <p className="text-xs text-gray-400 group-hover:text-gray-300">
                  {dothing.artist}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-10">
              <div className=" ">
                <FaHeart
                  className="hover:text-red-500 hover:scale-125"
                  size={17}
                  onClick={(e) => {
                    (e.stopPropagation(), addtofav(dothing._id));
                  }}
                />
              </div>

              {/* DURATION */}
              <span className="text-xs text-gray-500 group-hover:text-gray-300 hidden sm:block">
                3:45
              </span>

              {/* MENU */}
              <div className="relative">
                <BsThreeDotsVertical
                  className="cursor-pointer text-gray-500 hover:text-white transition"
                  onClick={(e) => {
                    e.stopPropagation(); // important
                    setOpenMenu(openMenu === dothing._id ? null : dothing._id);
                  }}
                />

                {openMenu === dothing._id && (
                  <div className="absolute right-0 top-7 bg-[#1a1f2e] border border-white/10 rounded-xl shadow-xl w-28 overflow-hidden z-50">
                    {/* <button className="w-full text-left px-3 py-2 text-sm hover:bg-white/10">
                      Edit
                    </button> */}

                    <button
                      className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        dltplaylistsong(dothing._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {playlistplay && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <Playsongs />
        </div>
      )}
    </div>
  );
};

export default PlaylistContent;
