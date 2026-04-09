import React, { Component, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { TbFileMusic, TbPlaylist } from "react-icons/tb";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import Homepage from "./Homepage";
import { FiMusic } from "react-icons/fi";
import Playsongs from "./Playsongs";
import Categories from "../pages/categories/Categories";
import Playlist from "../pages/playlist/Playlist";
import Favorites from "../pages/favorites/Favorites";
import Recents from "../pages/recents/Recents";
import { IoSearch } from "react-icons/io5";

import { Link, Links, NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "../pages/sidebar/Sidebar";

const MainDashboard = () => {


const navigate = useNavigate()

  

  return (
    <div className=" bg-black min-h-screen w-screen   flex flex-col ">
      <div className="flex ">
        {/* sidebar search */}

        <div className="px-3 py-9 w-20  md:w-60 lg:w-60 flex flex-col gap-7 h-screen border-2 border-r-slate-800   ">
          <div className="flex px-1">
            <div className="bg-white p-2 rounded-xl flex justify-center items-center ">
              <FiMusic color="black" size={23} />
            </div>

            <div className="pl-3">
              <h1 className="text-white text-2xl invisible sm:invisible md:visible">BeatFlow</h1>
            </div>
          </div>

          <div>
            <Sidebar/>
          </div>
        </div>

        {/* main content */}

        <div className="h-screen  grow  p-8 overflow-y-auto scroll-smooth pb-20 ">
          <Outlet />
        </div>
      </div>

      {/* music player */}
      <div className="   ">
        <Playsongs />
      </div>
    </div>
  );
};

export default MainDashboard;
