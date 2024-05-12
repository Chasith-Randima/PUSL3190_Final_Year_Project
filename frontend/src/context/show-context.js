"use client";
import { createContext, useEffect, useState } from "react";
// import io from "socket.io-client";
// import { PRODUCTS } from "../products";

export const NewsContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < 10 + 1; i++) {
    cart[i] = 0;
  }
  console.log(cart);
  return cart;
};

export const NewsContextProvider = (props) => {
  const [newsArticles, setNewsArticles] = useState({});
  // const [userCount, setUserCount] = useState({});
  let socket;

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      setNewsArticles(JSON.parse(localStorage.getItem("newsArticles")) || {});
    }
  }, []);

  //   const getTotalCartAmount = () => {
  //     let totalAmount = 0;
  //     for (const item in newsArticles) {
  //       if (newsArticles[item] > 0) {
  //         let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
  //         totalAmount += newsArticles[item] * itemInfo.price;
  //       }
  //     }
  //     return totalAmount;
  //   };

  const updateNewsArticles = (newNewsArticles) => {
    console.log(newNewsArticles, "----------------------- New Cart Items");
    localStorage.setItem("newsArticles", JSON.stringify(newNewsArticles));
    console.log(
      JSON.parse(localStorage.getItem("newsArticles")),
      "----------------------- New Cart Items"
    );
  };

  const getTotalNewsAmount = () => {
    let totalAmount = 0;

    for (const itemid in newsArticles) {
      if (newsArticles.hasOwnProperty(itemid)) {
        const item = newsArticles[itemid];
        totalAmount += item.articlepublisher * item.count;
      }
    }

    return totalAmount;
  };

  //   const addToCart = (itemId) => {
  //     setNewsArticles((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   };
  // const addToReadLater = (articleid, articlepublisher, articletitle, articleimages) => {
  const addToReadLater = (articleid, articlepublisher, articletitle, articleimages) => {
    // Check if cartItem has any items
    // If newsArticles has items, check if articleid exists
    if (newsArticles.hasOwnProperty(articleid)) {
      // If matched, increase the count by one
      let tempCart = {
        ...newsArticles,
        [articleid]: {
          ...newsArticles[articleid],
          count: newsArticles[articleid].count + 1,
        },
      };
      setNewsArticles(tempCart);
      updateNewsArticles(tempCart);
      //   setNewsArticles({
      //     ...newsArticles,
      //     [articleid]: {
      //       ...newsArticles[articleid],
      //       count: newsArticles[articleid].count + 1,
      //     },
      //   });
    } else {
      // If no match is found, add a new object with articleid as the key
      let tempCart = {
        ...newsArticles,
        [articleid]: {
          articleid,
          articlepublisher,
          articletitle,
          articleimages,
          count: 1,
        },
      };
      setNewsArticles(tempCart);

      updateNewsArticles(tempCart);
      //   setNewsArticles({
      //     ...newsArticles,
      //     [articleid]: {
      //       articleid,
      //       articlepublisher,
      //       articletitle,
      //       articleimages,
      //       count: 1,
      //     },
      //   });
    }
  };

  //   const removeFromCart = (itemId) => {
  //     setNewsArticles((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  //   };

  const removeFromCart = (itemid) => {
    // Check if cartItem has any items
    if (Object.keys(newsArticles).length === 0) {
      // If newsArticles is empty, do nothing
      return;
    } else {
      // If newsArticles has items, check if itemid exists
      if (newsArticles.hasOwnProperty(itemid)) {
        // If count is more than 1, decrement it by one
        if (newsArticles[itemid].count > 1) {
          let tempCart = {
            ...newsArticles,
            [itemid]: {
              ...newsArticles[itemid],
              count: newsArticles[itemid].count - 1,
            },
          };

          setNewsArticles(tempCart);
          updateNewsArticles(tempCart);
          //   setNewsArticles({
          //     ...newsArticles,
          //     [itemid]: {
          //       ...newsArticles[itemid],
          //       count: newsArticles[itemid].count - 1,
          //     },
          //   });
        } else {
          // If count is 1, remove the item from newsArticles
          const updatedCart = { ...newsArticles };
          delete updatedCart[itemid];
          setNewsArticles(updatedCart);
        }
      }
    }
  };

  //   const updateCartItemCount = (newAmount, itemId) => {
  //     setNewsArticles((prev) => ({ ...prev, [itemId]: newAmount }));
  //   };

  const updateCartItemCount = (
    itemId,
    newAmount,
    articlepublisher,
    articletitle,
    articleimages
  ) => {
    // Check if newAmount is 0 or less
    console.log(
      itemId,
      newAmount,
      articlepublisher,
      articletitle,
      articleimages,
      "this is from update cart item count..."
    );
    if (newAmount <= 0) {
      // If newAmount is 0 or less, remove the item from cartItem
      const updatedCart = { ...newsArticles };
      delete updatedCart[itemId];
      setNewsArticles(updatedCart);
      updateNewsArticles(updatedCart);
    } else {
      // If newAmount is greater than 0, update the count or add a new item
      //   setNewsArticles({
      //     ...newsArticles,
      //     [itemId]: {
      //       ...newsArticles[itemId],
      //       itemId,
      //       count: newAmount,
      //     },
      //   });
      if (newsArticles.hasOwnProperty(itemId)) {
        // If matched, increase the count by one

        let tempCart = {
          ...newsArticles,
          [itemId]: {
            ...newsArticles[itemId],
            count: newAmount,
          },
        };
        setNewsArticles(tempCart);
        // setNewsArticles({
        //   ...newsArticles,
        //   [itemId]: {
        //     ...newsArticles[itemId],
        //     count: newAmount,
        //   },
        // });
        updateNewsArticles(tempCart);
      } else {
        // If no match is found, add a new object with itemid as the key
        let tempCart = {
          ...newsArticles,
          [itemId]: {
            itemId,
            articlepublisher,
            articletitle,
            articleimages,
            count: newAmount,
          },
        };
        setNewsArticles(tempCart);
        updateNewsArticles(tempCart);
        // setNewsArticles({
        //   ...newsArticles,
        //   [itemId]: {
        //     itemId,
        //     articlepublisher,
        //     articletitle,
        //     articleimages,
        //     count: newAmount,
        //   },
        // });
      }
    }
  };
  const removeEntireItem = (itemId) => {
    const updatedCart = { ...newsArticles };
    delete updatedCart[itemId];
    setNewsArticles(updatedCart);
    updateNewsArticles(updatedCart);
  };

  const getItemCountById = (itemId) => {
    // Retrieve newsArticles from local storage
    const newsArticlesString = localStorage.getItem("newsArticles");

    // Check if newsArticles is present in local storage
    if (newsArticlesString) {
      try {
        // Parse the JSON string to get the newsArticles object
        const newsArticles = JSON.parse(newsArticlesString);

        // Check if the item with the given itemId exists in newsArticles
        if (newsArticles && newsArticles[itemId]) {
          // Return the count property of the item
          return newsArticles[itemId].count;
        }
      } catch (error) {
        console.error("Error parsing newsArticles JSON:", error);
      }
    }

    // Return 0 if the item with the given itemId is not found
    return 0;
  };

  const checkout = () => {
    setNewsArticles({});
    localStorage.removeItem("newsArticles");
    // updatenewsArticles({});
  };

  const isArticleInContext = (articleId) => {
    return newsArticles.hasOwnProperty(articleId);
  };
  

  const contextValue = {
    newsArticles,
    // addToCart,
    isArticleInContext,
    addToReadLater ,
    updateCartItemCount,
    removeFromCart,
    removeEntireItem,
    // getTotalCartAmount,
    checkout,
    // socket,
    getItemCountById,
    // userCount,
    // setUserCount,
  };

  return (
    <NewsContext.Provider value={contextValue}>
      {props.children}
    </NewsContext.Provider>
  );
};
