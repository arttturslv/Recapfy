import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Introduction from './pages/Introduction.jsx'

import Home from "./pages/Home"
import BottomNavigation from "./components/BottomNavigation"
import AlbumView from "./pages/AlbumView"
import Profile from "./pages/Profile"
import FavArtists from "./pages/FavArtists"
import GenresView from "./pages/GenresView"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Introduction></Introduction>
  },
  {
    path: "/home",
    element: <Home></Home>
  },
  {
    path: "/me",
    element: <Profile></Profile>
  },
  {
    path: "/album",
    element: <AlbumView></AlbumView>
  },
  {
    path: "/artists",
    element: <FavArtists></FavArtists>
  },
  {
    path: "/genres",
    element: <GenresView></GenresView>
  },
  
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className=" bg-dark w-full h-[100vh] flex flex-col" >
    <RouterProvider router={router} />
      {/* <BottomNavigation></BottomNavigation> */}
    </div>
  </StrictMode>,
)
