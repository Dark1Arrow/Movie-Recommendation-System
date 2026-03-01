import Header from "../pages/Movies/Header.jsx"
import MoviesContainerPage from "../pages/Movies/MoviesContainerPage.jsx"

const Home = () => {
  return (
    <>
      <Header/>
      <section className="mt-[10rem]">
        <MoviesContainerPage/>
      </section>
    </>
  )
}

export default Home
