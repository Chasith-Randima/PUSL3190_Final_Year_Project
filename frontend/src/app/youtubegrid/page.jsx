"use client"
import YouTubeCard from "@/components/YouTubeCard"
import { useEffect,useState } from "react"
import axios from "axios"

const page = () => {
    const API_KEY = 'AIzaSyAmtdjYXPWfMSZqITFls4svAgPKozwuGac'; // Replace with your API key
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
    const [videos,setVideos] = useState([])

    // Keywords or titles you want to search for
const keywords = ["React.js","Youtube","Data","API","V3","Video","Search","Example","Using","Axios","Full","Tutorial","For","Beginners","2020"];

// Join the keywords array into a string separated by commas
const q = keywords.join(',');

// Configure the parameters for the API request
const params = {
  part: 'snippet',
  maxResults: 9,
  q: q, // Search query parameter
  key: API_KEY
};


    useEffect(()=>{
        console.log("running")
// Send the GET request using Axios
axios.get(BASE_URL, { params })
  .then(response => {
    setVideos(response.data.items)
    // Handle the successful response here
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors here
    console.error('Error fetching data: ', error);
  });
    },[])
  return (
    <div className="container mx-auto p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos && videos.map((video) => (
        <YouTubeCard key={video.id.videoId} video={video} />
      ))}
    </div>
  </div>

  )
}

export default page