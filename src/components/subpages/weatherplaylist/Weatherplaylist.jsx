import React, { useEffect, useState } from "react";
import Sidebar from "../../pages/sidebar/Sidebar";
import Playlistsidebar from "../../pages/sidebar/Playlistsidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Weatherplaylist = () => {



  const categories = [
    {
      title: "Old Classics",
      songs: [
        {
          title: "Golden Melody",
          artist: "Artist A",
          img: "https://picsum.photos/300?1",
        },
        {
          title: "Vintage Love",
          artist: "Artist B",
          img: "https://picsum.photos/300?2",
        },
      ],
    },
    {
      title: "Mid Era Hits",
      songs: [
        {
          title: "Retro Beat",
          artist: "Artist C",
          img: "https://picsum.photos/300?3",
        },
        {
          title: "Urban Vibe",
          artist: "Artist D",
          img: "https://picsum.photos/300?4",
        },
      ],
    },

    {
      title: "New Trending",
      songs: [
        {
          title: "Fresh Drop",
          artist: "Artist E",
          img: "https://picsum.photos/300?5",
        },
        {
          title: "Hot Track",
          artist: "Artist F",
          img: "https://picsum.photos/300?6",
        },
      ],
    },
  ];
  const [getasong, setGetasong] = useState([]);

  const fetchasong = async () => {
    const getasongapi = await axios.get(
      "http://localhost:5999/authentication/getallsongs",
    );
    console.log(getasongapi.data);
    setGetasong(getasongapi.data);
  };

  useEffect(() => {
    fetchasong();
  }, []);
  return (
    <div>
      <div>
        <div>
          <div className="min-h-screen bg-[#0b0f19] text-white px-6 py-8 flex h-screen">
            {/* <div className="border-r-2 border-black">
              <Sidebar />
            </div> */}

            <div className="border-r-2 border-black pr-3 ">
              <Playlistsidebar />
            </div>
            {/* HEADER */}
            <div className="px-8 overflow-y-auto scroll-smooth">
              <div>
                <div className="mb-10">
                  <h1 className="text-5xl font-bold bg-linear-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    Weather Mood 🎧
                  </h1>
                  <p className="text-gray-400 mt-2 text-lg">
                    Curated playlists based on your vibe & weather
                  </p>
                </div>

                {/* WEATHER CARD */}
                <div className="mb-12 p-6 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg">
                  <h2 className="text-2xl font-semibold">🌧 Rainy Mood</h2>
                  <p className="text-gray-400 mt-1">
                    Perfect for calm & emotional tracks
                  </p>
                </div>
              </div>

              <div>
                <div className="w-full  bg-black p-7 overflow-auto rounded-3xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-7">
                  {getasong.map((song) => (
                    <div
                      className="w-60  bg-blue-200 rounded-3xl p-4 hover:bg-[#121826] transition hover:scale-105"
                      key={song._id}
                    >
                      <div className="w-full h-40 bg-gray-800 rounded-2xl mb-3 ">
                        {/* img */}
                        <img
                          src={`http://localhost:5999/${song.songimage}`}
                          alt=""
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                      <div>
                        <h1 className="text-black text-sm font-semibold truncate">
                          {/* Song Title */}
                          {song.songname}
                        </h1>
                        <p className="text-green-500 text-xs">
                          {/* Artist Name */}
                          {song.artist}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weatherplaylist;
