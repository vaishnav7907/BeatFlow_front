import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import imges from "../../../assets/welcomepageimg/vv.png";
import { useLocation, useNavigate, useOutletContext,  } from "react-router-dom";
import axios from "axios";
import { useplayer } from "../../context/Playerprovider";

const PlaylistContent = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const playlistId = location.state?.playlistId;
  const [openMenu, setOpenMenu] = useState(null);
  const [getallsongs, setGetallsongs] = useState([]);

  const getallplaylistSongs = async () => {
    const getallsongsapi = await axios.get(
      `http://localhost:5999/authentication/getplaylists/${playlistId}`,
    );
    setGetallsongs(getallsongsapi.data.songs);
  };
  useEffect(() => {
    if (playlistId) {
      getallplaylistSongs();
    }
  }, [playlistId]);

  const { setCurrentSong, setSonglist, setCurrentindex } = useplayer();
 

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
           
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              {/* INDEX (nice touch) */}
              <span className="text-gray-500 text-sm w-5">{index + 1}</span>

              {/* IMAGE */}
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow">
                <img
                  src={imges}
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
            <div className="flex items-center gap-5">
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

                    <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/20">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistContent;
