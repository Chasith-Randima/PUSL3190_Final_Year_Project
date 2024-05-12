"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { usePathname } from "next/navigation";

import { NewsContextProvider } from "@/context/show-context";
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const pathName = usePathname();

  console.log(pathName);
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body >
        <NewsContextProvider>
      
          {pathName != "/users/login" && pathName != "/users/signup" && (
            <NavBar />
          )}
          {/* <SideBar>{children}</SideBar> */}

          {children}

          <Footer />
          </NewsContextProvider>
   
      </body>
    </html>
  );
}