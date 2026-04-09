import React from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
const Favorites = () => {
  return (
    <div>
      <div className=" p-5">
        {/* headerportion */}

        <div>
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-red-500 to-pink-600 rounded-xl flex justify-center items-center">
              {" "}
              <MdFavorite className="text-white w-6 h-6 " />
            </div>

            <h1 className="text-4xl text-white">Favorites</h1>
          </div>
          <div>
            <p className="text-gray-400">4 songs you love</p>
          </div>
        </div>

        {/* button  */}
        <div className="pt-7">
          <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 flex items-center">
            <MdFavorite />
            <h3>Play All Favorites</h3>
          </button>
        </div>

        {/* favourites */}

        <div className="flex justify-around pt-7 flex-wrap gap-6">
          <div className="bg-[#0f172a] rounded-2xl w-60 h-64 p-4 flex flex-col items-center shadow-md hover:bg-gray-950">
            {/* IMAGE */}
            <div className="h-40 rounded-xl overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1507838153414-b4b713384a76"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full flex justify-between items-center px-1">
              <div>
                <h5 className="text-white text-sm font-semibold">Song Name</h5>
                <p className="text-gray-400 text-xs">Artist Name</p>
              </div>

              <button className="text-gray-400 hover:text-red-500 text-lg transition">
                ❤️
              </button>
            </div>
          </div>
        </div>

        <div className="  pt-7">
          <div className="flex gap-6">
            <div className="bg-gray-900 rounded-xl p-6 grow">
              <h3 className="text-gray-400 text-sm mb-2">Total songs</h3>
              <p className="text-3xl text-white">4</p>
            </div>

            <div className="bg-gray-900 rounded-xl p-6  grow">
              <h3 className="text-gray-400 text-sm mb-2">Top Genre</h3>
              <p className="text-3xl text-white">Electronic</p>
            </div>

            <div className="bg-gray-900 rounded-xl p-6  grow">
              <h3 className="text-gray-400 text-sm mb-2">Total Duration</h3>
              <p className="text-3xl text-white">14 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
