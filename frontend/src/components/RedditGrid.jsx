// importing required packages
import { useEffect,useState } from "react"
import axios from "axios"
import PostCard from "@/components/PostCard"

// intializing component
const RedditGrid = ({title}) => {
  // storing reddit api url to a variable
    const BASE_URL = 'https://www.reddit.com/search.json';

    // intializing required use state hooks
    const [keywords,setKeywords] = useState([])
    const [extractKeyword,setExtractKeyword] = useState([])
    const [posts,setPosts] = useState([])

    // a function to take title as payload and extract keywords 
      async function query(data) {
        // sending request to hosted keyword extracting api to extract keywords from the title
        const response = await fetch(
          "https://api-inference.huggingface.co/models/yanekyuk/bert-keyword-extractor",
          {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
          }
        );
        // saving the result to a varialbe
        const result = await response.json();
        let extractedKeywords = [];

        // checking if there are any extracted key words
        if (result.length > 0) {
          // if there are keywords using first 2 which has most relevant to the title and storing them in use states
          extractedKeywords = result.slice(0,2).map(item => item.word);
          setKeywords(extractedKeywords);
          setExtractKeyword(extractedKeywords)
          // if there are no extracted keywords using default keywords as "Reddit"
        }else if(!result){
          setKeywords(["Reddit","news"]);
          setExtractKeyword(["reddit","news"])
        } else {
          setKeywords(["Reddit","news"]);
          setExtractKeyword(["reddit","news"])
        }
        // preprocessing keywords to send as parameters
        const q = extractedKeywords.join(',');
        const params = {
            q: q
          };
          // if there are extractedKywords
          if(extractedKeywords.length > 0){
            // Send the GET request using Axios to reddit api to fetch data
            axios.get(BASE_URL, { params })
              .then(response => {
                // Handling the response and storing the reddit posts
                setPosts(response.data.data.children)
              })
              .catch(error => {
                // if there were any catched error login them to the console
                console.error('Error fetching data: ', error);
              });
          }
        // finally returning results
        return result;
      }

    // calling the keyword extraction function when page reloads every time
    useEffect(()=>{
      query({"inputs": title})
    },[])

  return (
    <div className="container mx-auto p-x">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Displaying the fetched related reddit posts */}
    {posts && posts.map((post) => (
      <PostCard key={post.data.id} post={post} />
    ))}
  </div>
  {/* If there are no reddit posts showing that as well */}
    {posts && posts.length <= 0 && (
                <div className="home__error-container">
                  <h2 className="text-black text-xl font-bold">
                    No Reddit Posts for this Article yet.. Please check again later...
                  </h2>
                </div>
              )}
    </div>
  )
}

// exporting the component
export default RedditGrid