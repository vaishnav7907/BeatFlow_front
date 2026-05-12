import React, { useState } from "react";
import { FaMusic, FaFire, FaCompactDisc } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { SiAccuweather } from "react-icons/si";
const Playlistsidebar = () => {
  const navigation = useNavigate();

  const [active, setActive] = useState(0);

  const playlistsidebaritems = [
    {
      name: "Weather",
      icon: <SiAccuweather />,
      path: "/playlistforu",
    },

    {
      name: "Retro",
      icon: <FaCompactDisc />,
      path: "/playlistforu/retro",
    },

    {
      name: "TopTracks",
      icon: <FaMusic />,
      path: "/playlistforu/toptracks",
    },

    {
      name: "Trending",
      icon: <FaFire />,
      path: "/playlistforu/trending",
    },
  ];

  return (
    <div className=" ">
      <div
        className=" flex items-center justify-center"
        onClick={() => {
          navigation("/dashboard/homepage");
        }}
      >
        <div className="  ">
          <FaArrowLeftLong size={30} />
        </div>
      </div>

      <div className=" mt-10 flex flex-col justify-start   ">
        
        {playlistsidebaritems.map((items, index) => (
          <Link
            to={items.path}
            key={index}
            onClick={() => setActive(index)}
            className="  gap-4 "
          >
            <div className=" py-4 sm:px-4 md:px-4 lg:px-4 gap-4 flex rounded-md justify-start items-center hover:bg-transparent sm:hover:bg-slate-800 md:hover:bg-slate-800 lg:hover:bg-gray-800 hover:text-black mt-3">
               <div className="">{items.icon}</div>

              <span className=" hidden sm:block md:block lg:block ">{items.name}</span>
            </div>
             
           
          </Link>
        ))}
       
      </div>
    </div>
  );
};

export default Playlistsidebar;
