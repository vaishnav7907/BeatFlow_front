import React, { useEffect, useState } from "react";
import Sidebar from "../../../pages/sidebar/Sidebar";
import Playlistsidebar from "../../../pages/sidebar/Playlistsidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useplayer } from "../../../context/Playerprovider";
import Playsongs from "../../../dashboard/Playsongs";
import { FaHeart } from "react-icons/fa";
import { CgPlayListAdd } from "react-icons/cg";

const Weatherplaylist = () => {
  //weather api=  https://api.openweathermap.org/data/2.5/weather?q=kerala&appid=d9ad3915f576967fe4c4d67e89acd522
  //  Thunderstorm, Drizzle, Rain, Snow, Atmosphere (mist, fog, smoke), Clear, and Clouds

  const [getweathersongs, setGetweathersongs] = useState([]);

  const navigate = useNavigate();

  const fetchweathersong = async (weather) => {
    try {
      const getasongapi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Beatflow/weathersongs?weather=${weather}`,
      );
      console.log(getasongapi.data);
      setGetweathersongs(getasongapi.data);
    } catch (error) {
      console.log("fetch weathersong error", error);
    }
  };

  // weatherapi=  "https://api.openweathermap.org/data/2.5/weather?q=kerala&appid=d9ad3915f576967fe4c4d67e89acd522"

  const [weathertype, setWeathertype] = useState("");

  const weatherset = async () => {
    try {
      const weatherapi = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=kerala&appid=d9ad3915f576967fe4c4d67e89acd522",
      );
      console.log(weatherapi.data);

      const mainweather = weatherapi.data.weather[0].main;
      setWeathertype(mainweather);
      fetchweathersong(mainweather);
    } catch (error) {
      console.log("weather api error", error);
    }
  };

  useEffect(() => {
    weatherset();
  }, []);

  const { setCurrentSong, setSonglist, setCurrentindex } = useplayer();

  const [playweathersongs, setPlayweathersongs] = useState(false);

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
      <div className=" pl-4  sm:px-8 md:px-8 lg:px-8    w-full">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Weather Mood 🎧
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-lg md:text-lg lg:text-lg">
            Curated playlists based on your vibe & weather
          </p>
        </div>

        {/* WEATHER CARD */}
        <div className="mb-12 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl ">
          <h2 className="text-md sm:text-2xl md:text-2xl lg:text-2xl font-semibold tracking-wide">
            {weathertype}
          </h2>
          <p className="text-gray-400 mt-1 text-sm sm:text-lg md:text-lg lg:text-lg">
            Perfect for calm & emotional tracks
          </p>
        </div>

        {/* SONG GRID */}
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-1 sm:p-7 md:p-7 lg-p-7 rounded-3xl grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 ">
          {getweathersongs.map((song, index) => (
            <div
              key={song._id}
              className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-2 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-xl w-full"
              onClick={() => {
                setPlayweathersongs(true);
                setSonglist(getweathersongs);
                setCurrentindex(index);
                setCurrentSong(getweathersongs[index]);
              }}
            >
              {/* IMAGE */}
              <div className="w-full h-40 rounded-xl overflow-hidden mb-3">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${song.songimage}`}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 relative"
                />

                <FaHeart
                  className="hover:text-red-500 hover:scale-125 absolute top-4 right-4"
                  size={17}
                  onClick={(e) => {
                    (e.stopPropagation(), addtofav(song._id));
                  }}
                />
              </div>

              {/* TEXT */}
              <div>
                <h1 className="text-white text-sm font-semibold truncate">
                  {song.songname}
                </h1>

                <p className="text-gray-400 text-xs mt-1 truncate">
                  {song.artist}
                </p>
                <CgPlayListAdd
                  className="text-green-400 text-2xl cursor-pointer hover:scale-110 transition duration-300"
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate("/dashboard/playlist", {
                      state: { songId: song._id },
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {playweathersongs && (
          <div className="fixed bottom-0 left-0 w-full z-50">
            <Playsongs />
          </div>
        )}
      </div>
    </div>
  );
};

export default Weatherplaylist;
