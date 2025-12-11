// save or update user
import  axios  from 'axios';

export const saveOrUpdateUser = async(userData)=>{
  const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/user`, userData)
  return data;
}


// Image Upload to imgbb
   
export const imageUpload = async imageData =>{
       const formData = new FormData();
       formData.append("image", imageData); 
       const {data} = await axios.post(`${import.meta.env.VITE_url}`, formData);
       return data?.data?.display_url;
      } 