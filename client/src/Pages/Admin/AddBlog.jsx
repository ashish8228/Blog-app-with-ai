import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from "../../assets/assets"
import Quill from 'quill';

const AddBlog = () => {

  const editorRef = useRef(null)
  const quillRef = useRef(null)
  const [image, setimage] = useState(false)
  const [title, setitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [category, setcategory] = useState("Starup")
  const [isPUblished, setIspublished] = useState(false)

  const GenerateContent = async (e) => {

  }
  const onSubmitHandler = async (e) => {
    e.preventDefault()
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
          {blogCategories.map((item, index)=>{
            return <option key={index} value={item}>{item}</option>
          })}

        </select>

        <div className='mt-4 flex gap-2 '>
          <p>Publish Now</p>
          <input type="checkbox" checked={isPUblished} className='scale-125 cursor-pointer' onChange={e =>setIspublished(e.target.checked)}/>
        </div>

        <button className=' mt-8 w-40 h-10 cursor-pointer border bg-primary text-white rounded text-sm' type='submit'>Add Blog</button>


      </div>

    </form>
  )
}

export default AddBlog