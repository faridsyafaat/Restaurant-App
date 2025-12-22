"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "w-full flex items-center gap-2 bg-white p-3 rounded-xl shadow", children: [_jsx(Search, { className: "text-gray-500" }), _jsx("input", { type: "text", className: "flex-1 outline-none", placeholder: "Search restaurant...", value: text, onChange: (e) => setText(e.target.value), onKeyDown: (e) => e.key === "Enter" && handleSearch() }), _jsx("button", { onClick: handleSearch, className: "bg-black text-white px-3 py-1 rounded-lg", children: "Search" })] }));
}
