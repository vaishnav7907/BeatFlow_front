import React, { useState } from "react";
import { FaMusic, FaFire, FaCompactDisc } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Playlistsidebar = () => {

const navigation = useNavigate()

  const [active, setActive] = useState(0);

  const playlistsidebaritems = [
    {
      name: "Retro Vibes",
      icon: <FaCompactDisc />,
    },
    {
      name: "Top Tracks",
      icon: <FaMusic />,
    },
    {
      name: "Trending",
      icon: <FaFire />,
    },
  ];

return (
  <div className="flex flex-col h-full overflow-hidden">

    {/* Arrow */}
    <div className="mb-6 px-4" onClick={()=>{navigation("/dashboard/homepage")}}>
      <FaArrowLeftLong size={40}  />
    </div>

    {/* Center Items */}
    <div className="flex flex-col flex-1 justify-center   bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
      {playlistsidebaritems.map((items, index) => (
        <div key={index} className="flex justify-center items-center">
          <div className="flex gap-3 items-center px-5 py-3 hover:bg-slate-800 w-60 rounded-md cursor-pointer">
            <span>{items.icon}</span>
            <span className="text-lg">{items.name}</span>
          </div>
        </div>
      ))}
    </div>

  </div>
);
};

export default Playlistsidebar;