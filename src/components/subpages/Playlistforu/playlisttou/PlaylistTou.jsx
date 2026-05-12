import React from "react";
import Playlistsidebar from "../../../pages/sidebar/Playlistsidebar";
import Weatherplaylist from "../weatherplaylist/Weatherplaylist";
import RetroVibes from "../RetroVibes/RetroVibes";
import { Outlet } from "react-router-dom";

const PlaylistTou = () => {
  return (
    <div className="fixed w-full h-screen ">
      <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#111827] to-black text-white px-6 py-8 flex ">
        <div className="border-r border-white/10 pr-4 overflow-hidden">
          <Playlistsidebar />
        </div>

        <div className="w-full h-screen overflow-auto">
          {/* <Weatherplaylist />
          <RetroVibes/> */}
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default PlaylistTou;
