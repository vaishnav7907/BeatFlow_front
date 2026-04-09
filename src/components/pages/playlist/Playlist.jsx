import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import imges from "../../../assets/welcomepageimg/vv.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BiLogInCircle } from "react-icons/bi";

const Playlist = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const songId = location.state?.songId; //  receive songId

  const [createplaylist, setcreateplalist] = useState([]);

  //  create playlist
  const playlistcreatefn = async () => {
    const res = await axios.post(
      "http://localhost:5999/authentication/createplaylist",
      {
        playlistname: `playlist${createplaylist.length + 1}`,
      },
    );

    setcreateplalist((prev) => [...prev, res.data]);
  };

  //  fetch playlists
  useEffect(() => {
    const fetchallplaylist = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5999/authentication/getallplaylists",
        );
        setcreateplalist(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchallplaylist();
  }, []);

  // delete playlist
  const deleteplaylistfn = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5999/authentication/deleteplaylist/${id}`,
      );
      setcreateplalist((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // ADD SONG TO PLAYLIST
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
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl text-white mb-2">Your Playlists</h1>
          <p className="text-gray-400">
            Curated collections of your favorite music
          </p>
        </div>

        <button
          className="flex items-center justify-center gap-2 h-10 w-40 bg-white text-black rounded-full"
          onClick={playlistcreatefn}
        >
          <GoPlus />
          Create Playlist
        </button>
      </div>

      <div className="flex pt-10 gap-4 flex-wrap">
        {createplaylist.map((item) => (
          <div
            key={item._id}
            className="group w-72 p-5 rounded-2xl bg-linear-to-br from-gray-900 to-black border border-white/10 shadow-md hover:shadow-xl hover:scale-[1.03] transition duration-300 cursor-pointer"
            onClick={() => addSongToPlaylist(item._id)}
          >
            {/* TOP ROW */}
            <div className="flex justify-between items-start">
              {/* TEXT */}
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {item.playlistname}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {item.songs?.length || 0} songs
                </p>
              </div>

              <div className="relative">
                <BsThreeDotsVertical
                  className="text-gray-300 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(activeMenu === item._id ? null : item._id);
                  }}
                />

                {activeMenu === item._id && (
                  <div className="absolute right-0 mt-2 bg-white text-black rounded-xl shadow-lg w-32 z-50 p-3">
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-400 rounded-t-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigation("/playlistname", {
                          state: { playlistId: item._id },
                        });
                      }}
                    >
                      Rename
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        (deleteplaylistfn(item._id),
                          { state: { playlistId: item._id } });
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-300 rounded-b-xl"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <div
                className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  navigation("/urplaylist");
                }}
              >
                <div className="bg-white text-black p-2 rounded-full hover:scale-110 transition">
                  <BiLogInCircle className="text-xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
