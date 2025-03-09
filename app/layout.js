import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Head from "next/head";
import React from "react";
import scheduleExpiredEventsDeletion from '../lib/cron';
import Navbar from "@/components/Navbar";
import LayoutWrapper from "@/components/LayoutWrapper";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GetMyPass-Enjoy Your Event",
  description: "Complete Your Event",
};

export default function RootLayout({ children }) {
  scheduleExpiredEventsDeletion();
  return (
    <html lang="en">
      <head>
      <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet" />
      <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className={inter.className}>
      <LayoutWrapper>{children}</LayoutWrapper>
        <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
      </body>
    </html>
  );
}
