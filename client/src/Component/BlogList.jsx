import { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets.js'
import { motion } from "motion/react"
import BlogCard from './BlogCard'

const BlogList = () => {

    const [menu, setmenu] = useState("All")
    return (
        <div>
            <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
                {blogCategories.map((items) => (
                    <div key={items} className='relative'>
                        <button onClick={() => setmenu(items)}
                            className={`cursor-pointer text-gray-500 ${menu === items && 'text-white px-4 pt-0.5'}`}>
                            {items}
                            {menu === items && (
                                <motion.div layoutId='underline'
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'></motion.div>
                            )}
                        </button>
                    </div>
                )
                )}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
                {blog_data.filter((blog) => menu === 'All' ? true : blog.category === menu).map((blog) => {
                    return <BlogCard key={blog._id} blog={blog} />
                })}
            </div>
        </div>
    )
}

export default BlogList;