import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
const appcontext = createContext()

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()

    const [token, setToken] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState("")


    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message)

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchBlogs();
        const token = localStorage.getItem('token')
        if(token){
            setToken(token)
            axios.get.headers.common["Authorization"] = `${token}`
        }
    },[])

    const value = {
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput
    }
    return (

        <appcontext.Provider value={value}>
            {children}
        </appcontext.Provider>
    )
}
export const useAppContext = () => {
    return useContext(appcontext)
}