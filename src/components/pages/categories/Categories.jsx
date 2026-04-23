import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useplayer } from "../../context/Playerprovider";
import { CgPlayListAdd } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  // 🔍 API CALL
  const handleSearch = async (searchText) => {
    try {
      const q = searchText.trim();
      if (!q) {
        setSongs([]);
        setSearched(false);
        return;
      }

      const res = await axios.get(
        `http://localhost:5999/authentication/searchsongs?query=${q}`,
      );

      setSongs(res.data);
      setSearched(true);
    } catch (error) {
      console.log(error);
    }
  };

  // ⚡ LIVE SEARCH (Debounce)
  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch(query);
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  const { setCurrentSong, setSonglist, setCurrentindex } = useplayer();

  // add to fav

  const addalltofav = async (songId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5999/authentication/addtofav",
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

  //add to playlist

  const addSongToPlaylist = async (playlistId) => {
    if (!songId) {
      // navigation("/urplaylist");
      return;
    }

    try {
      await axios.post("http://localhost:5999/authentication/addsongplaylist", {
        playlistId,
        songId,
      });

      alert("✅ Song added!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-7">
        {/* Heading */}
        <div>
          <h1 className="text-4xl text-white mb-2">Discover Music</h1>
          <p className="text-gray-400">Find your next favorite track</p>
        </div>

        {/* 🔍 Search Bar */}
        <div className="flex justify-start items-center relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(query);
            }}
            className="w-full bg-gray-900 border-gray-800 rounded-xl px-5 py-4 text-white"
            placeholder="Search for songs or artists..."
          />

          <IoSearch
            onClick={() => handleSearch(query)}
            className="text-gray-400 absolute right-3 cursor-pointer"
            size={21}
          />
        </div>

        {/* 🎵 Results */}
        <div>
          {searched &&
            (songs.length > 0 ? (
              songs.map((song, index) => (
                <div
                  key={song._id}
                  className="text-white mt-3 h-20 w-full pl-2 pr-5 bg-gray-900 rounded-lg hover:bg-gray-950  flex justify-between items-center"
                  onClick={() => {
                    setCurrentSong(songs[index]);
                    setSonglist(songs);
                    setCurrentindex(index);
                  }}
                >
                  <div className="flex gap-5">
                    <div className="w-16 h-16">
                      <img
                        src={`http://localhost:5999/${song.songimage}`}
                        alt=""
                        className="rounded-lg h-full w-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold  ">
                        {song.songname || song.title}
                      </h3>
                      <p className="text-gray-400">
                        {song.artist || "Unknown Artist"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <FaHeart
                      className="text-red-400 cursor-pointer"
                      onClick={(e) => {
                        (e.stopPropagation(), addalltofav(song._id));
                      }}
                    />

                    <CgPlayListAdd
                      className="text-green-400 text-2xl cursor-pointer"
                      onClick={(e) => {
                        navigate("/dashboard/playlist", {
                          state: { songId: song._id },
                        });
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-3">No songs found</p>
            ))}
        </div>

        {/* 🎼 Categories */}
        {/* <div className="flex gap-3">
          <button className="bg-gray-900 px-6 py-2 rounded-full hover:bg-gray-500">
            All
          </button>
          <button className="bg-gray-900 px-6 py-2 rounded-full hover:bg-gray-500">
            Tamil
          </button>
          <button className="bg-gray-900 px-6 py-2 rounded-full hover:bg-gray-500">
            Malayalam
          </button>
          <button className="bg-gray-900 px-6 py-2 rounded-full hover:bg-gray-500">
            Hindi
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Categories;
