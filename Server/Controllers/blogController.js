

export const addBlog = async (req , res)=>{
    try{
        const {title, subtitle, description, category, image, ispublished} = JSON.parse(req.body.blog)

        const imageFile = req.file;


        // check if all files are present
        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "missing required fields"})
        }
    }
    catch(err){
        
    }
}