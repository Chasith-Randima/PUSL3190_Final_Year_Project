// "use client"
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const FacebookPosts = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//     //   const accessToken = '8029b565a1615aa604967da753c5f07b'; // Obtain this via OAuth flow
//       const accessToken = 'EAAKIGKAaGvQBO7h3NxWPtv2yZAFxZCxl4hgyHxjVETOUwOYMC6chmeUVbJYbkg49RZCp5oP51f0KtdiDX7TCiXRATP9hVlaLL8X9WecKskyt56F5fFkBhlDmnhRxoT3s204jVrUXmn4CNFSXuZBIgHPEn2mXh2mDwlT505SdZAt3OuiZCJ6PsbtR01097vJAHo9BrpnhIxJ3mSC5S0iWScdT3ZCp6YZD'; // Obtain this via OAuth flow
//       const keyword = 'Sri Lanka';
//       const fields = 'message,created_time,id'; // The fields you want to fetch
//       const limit = 10; // Number of posts to fetch

//       try {
//         const response = await axios.get(`https://graph.facebook.com/v13.0/search?type=post&q=${keyword}&fields=${fields}&access_token=${accessToken}&limit=${limit}`);
//         setPosts(response.data.data);
//       } catch (error) {
//         console.error('Error fetching Facebook posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <p>{post.message}</p>
//           <p>{post.created_time}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FacebookPosts;






"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const page = () => {
  const [tweets, setTweets] = useState([]);
  const keyword = 'ReactJS'; // Your search keyword

  useEffect(() => {
    const fetchTweets = async () => {
      const endpointUrl = `https://api.twitter.com/2/tweets/search/recent?query=${keyword}`;
      const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAKJeswEAAAAAWk%2BbDq6%2BcLCsn3iHTHZEX1FJBKE%3DTLyEIHYSlKLLoLqi4OU5IbPpjX60qoSxeebdzgLEGad5Gt0qyD'; // Ideally, use an environment variable and keep it secret

      try {
        const response = await axios.get(endpointUrl, {
          headers: {
            "Authorization": `Bearer ${bearerToken}`,
            "Content-Type": "application/json"
          }
        });
        setTweets(response.data.data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div>
      {tweets.map((tweet, index) => (
        <div key={index}>
          <p>{tweet.text}</p>
        </div>
      ))}
    </div>
  );
};

export default page;
