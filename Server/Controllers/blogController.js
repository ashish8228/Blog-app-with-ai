import fs from 'fs'
import imagekit from '../Configs/imageKit.js';
import Blog from "../Models/Blog.js"


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

export const getAllBlogs = async (req, res) =>{
        try {
            const blogs =  await Blog.find({ispublished : true})
            res.json({success:true, blogs})
        } catch (error) {
            res.json({success:true, message: error.message})
        }
    }