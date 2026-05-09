import React, { useState, useEffect } from "react";
import "../dashboard/Homepage.css";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { CgPlayListAdd } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { useplayer } from "../context/Playerprovider";
import Playsongs from "./Playsongs";
import { SlArrowRight } from "react-icons/sl";
const Homepage = () => {
  // const {setCurrentSong , setCurrentindex, setSonglist}= useOutletContext()   //outlet loode prop pass cheyyumbol ingane ahn destructure cheycth edukkunnath

  const { setCurrentSong, setCurrentindex, setSonglist } = useplayer();

  const navigatee = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const [artists, setArtists] = useState([]);
  const [getasong, setGetasong] = useState([]);

  // ✅ fetch artists
  useEffect(() => {
    const fetchartist = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/Beatflow/getallartists`,
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
          `${import.meta.env.VITE_API_URL}/Beatflow/getallsongs`,
        );
        setGetasong(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchasong();
  }, []);

  // addsongs to fav

  const addalltofav = async (songId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/Beatflow/addtofav`,
        { songId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("✅ Song added to favourites");
    } catch (error) {
      console.log("Favourite error", error.response?.data || error);
    }
  };
  const [playsongss, setplaysongss] = useState(false);

  return (
    <div className="w-full flex flex-col gap-9 min-h-screen overflow-x-hidden">
      {/* HEADER */}
      <div className="w-full ">
        <div className="flex justify-between">
          <div>
            <h1 className=" text-2xl md:text-5xl lg:text-5xl text-white mb-4">
              Good Afternoon
            </h1>
            <p className="text:xs text-gray-500 md:text-xl">
              Explore thousands of tracks
            </p>
          </div>
          <div className="text-red-500 hover:scale-110 transition duration-300 ">
            <IoIosLogOut
              className="w-3 h-3   md:w-8 md:h-8 lg:w-8 lg:h-8 "
              onClick={() => logout()}
            />
          </div>
        </div>

        <div className="w-full h-0.5 bg-gray-900 mt-4"></div>
      </div>

      {/* FEATURED */}
      {/* {getasong.length >= 3 && (
        <div className="slider">
          {getasong.slice(2, 5).map((song, index) => (
            <div className={`card c${index + 1}`} key={song._id}>
              <img src={`http://localhost:5999/${song.songimage}`} alt="nnn" />
            </div>
          ))}
        </div>
      )} */}

      <div className="relative w-full h-50 md:h-80 lg:h-80 overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-3xl bg-black border border-zinc-800 p-5 lg:p-10 md:p-10 flex flex-col justify-between  shadow-2xl">
        <div className="overflow-auto md:overflow-hidden lg:overflow-hidden">
          <h3 className=" text-lg md:text-5xl lg:text-5xl font-extrabold text-white leading-tight ">
            “Let the music <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
              color your soul.”
            </span>
          </h3>

          <p className="text-gray-200 text-xs md:text-lg lg:text-lg leading-4 md:leading-9 lg:leading-9 font-light tracking-wide max-w-5xl drop-shadow-sm pt-1 md:pt-5 lg:pt-5">
            Dive into a world where every beat brings
            <span className="text-purple-400 font-medium"> peace</span>, every
            lyric creates
            <span className="text-pink-400 font-medium"> memories</span>, and
            every song becomes a companion for your soul. Enjoy
            <span className="text-white font-semibold">
              {" "}
              unlimited music for free
            </span>
            , discover beautiful vibes, and let your heart dance with the rhythm
            of timeless melodies. 🎶
          </p>
        </div>
      </div>

      {/* PLAYLIST CARD */}
      <div className="flex justify-around gap-2  md:justify-between lg:justify-between  items-center bg-[#0b0f19] p-3 md:p-6 lg:p-6 rounded-2xl md:rounded-3xl lg:rounded-3xl">
        <div>
          <h4 className="text-gray-300 italic text-sm md:text-2xl lg:text-2xl">
            "Where memories turn into music."
          </h4>
        </div>

        <BsArrowRight
          onClick={() => navigatee("/playlistforu")}
          className="text-white text-lg md:text-3xl lg:text-3xl  cursor-pointer right-0"
        />
      </div>

      {/* ARTISTS */}
      <div>
        <h1 className=" text-lg md:text-2xl lg:text-2xl text-white">
          {" "}
          Artists
        </h1>

        <div className="flex items-center justify-around">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-7 pt-5">
            {artists.map((artist) => (
              <div
                key={artist._id}
                className="flex flex-col justify-center items-center "
              >
                <img
                  className="w-24 h-24 rounded-full object-cover"
                  src={`${import.meta.env.VITE_API_URL}/${artist.artistimge}`}
                  alt="nnn"
                />
                <p className="text-white text-xs md:text-sm lg:text-sm mt-2">
                  {artist.artistname}
                </p>
              </div>
            ))}
            <div
              className="text-white flex items-center  "
              onClick={() => navigatee("/artistpage")}
            >
              <button>
                <SlArrowRight size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SONGS */}
      <div>
        <h1 className="text-lg md:text-2xl lg:text-2xl text-white">
          Songs for you
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 ">
          {getasong.map((songdisplay, index) => (
            <div
              key={songdisplay._id}
              className="flex gap-3 bg-gray-950 p-3 rounded-2xl flex-wrap md:flex-nowrap lg:flex-nowrap"
              onClick={() => {
                setCurrentSong(songdisplay);
                setSonglist(getasong);
                setCurrentindex(index);
                setplaysongss(true);
              }}
            >
              <div className=" w-36 h-32 ">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${songdisplay.songimage}`}
                  className="w-full h-full md:w-40 md:h-32 lg:w-40 lg:h-32 object-cover rounded-xl hover:scale-3d hover:scale-105 transition duration-150 "
                  alt="nnn"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div className="flex justify-end">
                  <FaHeart
                    className="text-red-400 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      addalltofav(songdisplay._id);
                    }}
                  />
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
        {playsongss && (
          <div className="   ">
            <Playsongs />
            {/* currentSong={currentSong}  setCurrentSong={setCurrentSong} songlist={songlist}  currentindex={currentindex} setCurrentindex={setCurrentindex} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
