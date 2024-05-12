"use client";

import { useState,useContext } from "react";
import Image from "next/image";

import CustomButton from "./CustomButton";
// import CarDetails from "./CarDetails";
import { useRouter } from "next/navigation";
import { NewsContext } from "@/context/show-context";

const ProductDetailsCard = ({ product }) => {
  console.log(product,"product card............")
  const router = useRouter();
  // const { city_mpg, year, make, model, transmission, drive } = product;

  const [isOpen, setIsOpen] = useState(false);

  // const carRent = calculateCarRent(city_mpg, year);
  const carRent = 5000;

  const {newsArticles,addToReadLater,isArticleInContext,removeEntireItem} = useContext(NewsContext)

  const goTo = (link) => {
    router.push(link);
  };

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {" "}
          {/* {`${product?.model} ${product?.processor} ${product?.ram} ${product?.storage} laptop`} */}

          {product?.title}
        </h2>
      </div>

      <div className="flex justify-between mt-6 text-[32px] leading-[38px] font-extrabold w-full">
        <span className="self-start text-[14px] leading-[17px] font-semibold">
          Publisher:        {product && product?.publisher && <span className="col-span-2 ml-auto justify-left">
        <span type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 capitalize">
{product.publisher}
{/* <span class="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
2
</span> */}
</span>

       </span>}
        </span>
        {product.price}
        <span className="self-end text-[14px] leading-[17px] font-medium"></span>
     {product && isArticleInContext(product._id) ? <button
     onClick={()=>removeEntireItem(product._id)}
                  class="p-1 transition text-sm ml-8 ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Remove From Read Later</button> : <button
                  
                  onClick={()=>addToReadLater(product._id, product.publisher, product.title, product.image)}
                  class="p-1 transition text-sm ml-8 ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Add
            to Read Later</button>}
        {/* {product.price} */}
        {/* <span className="self-end text-[14px] leading-[17px] font-medium mr-0">
     {product && isArticleInContext(product._id) ? <button
     onClick={()=>removeEntireItem(product._id)}
                  class="p-1 transition text-sm ml-8 ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Remove From Read Later</button> : <button
                  
                  onClick={()=>addToReadLater(product._id, product.publisher, product.title, product.image)}
                  class="p-1 transition text-sm ml-8 ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Add
            to Read Later</button>}
            </span> */}
      </div>


      <div className="relative w-full h-40 my-3 object-contain">
        {product && product?.summarized_text && <p>{product.summarized_text}</p>}
        {/* {product && product?.image ? (
          <Image
            // src={"https://m.media-amazon.com/images/I/71ASAtN3OZL._AC_SX679_.jpg"}
            // src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/products/image/${product.images[0]}`}
            src={product.image}
            // alt="car model"
            fill
            priority
            className="object-contain"
          />
        ) : (
          <Image
            // src={"https://m.media-amazon.com/images/I/71ASAtN3OZL._AC_SX679_.jpg"}
            // src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/products/image/${product.images[0]}`}
            src={"/svg/logo-color.svg"}
            // width={200}
            // height={100}
            // className="w-full h-full"
            // alt="car model"
            fill
            priority
            className="object-contain w-full h-full"
          />
        )} */}
      </div>

      <div className="relative flex w-full mt-2">
        {/* <div className="flex group-hover:invisible w-full justify-between text-grey">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/svgs/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p className="text-[14px] leading-[17px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/svgs/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{drive}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/svgs/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div> */}
      
        <div className="car-card__btn-container">
          <CustomButton
            title="View More."
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/svg/right-arrow.svg"
            handleClick={() =>
              goTo(`/articles/singleArticle?articleId=${product._id}`)
            }
          />
        </div>
      </div>

      {/* <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        product={product}
      /> */}
    </div>
  );
};

export default ProductDetailsCard;




