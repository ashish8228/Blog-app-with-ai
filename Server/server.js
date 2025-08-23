import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import ConnectDB from './Configs/db.js';
import adminRouter from './Routes/adminRoutes.js';
import blogRouter from './Routes/blogRoute.js';

const app = express();


await ConnectDB();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/',(req, res)=>{
    res.send("API is Working")
})

app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`server is runing at port number ${PORT} `)
})