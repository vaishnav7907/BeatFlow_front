import React from 'react'
import { IoSearch } from "react-icons/io5";
const Categories = () => {
  return (
    <div >
      <div>
        <div className="flex flex-col gap-7">
        <div>
          <h1 className="text-4xl text-white mb-2">Discover Music</h1>

          <p className="text-gray-400">Find your next favorite track</p>
        </div>

        {/* search bar */}
        <div className=" flex justify-start items-center relative ">
          <input
            type="text"
            className=" w-full bg-gray-900  border-gray-800 rounded-xl px-12 py-4 text-white  "
            placeholder="Search for songs or artists..."
          />
          <IoSearch className="text-gray-400 absolute mr-2 w-10" size={21} />
        </div>

        {/* categoriesname */}
        <div className="flex gap-3">
          <button className=" bg-gray-900 px-6 py-2 rounded-full hover:bg-gray-500">
            <p>All</p>
          </button>
          <button className=" bg-gray-900 px-6 py-2 rounded-full hover:bg-gray-500">
            <p>Tamil</p>
          </button>
          <button className=" bg-gray-900 px-6 py-2 rounded-full hover:bg-gray-500">
            <p>Malayalam</p>
          </button>
          <button className=" bg-gray-900 px-6 py-2 rounded-full hover:bg-gray-500">
            {" "}
            <p>Hindi</p>
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Categories
