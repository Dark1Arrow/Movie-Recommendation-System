import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./App.css"

import Home from "./component/Home.jsx"
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import App from './App.jsx'
import PrivateRoute from './pages/Auth/PrivateRoute.jsx'
import Profile from './pages/User/profile.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import GenreList from './pages/Admin/GenreList.jsx'

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CreateMovie from './pages/Admin/CreateMovie.jsx'
import AdminMovieList from './pages/Admin/AdminMovieList.jsx'
import UpdateMovie from './pages/Admin/UpdateMovie.jsx'
import AllMovies from './pages/Movies/AllMovies.jsx'
import MoviesDetails from './pages/Movies/MoviesDetails.jsx'
import AllComment from './pages/Admin/AllComment.jsx'
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/movies",
        element: <AllMovies />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "movies/:id",
        element: <MoviesDetails />
      },
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />
          }
        ]
      },
      {
        path: "",
        element: <AdminRoute />,
        children: [
          {
            path: "admin/movie/genre",
            element: <GenreList />
          },
          {
            path: "admin/movie/create",
            element: <CreateMovie />
          },
          {
            path: "admin/movies-list",
            element: <AdminMovieList />
          },
          {
            path: "admin/movies/update/:id",
            element: <UpdateMovie />
          },
          {
            path: "admin/movies/comment",
            element: <AllComment />
          },
          {
            path: "admin/movie/dashboard",
            element: <AdminDashboard />
          },
        ]
      }]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer autoClose={3000} />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
