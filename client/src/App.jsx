import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Blog from "./Pages/Blog"
import Layout from "./Pages/Admin/Layout"
import Dashboard from "./Pages/Admin/Dashboard"
import AddBlog from "./Pages/Admin/AddBlog"
import ListBlog from "./Pages/Admin/ListBlog"
import Comments from "./Pages/Admin/Comments"
import Login from "./Component/admin/Login"
import 'quill/dist/quill.snow.css';
import {Toaster} from "react-hot-toast"
import { useAppContext } from "./context/appContext.jsx"
function App() {

  const {token} = useAppContext()
  return (
   <div >
    <Toaster/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route path="/admin" element={true ? <Layout/> : <Login />}>
        <Route index element={<Dashboard/>}/>
        <Route path="AddBlog" element={<AddBlog/>}/>
        <Route path="listBlog" element={<ListBlog/>}/>
        <Route path="Comments" element={<Comments/>}/>
      </Route>
    </Routes>
   </div>
  )
}

export default App
