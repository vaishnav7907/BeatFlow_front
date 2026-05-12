import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CgPlayListAdd } from "react-icons/cg";
import { useplayer } from "../../context/Playerprovider";
import Playsongs from "../../dashboard/Playsongs";
const Favorites = () => {
  // const location = useLocation();
  // const songId = location.state?.songId;
const navigate=useNavigate()
  const [getfavsongs, setGetfavsongs] = useState([]);

  const getaddfavsongs = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      const favouriteapi = await axios.get(
        `${import.meta.env.VITE_API_URL}/Beatflow/getallfav`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setGetfavsongs(favouriteapi.data);
    } catch (error) {
      console.error("Error fetching favourites", error.response?.data || error);
    }
  };
  useEffect(() => {
    getaddfavsongs();
  }, []);

  const deletefav = async (songId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/Beatflow/removefavsongs/${songId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setGetfavsongs((prev) =>
        prev.filter((item) => item.songId._id !== songId),
      );
    } catch (error) {
      console.log("removefav error", error);
    }
  };

  const totalduration = getfavsongs.reduce((total, item) => {
    return total + (item.songId.duration || 0);
  }, 0);

  const converttomin = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes} min ${sec < 10 ? "0" : ""}${sec}sec`;
  };

  const { setCurrentSong, setSonglist, setCurrentindex } = useplayer();

  const favSongsOnly = getfavsongs.map((item) => item.songId); //without this one song is play

  //add to playlist

  const addSongToPlaylist = async (playlistId) => {
    if (!songId) {
      // navigation("/urplaylist");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/Beatflow/addsongplaylist`, {
        playlistId,
        songId,
      });

      alert("✅ Song added!");
    } catch (error) {
      console.log(error);
    }
  };

const [clickplaysong,setClickplaysong]=useState(false)

  return (
      <div className="w-full overflow-x-hidden">
    <div className="p-3 sm:p-5 md:p-6 lg:p-7">
      {/* HEADER */}

      <div className="flex  sm:flex-row sm:items-center gap-4">
        <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex justify-center items-center shrink-0">
          <MdFavorite className="text-white text-2xl sm:text-3xl" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-pink-500 to-rose-500 bg-clip-text text-transparent">
            Favorites
          </h1>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-1">
            {getfavsongs.length} songs you love
          </p>
        </div>
      </div>

      {/* BUTTON */}

      <div className="pt-6 sm:pt-7">
        <button className="w-full sm:w-auto px-5 py-3 sm:px-8 bg-white text-black rounded-full hover:bg-gray-200 transition duration-300 flex items-center justify-center gap-2 font-medium">
          <MdFavorite />
          <h3>
            Play All <span className="hidden sm:inline">Favorites</span>
          </h3>
        </button>
      </div>

      {/* SONG CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
        {getfavsongs.map((favsongs, index) => (
          <div
            key={favsongs._id}
            className="group relative rounded-2xl w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 p-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            onClick={() => {
              setSonglist(favSongsOnly);
              setCurrentindex(index);
              setCurrentSong(favSongsOnly[index]);
              setClickplaysong(true);
            }}
          >
            {/* IMAGE */}

            <div className="w-full h-44 sm:h-48 md:h-52 rounded-xl overflow-hidden">
              <img
                src={`${import.meta.env.VITE_API_URL}/${favsongs.songId?.songimage}`}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                alt=""
              />
            </div>

            {/* CONTENT */}

            <div className="pt-2">
              <h5 className="text-white text-sm sm:text-base font-semibold truncate">
                {favsongs.songId?.songname}
              </h5>

              <p className="text-gray-400 text-xs sm:text-sm truncate mt-1">
                {favsongs.songId?.artist}
              </p>
            </div>

            {/* ACTIONS */}

            <div className="flex items-center justify-between pt-5">
              <CgPlayListAdd
                className="text-green-400 text-2xl cursor-pointer hover:scale-110 transition duration-300"
                onClick={(e) => {
                  e.stopPropagation();

                  navigate("/dashboard/playlist", {
                    state: { songId: favsongs.songId._id },
                  });
                }}
              />

              <FaHeart
                className="text-red-400 text-lg sm:text-xl cursor-pointer hover:scale-110 transition duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  deletefav(favsongs.songId._id);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* STATS */}

      <div className="pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TOTAL SONGS */}

          <div className="border border-zinc-900 rounded-2xl p-5 bg-zinc-950">
            <h3 className="text-gray-400 text-sm mb-2">Total Songs</h3>

            <p className="text-2xl sm:text-3xl font-bold text-white">
              {getfavsongs.length}
            </p>
          </div>

          {/* QUOTE */}

          <div className="border border-zinc-900 rounded-2xl p-5 bg-zinc-950 flex justify-center items-center">
            <h3 className="text-gray-300 text-sm sm:text-base md:text-lg text-center italic leading-relaxed">
              <span className="text-red-500 text-2xl">“</span>
              Where words fail, music speaks
              <span className="text-red-500 text-2xl">”</span>
            </h3>
          </div>

          {/* DURATION */}

          <div className="border border-zinc-900 rounded-2xl p-5 bg-zinc-950">
            <h3 className="text-gray-400 text-sm mb-2">
              Total Duration
            </h3>

            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {converttomin(totalduration)}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* PLAYER */}

    {clickplaysong && (
      <div className="w-full">
        <Playsongs />
      </div>
    )}
  </div>
  );
};

export default Favorites;
