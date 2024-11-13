import Home from "./pages/Home"
import BottomNavigation from "./components/BottomNavigation"
import AlbumView from "./pages/AlbumView"

function App() {
  return (
    <div className=" bg-dark w-full h-[100vh] flex flex-col" >
      <AlbumView 
        Title="LET THERE BE ROCK"
        SubTitle="AC/DC"
        ImageSource="https://i.scdn.co/image/ab67616d0000b273a948a3a9d736b84fa2e2deab" 
        OuvintesQNT={166516}></AlbumView>
      <BottomNavigation></BottomNavigation>
    </div>
  )
}

export default App
