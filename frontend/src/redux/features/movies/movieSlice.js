import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        moviesFilter: {
            searchTerm: "",
            slectedGenre: "",
            selectedYear: "",
            selectedSort: [],
        },
        filterdMovies: [],
        movieYears: [],
        uniqueYear: []
    },
    reducers: {
        setMoviesFilter: (state, action) => {
            state.moviesFilter = { ...state.moviesFilter, ...action.payload }
        },
        setFilterdMovie: (state, action) => {
            state.filterdMovies = action.payload
        },
        setMoviesYears: (state, action) => {
            state.movieYears = action.payload
        },
        setUniqueYears: (state, action) => {
            state.uniqueYear = action.payload
        }
    }
})

export const { setFilterdMovie, setMoviesFilter, setMoviesYears, setUniqueYears } = movieSlice.actions
export default movieSlice.reducer