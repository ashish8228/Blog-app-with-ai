import BlogList from "../Component/BlogList"
import Footer from "../Component/Footer"
import Header from "../Component/Header"
import Navbar from "../Component/Navbar"
import Newsletter from "../Component/Newsletter"


const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header />
      <BlogList />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home