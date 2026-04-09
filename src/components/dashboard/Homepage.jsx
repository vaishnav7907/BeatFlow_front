import React, { useState, useEffect } from "react";
import "../dashboard/Homepage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { CgPlayListAdd } from "react-icons/cg";

const Homepage = () => {
  const navigatee = useNavigate();

  const [artists, setArtists] = useState([]);
  const [getasong, setGetasong] = useState([]);

  // ✅ fetch artists
  useEffect(() => {
    const fetchartist = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5999/authentication/getallartists",
        );
        setArtists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchartist();
  }, []);

  // ✅ fetch songs
  useEffect(() => {
    const fetchasong = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5999/authentication/getallsongs",
        );
        setGetasong(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchasong();
  }, []);

  return (
    <div className="w-full flex flex-col gap-9 min-h-screen">
      {/* HEADER */}
      <div>
        <h1 className="text-5xl text-white mb-4">Good Afternoon</h1>
        <p className="text-gray-500 text-xl">Explore thousands of tracks</p>
        <div className="w-full h-0.5 bg-gray-900 mt-4"></div>
      </div>

      {/* FEATURED */}
      {getasong.length >= 3 && (
        <div className="slider">
          {getasong.slice(2, 5).map((song, index) => (
            <div className={`card c${index + 1}`} key={song._id}>
              <img src={`http://localhost:5999/${song.songimage}`} alt="" />
            </div>
          ))}
        </div>
      )}

      {/* PLAYLIST CARD */}
      <div className="flex justify-between items-center bg-[#0b0f19] p-6 rounded-3xl">
        <div>
          <h4 className="text-gray-300 italic text-2xl">
            "Where memories turn into music."
          </h4>
        </div>

        <BsArrowRight
          onClick={() => navigatee("/playlistforu")}
          className="text-white text-3xl cursor-pointer"
        />
      </div>

      {/* ARTISTS */}
      <div>
        <h1 className="text-2xl text-white">Your Favourite Artists</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 pt-5">
          {artists.map((artist) => (
            <div key={artist._id} className="flex flex-col items-center">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={`http://localhost:5999/${artist.artistimge}`}
                alt=""
              />
              <p className="text-white text-sm mt-2">{artist.artistname}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SONGS */}
      <div>
        <h1 className="text-2xl text-white">Songs for you</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 ">
          {getasong.map((songdisplay) => (
            <div
              key={songdisplay._id}
              className="flex gap-3 bg-gray-950 p-3 rounded-2xl "
            >
              <img
                src={`http://localhost:5999/${songdisplay.songimage}`}
                className="w-40 h-32 object-cover rounded-xl hover:scale-3d hover:scale-105 transition duration-150 "
                alt=""
              />

              <div className="flex flex-col justify-between">
                <div className="flex justify-end">
                  <FaHeart className="text-red-400" />
                </div>

                <div>
                  <h5 className="text-white">{songdisplay.songname}</h5>
                  <p className="text-green-300 text-sm">{songdisplay.artist}</p>
                </div>

                {/* ✅ Only this changed */}
                <div className="flex justify-end hover:scale-110 ">
                  <CgPlayListAdd
                    className="text-green-400 text-2xl cursor-pointer"
                    onClick={() =>
                      navigatee("/dashboard/playlist", {
                        state: { songId: songdisplay._id },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
