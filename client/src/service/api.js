import axios from "axios"
const URL="http://localhost:8003"
//const URL="https://collegeconnect1.onrender.com"
//const URL="https://college-connect.azurewebsites.net"
export const addUser=async (data)=>{
    try{
        return await axios.post(`${URL}/register`,data)

    }catch(error){
        console.log("Error add",error.response.data)
        return error
    }
}


export const addUser3=async (data)=>{
    try{
        return await axios.post(`${URL}/register1`,data)

    }catch(error){
        console.log("Error add",error.response.data)
        return error
    }
}


export const addUser2=async (data)=>{
    try{
        return await axios.post(`${URL}/cOtp`,data)

    }catch(error){
        console.log("Error add",error.response.data)
        return error
    }
}

export const posts=async (data)=>{
    try{
        return await axios.post(`${URL}/post`,data)

    }catch(error){
        console.log("Error add",error)
    }
}





export const getUsers=async ()=>{
    try{
    return await axios.get(`${URL}/fetchUsers`)

}catch(error){
    console.log("Error Get",error)
}
}

export const getPosts=async ()=>{
    try{
    return await axios.get(`${URL}/fetchPosts`)

}catch(error){
    console.log("Error Get",error)
}
}


export const addMessage=async (data)=>{
    try{
        return await axios.post(`${URL}/message`,data)

    }catch(error){
        console.log("Error add",error)
        console.log(data)
        return error
    }
}
export const getMessages=async (data)=>{
    console.log("message get requyues")
    try{
        return await axios.post(`${URL}/fetchMessage`,data)

    }catch(error){
        console.log("Error add",error)
        return(error)
    }
}
export const isUser=async (data)=>{
    try{
        return await axios.post(`${URL}/isUser`,data)

    }catch(error){
        console.log("Error message",error)
        return(error)
    }
}
export const searchUser=async (data)=>{
    try{
        return await axios.post(`${URL}/search`,data)

    }catch(error){
        console.log("Error add",error.response.data)
        return error
    }
}
export const addComment=async (data)=>{
    try{
        return await axios.patch(`${URL}/updateComment`,data)

    }catch(error){
        console.log("Error add",error.response.data)
        return error
    }
}
export const addLike=async (data)=>{
    try{
        return await axios.patch(`${URL}/updateLikes`,data)

    }catch(error){
        console.log("Error add",error.response.data)
        return error
    }
}
export const isLiked=async (data)=>{
    try{
        return await axios.post(`${URL}/likeStatus`,data)

    }catch(error){
        console.log("Error message",error)
        return(error)
    }
}
export const searchPost=async (data)=>{
    try{
        return await axios.post(`${URL}/searchPost`,data)

    }catch(error){
        console.log("Error add",error.response.data)
        return error
    }
}


export const seePost=async (data)=>{
    try{
        return await axios.post(`${URL}/seePost`,data)

    }catch(error){
        console.log("Error add",error.response.data)
        return error
    }
}


export const getProfilePosts=async (data)=>{
    console.log("Raman get")
    try{
    return await axios.post(`${URL}/fetchProfilePosts`,data)

}catch(error){
    console.log("Error Get",error)
}
}