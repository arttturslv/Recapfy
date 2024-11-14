import Home from "./pages/Home"
import BottomNavigation from "./components/BottomNavigation"
import AlbumView from "./pages/AlbumView"
import Profile from "./pages/Profile"
import FavArtists from "./pages/FavArtists"
import GenresView from "./pages/GenresView"

function App() {
  return (
    <div className=" bg-dark w-full h-[100vh] flex flex-col" >
      <GenresView></GenresView>
      <BottomNavigation></BottomNavigation>
    </div>
  )
}

export default App
