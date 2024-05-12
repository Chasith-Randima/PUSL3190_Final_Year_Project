"use client"

import { useEffect,useState } from "react"
import axios from "axios"
import PostCard from "@/components/PostCard"
const page = () => {

    const BASE_URL = 'https://www.reddit.com/search.json';
    const keywords = ["Princess","of","Wales","has","cancer"];

    const q = keywords.join(',');
    const [posts,setPosts] = useState([])
    const params = {
        q: q
      };
      
    useEffect(()=>{
        console.log("running")
// Send the GET request using Axios
axios.get(BASE_URL, { params })
  .then(response => {
    setPosts(response.data.data.children)
    // Handle the successful response here
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors here
    console.error('Error fetching data: ', error);
  });
    },[])
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts && posts.map((post) => (
        <PostCard key={post.data.id} post={post} />
      ))}
    </div>
  </div>
  )
}

export default page