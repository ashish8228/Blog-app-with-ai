import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from "../../assets/assets"
import Quill from 'quill';
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';

const AddBlog = () => {

  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)
  const [image, setimage] = useState(false)
  const [title, setitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [category, setcategory] = useState("Starup")
  const [isPublished, setIspublished] = useState(false)

  const GenerateContent = async (e) => {

  }
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true)

      const blog = {
        title, subtitle, description: quillRef.current.root.innerHTML,
        category,
        ispublished: isPublished
      }

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const { data } = await axios.post('/api/blog/add', formData);

      if (data.success) {
        toast.success(data.message)
        setimage(false)
        setitle('')
        quillRef.current.root.innerHTML = ''
        setcategory('Startup')
        window.location.reload();
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
    finally{
      setIsAdding(false)
    }

  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll '>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
          <input onChange={(e) => setimage(e.target.files[0])} type="file" id='image' hidden required />
        </label>

        <p className='mt-4'>Blog title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setitle(e.target.value)} />

        <p className='mt-4'>Sub title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setSubtitle(e.target.value)} />

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef} ></div>
          <button type='button' onClick={GenerateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button>
        </div>

        <p className='mt-4'>Blog Category</p>
        <select onChange={e => setcategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border0gray-300 outline-none rounded'>
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })}

        </select>

        <div className='mt-4 flex gap-2 '>
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e => setIspublished(e.target.checked)} />
        </div>

        <button disabled={isAdding} className=' mt-8 w-40 h-10 cursor-pointer border bg-primary text-white rounded text-sm' type='submit'>
          {isAdding ? "Adding..." : "Add Blog"}
        </button>


      </div>

    </form>
  )
}

export default AddBlog