import React from 'react'
import { IoSearch } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { TbFileMusic, TbPlaylist } from "react-icons/tb";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = () => {
const navigato=useNavigate()


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
     icons: (
            <IoSearch size={23} className="text-slate-400 hover:text-white" />
          ),
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
        />)
          ,
    name: "Favorites",
    path: "/dashboard/favorites",
  },
  {
    icons: (
            <MdOutlineWatchLater
              size={23}
              className="text-slate-400 hover:text-white "
       />),
       
    name: "Recents",
    path: "/dashboard/recents",
  },
];
  return (
    <div className="">
  <ul>
    {sidebar.map((data, index) => {
      return (
        <Link
          to={data.path}
          key={index}
          className="   justify-center sm:justify-start items-center py-3 px-6 gap-4 sm:hover:bg-slate-800 md:hover:bg-slate-800 lg:hover:bg-slate-800 w-full rounded-md cursor-pointer  transition-all duration-300 "
        >
          <div className=''>{data.icons}</div>

          <p className="text-slate-400 hidden md:block">
            {data.name}
          </p>
        </Link>
      );
    })}
  </ul>
</div>
  )
}

export default Sidebar
