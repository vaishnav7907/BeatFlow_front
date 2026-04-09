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
    <div >
      <ul>
            {sidebar.map((data, index) => {
              return (
                <Link
                  to={data.path}
                  key={index}className="px-4 py-3 flex gap-1.5 hover:bg-slate-800 w-55   rounded-md   cursor-pointer     " >

                    
                  <div>{data.icons}</div>
                  
                  <p className="text-slate-400 hover:text-white  invisible sm:invisible md:visible">
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
