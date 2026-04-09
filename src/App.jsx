import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WelcomeInterface from "./components/authentication/WelcomeInterface";
import "react-icons";
import Signup from "./components/authentication/Signup";
import MainDashboard from "./components/dashboard/MainDashboard";
import "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./components/dashboard/Homepage";
import Categories from "./components/pages/categories/Categories";
import Playlist from "./components/pages/playlist/Playlist";
import Favorites from "./components/pages/favorites/Favorites";
import Recents from "./components/pages/recents/Recents";
import Weatherplaylist from "./components/subpages/weatherplaylist/Weatherplaylist";
import PlaylistContent from "./components/subpages/playlistcontent/PlaylistContent";
import MusicPlayer from "./components/subpages/musicplayer/MusicPlayer";
import Playlistname from "./components/subpages/playlistcontent/Playlistname";

function App() {
  const [islogin, setIslogin] = useState(false);

  return (
    <div className="h-screen w-screen">
      {/* <WelcomeInterface/> */}
      {/* <Signup/> */}

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !islogin ? (
                <WelcomeInterface mera={setIslogin} />
              ) : (
                <Navigate to={"/dashboard"} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={islogin ? <MainDashboard /> : <Navigate to={"/"} />}
          >
            <Route index element={<Homepage />} />
            <Route path="homepage" element={<Homepage />} />
            <Route path="categories" element={<Categories />} />
            <Route path="playlist" element={<Playlist />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="recents" element={<Recents />} />
            
          </Route>

          {/* <Route  element={<MainDashboard/>}>

         
          </Route> */}

          <Route path="/playlistforu" element={<Weatherplaylist />} />

          <Route path="/urplaylist" element={<PlaylistContent/>}/>
          <Route path="/musicplayer" element={<MusicPlayer/>}/>
          <Route path="/playlistname" element={<Playlistname/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
