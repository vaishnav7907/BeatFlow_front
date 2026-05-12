import { useState } from "react";
import "./App.css";
import WelcomeInterface from "./components/authentication/WelcomeInterface";
import Signup from "./components/authentication/Signup";
import MainDashboard from "./components/dashboard/MainDashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./components/dashboard/Homepage";
import Categories from "./components/pages/categories/Categories";
import Playlist from "./components/pages/playlist/Playlist";
import Favorites from "./components/pages/favorites/Favorites";
import Recents from "./components/pages/recents/Recents";
import Playlistname from "./components/subpages/playlistcontent/Playlistname";
import PlaylistContent from "./components/subpages/playlistcontent/PlaylistContent";
import Weatherplaylist from "./components/subpages/Playlistforu/weatherplaylist/Weatherplaylist";
// import MusicPlayer from "./components/subpages/musicplayer/MusicPlayer";
import Playsongs from "./components/dashboard/Playsongs";
import { Playerprovider } from "./components/context/Playerprovider";
import RetroVibes from "./components/subpages/Playlistforu/RetroVibes/RetroVibes";
import PlaylistTou from "./components/subpages/Playlistforu/playlisttou/PlaylistTou";
import TopTracks from "./components/subpages/Playlistforu/TopTracks/TopTracks";
import TrendingSongs from "./components/subpages/Playlistforu/TrendingSongs/TrendingSongs";
import Artistpage from "./components/subpages/artistpage/Artistpage";
import MusicPlayer from "./components/subpages/musicplayer/MusicPlayer";

function App() {
  const [islogin, setIslogin] = useState(!!localStorage.getItem("token"));

  return (
    <div className="h-screen w-screen">
      <Playerprovider>
        <BrowserRouter>
          <Routes>
            {/* HOME */}
            <Route
              path="/"
              element={
                !islogin ? <WelcomeInterface /> : <Navigate to="/dashboard" />
              }
            />
            {/* AUTH */}
            <Route
              path="/authentication"
              element={<Signup setIslogin={setIslogin} />}
            />
            {/* DASHBOARD */}
            ////
            <Route
              path="/dashboard"
              element={islogin ? <MainDashboard /> : <Navigate to="/" />}
            >
              <Route index element={<Homepage />} />
              <Route path="homepage" element={<Homepage />} />
              <Route path="categories" element={<Categories />} />
              <Route path="playlist" element={<Playlist />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="recents" element={<Recents />} />
              {/* <Route  path="urplaylist" element={<PlaylistContent/>} /> */}
            </Route>
            ////
            <Route path="/playlistname" element={<Playlistname />} />
            <Route path="/urplaylist" element={<PlaylistContent />} />
            ////
            <Route path="/playlistforu" element={<PlaylistTou />}>
              <Route index element={<Weatherplaylist />} />
              <Route path="retro" element={<RetroVibes />} />
              <Route path="toptracks" element={<TopTracks />} />
              <Route path="trending" element={<TrendingSongs />} />
            </Route>
            ////
            <Route path="/musicplayer" element={<MusicPlayer />} />
            <Route path="/playsong" element={<Playsongs />} />
            <Route path="/artistpage" element={<Artistpage />} />
          </Routes>
        </BrowserRouter>
      </Playerprovider>
    </div>
  );
}

export default App;
