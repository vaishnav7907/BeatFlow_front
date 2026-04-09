import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Playlistname = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const playlistId = location.state?.playlistId;
  const [updateplaylist, setUpdateplaylist] = useState("");

  const updatePlaylists = async () => {
    try {
      const updateplaylisapi = await axios.patch(
        `http://localhost:5999/authentication/updtplaylist/${playlistId}`,
        { playlistname: updateplaylist },
      );
      navigation("/dashboard/playlist")
      console.log(updateplaylisapi.data, playlistId);
    } catch (error) {
      console.log("updateplaylist error anu monne", error);
    }
  };

  return (
    <div className="w-full h-screen bg-linear-to-tr from-purple-900 via-black to-blue-900 flex flex-col">
      <div className="p-5 flex gap-3">
        <FaArrowLeftLong
          size={28}
          onClick={() => navigation("/dashboard/playlist")}
          className="cursor-pointer hover:text-gray-400 transition text-white"
        />
        <p className="text-white text-lg font-semibold ">Edit Playlist</p>
        <h1 className="text-red-400 text-2xl animate-bounce">.</h1>
      </div>

      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-white w-96 border border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-center ">
            Edit Playlist
          </h2>

          <input
            type="text"
            placeholder="Enter new playlist name"
            value={updateplaylist}
            onChange={(e) => setUpdateplaylist(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 outline-none mb-5 placeholder-gray-300 focus:ring-2 focus:ring-purple-500 "
          />

          <button
            className="w-full bg-purple-600 hover:bg-purple-700 transition p-3 rounded-xl font-semibold hover:scale-105 duration-300"
            onClick={updatePlaylists}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playlistname;
