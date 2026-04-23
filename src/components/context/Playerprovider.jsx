import { createContext, useContext, useState } from "react";

const PlayerContext = createContext()

export const Playerprovider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [songlist, setSonglist] = useState([]);
  const [currentindex, setCurrentindex] = useState(0);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        songlist,
        setSonglist,
        currentindex,
        setCurrentindex,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const useplayer = () => useContext(PlayerContext)
