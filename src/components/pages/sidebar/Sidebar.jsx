import React from "react";
import { IoSearch } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { TbFileMusic, TbPlaylist } from "react-icons/tb";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigato = useNavigate();

  // const sidebar = [
  //     {
  //       icons: <GoHome size={23} className="text-slate-400 hover:text-white" />,
  //       name: "Home",
  //       path: "homepage",
  //     },

  //     {
  //       icons: (
  //         <IoSearch size={23} className="text-slate-400 hover:text-white" />
  //       ),
  //       name: "Search",
  //       path: "categories",
  //     },

  //     {
  //       icons: (
  //         <TbPlaylist size={23} className="text-slate-400 hover:text-white" />
  //       ),
  //       name: "Playlist",
  //       path: "playlist",
  //     },

  //     {
  // icons: (
  //   <MdFavoriteBorder
  //     size={23}
  //     className="text-slate-400 hover:text-white"
  //   />
  // ),
  //       name: "Favorites",
  //       path: "favorites",
  //     },

  //     {
  //       icons: (
  //         <MdOutlineWatchLater
  //           size={23}
  //           className="text-slate-400 hover:text-white "
  //         />
  //       ),
  //       name: "Recents",
  //       path: "recents",
  //     },
  //   ];
  const sidebar = [
    {
      icons: <GoHome size={23} className="text-slate-400 hover:text-white" />,
      name: "Home",
      path: "/dashboard/homepage",
    },
    {
      icons: <IoSearch size={23} className="text-slate-400 hover:text-white" />,
      name: "Search",
      path: "/dashboard/categories",
    },
    {
      icons: (
        <TbPlaylist size={23} className="text-slate-400 hover:text-white" />
      ),
      name: "Playlist",
      path: "/dashboard/playlist",
    },
    {
      icons: (
        <MdFavoriteBorder
          size={23}
          className="text-slate-400 hover:text-white"
        />
      ),
      name: "Favorites",
      path: "/dashboard/favorites",
    },
    {
      icons: (
        <MdOutlineWatchLater
          size={23}
          className="text-slate-400 hover:text-white "
        />
      ),

      name: "Recents",
      path: "/dashboard/recents",
    },
  ];
  return (
    <div className="">
      <ul className="flex flex-col gap-2">
        {sidebar.map((data, index) => (
          <li key={index}>
            <Link
              to={data.path}
              className="flex items-center gap-4 py-3 px-4 rounded-md hover:bg-slate-800 transition-all"
            >
              {data.icons}

              <p className="hidden md:block text-slate-400">{data.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
