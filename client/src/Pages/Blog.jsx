import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Component/Navbar"
import { assets, blog_data, comments_data } from "../assets/assets"
import moment from "moment"
import Footer from "../Component/Footer"
import Loader from "../Component/Loader"
import { useAppContext } from "../context/appContext"
import toast from "react-hot-toast"
const Blog = () => {

  const { id } = useParams()

  const { axios } = useAppContext()

  const [data, setdata] = useState(null)
  const [comments, setcomments] = useState([])
  const [name, setname] = useState("")
  const [inputcomment, setinputcomment] = useState("")

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      data.success ? setdata(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }


  const fetchComment = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id })

      if (data.success) {
        setcomments(data.comments)
      } else {
        toast.error(data.message)

      }
    } catch (error) {
      toast.error(error.message)

    }
  }

  const addComment = async (e) => {
    e.preventdefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', { blogId: id ,name, content });
      if (data.success) {
        toast.success(data.message)
        setname('')
        setcontent('')
      } else {
      toast.error(data.message)    
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchBlogData()
    fetchComment()
  }, [])
  return data ? (
    <div className="relative">
      <img src={assets.gradientBackground} alt="" className="absolute -top-50 -z-1 opacity-50" />

      <Navbar />

      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">Published on {moment(data.createdAt).format('LL')} </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">{data.title}</h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">Author name</p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6 ">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />

        <div className="rich-text max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: data.description }}></div>

        {/* Comments */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="mb-4 font-semibold">Comments {comments.length}</p>
          <div className="flex flex-col gap-4">
            {comments.map((items, index) => (
              <div key={index} className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{items.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{items.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">{moment(items.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>


        {/* Add comment section */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form onSubmit={addComment} className="flex flex-col items-start gap-4 max-w-lg">
            <input type="text" placeholder="Name" required className="w-full p-2 border border-gray-300 rounded outline-none" onChange={(e) => setname(e.target.value)} value={name} />

            <textarea className="w-full p-2 border border-gray-300 rounded outline-none h-48" placeholder="comment" required onChange={(e) => setinputcomment(e.target.value)} value={inputcomment}></textarea>
            {console.log(inputcomment)}
            <button className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor pointer" type="sumbit">Submit</button>
          </form>
        </div>

        {/* Share button */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">Share this artical on social media</p>
          <div className="flex">
            <img src={assets.facebook_icon} alt="" width={50} />
            <img src={assets.twitter_icon} alt="" width={50} />
            <img src={assets.googleplus_icon} alt="" width={50} />
          </div>
        </div>
      </div>

      {/* Footer section */}
      <Footer />
    </div>
  ) : <Loader />
}

export default Blog;