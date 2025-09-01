import fs from 'fs'
import imagekit from '../Configs/imageKit.js';
import Blog from "../Models/Blog.js"
import Comment from '../Models/Comment.js';
import main from '../Configs/gemini.js';


export const addBlog = async (req, res) => {
    try {
        const { title, subtitle, description, category, ispublished } = JSON.parse(req.body.blog)

        const imageFile = req.file;


        // check if all files are present
        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: "missing required fields" })
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        // upload image on imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        // optimize with the help of imageKit URL transformation

        const optimizeImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: "auto" }, //Auto compression
                { format: "webp" }, // change image format to webp
                { width: "1280" } //width will bw 1280px
            ]
        })


        const image = optimizeImageUrl;

        await Blog.create({
            title, subtitle, description, category, image, ispublished
        })
        res.json({ success: true, message: "Blog added successfully" })
    }
    catch (err) {
        res.json({ success: false, message: err.message })
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ ispublished: true })
        res.json({ success: true, blogs })
    } catch (error) {
        res.json({ success: true, message: error.message })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" })
        }
        res.json({ success: true, blog })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const deleteBlogbyId = async (req, res) => {
    try {
        const { Id } = req.body;
        await Blog.findByIdAndDelete(Id);


        // delete all dcomments associated with this blog
        await Comment.deleteMany({ blog: Id })

        res.json({ success: true, message: "Blog deleted ✔ " })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { Id } = req.body;
        const blog = await Blog.findById(Id)
        blog.ispublished = !blog.ispublished;
        await blog.save();
        res.json({ success: true, message: 'Blog status updated' })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({ blog, name, content });
        res.json({ success: true, message: "comment added for review 👍" })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

export const getBlogComment = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        const content = await main(prompt + ' Generate a blog content for this topic in simple text format')
        res.json({ success: true, content })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}