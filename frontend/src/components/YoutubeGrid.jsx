// Importing required package
import React from 'react'
import YouTubeCard from "@/components/YouTubeCard"
import { useEffect,useState } from "react"
import axios from "axios"

// intiaizing the component and using title coming from the props
const YoutubeGrid = ({title}) => {

    // assigning access token and youtube api url to variables for ease of use
    const API_KEY = 'AIzaSyAmtdjYXPWfMSZqITFls4svAgPKozwuGac';
    const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
    // intializing use state hooks
    const [videos,setVideos] = useState([])
    // splitting title coming from the props to use as keywords
    const keywords = title.split(" ")
    // Joining the keywords array into a string separated by commas
    const q = keywords.join(',');
    // Configuring the parameters for the API request
    const params = {
      part: 'snippet',
      maxResults: 10,
      q: q, // Search query parameter
      key: API_KEY
    };
    
     useEffect(()=>{
    // Sending a get request using axios to youtube api with the params intialized early
    axios.get(BASE_URL, { params })
      .then(response => {
        // Handling the successfull response and setting video data to states
        setVideos(response.data.items)
      })
      .catch(error => {
        // catching any errors and login them to the console
        console.error('Error fetching data: ', error);
      });
        },[])

  return (
    <div className="container mx-auto p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Displaying fetched articles */}
      {videos && videos.map((video) => (
        <YouTubeCard key={video.id.videoId} video={video} />
      ))}
    </div>
      {/* If there are no youtube vidoes showing that as well */}
      {videos && videos.length <= 0 && (
                <div className="home__error-container">
                  <h2 className="text-black text-xl font-bold">
                    No Youtube Videoes for this Article yet.. Please check again later...
                  </h2>
                </div>
              )}
  </div>
  )
}

// Exporting the component
export default YoutubeGrid