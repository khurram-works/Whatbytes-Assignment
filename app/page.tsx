"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import MainSection from "@/components/main";
import Footer from "@/components/footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <MainSection searchQuery={searchQuery} />
      <Footer />
    </>
  );
}