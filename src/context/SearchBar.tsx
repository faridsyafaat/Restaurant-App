"use client";

import { useState } from "react";
import { useSearch } from "@/context/useSearch";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [text, setText] = useState("");
  const { searchResto } = useSearch();

  const handleSearch = () => {
    if (text.trim() !== "") {
      searchResto(text);
    }
  };

  return (
    <div className="w-full flex items-center gap-2 bg-white p-3 rounded-xl shadow">
      <Search className="text-gray-500" />

      <input
        type="text"
        className="flex-1 outline-none"
        placeholder="Search restaurant..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      <button
        onClick={handleSearch}
        className="bg-black text-white px-3 py-1 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}
