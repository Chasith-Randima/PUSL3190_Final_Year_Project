"use client";

import { allArticles,deleteArticle,searchArticles } from "@/actions/article";
import { useState, useEffect } from "react";
import { getCookie } from "@/actions/auth";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { brands } from "@/constants";
import dots from "dots";
import ProductCard from "@/components/ProductCard";

import { useContext } from "react";
import { NewsContext } from "@/context/show-context";

const ReadLaterArticles = () => {
    const {newsArticles,addToReadLater,isArticleInContext,removeEntireItem} = useContext(NewsContext)

    const productsArray = Object.values(newsArticles);

  return (
    <>
      <SideBar>
        <section className="items-center lg:flex bg-gray-50 lg:h-full mt-12 font-poppins dark:bg-gray-800 ">
          {/* {alert && alert?.message && (
            <Modal alert={alert} setAlert={resetAlert} />
          )} */}
          <div className="justify-center flex-1 max-w-6xl px-4 mx-auto  md:px-6">
            <div className="overflow-x-auto bg-white rounded shadow dark:bg-gray-900">
              <div className="">
                <h2 className="px-6 py-4 pb-4 text-xl font-medium border-b border-gray-300 dark:border-gray-700 dark:text-gray-400">
                  All Articles
                </h2>
                <div className="flex flex-wrap items-center justify-between px-4 py-2 border-b dark:border-gray-700">
             <div>
             {productsArray && productsArray.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {productsArray?.map((product) => (
                <ProductCard product={{_id:product.articleid,title:product.articletitle,publisher:product.articlepublisher,image:product.articleimages}} />
              ))}
            </div>

            {/* <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            /> */}
          </section>
        ) : (
          <div className="home__error-container ">
            <h2 className="text-black text-xl font-bold text-center justify-center">Oops, no articles in Read Later</h2>
            {/* <p>{allData?.message}</p> */}
          </div>
        )}
        </div>
             </div>
              </div>
            </div>
          </div>
        </section>
      </SideBar>
    </>
  );
};

export default ReadLaterArticles;