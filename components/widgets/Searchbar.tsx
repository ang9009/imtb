import React, { useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";

const Searchbar: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const router = useRouter();

  return (
    <>
      <input
        type="text"
        placeholder={`Search...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            await router.push(`/toilets/search?q=${query}`);
          }
        }}
      />

      <style jsx>{`
        input {
          background: #e8e8e8;
          border: none;
          padding: 15px;
          width: 100%;
          height: 70%;
          border-radius: 50px;
          margin-left: 40px;
        }
      `}</style>
    </>
  );
};

export default Searchbar;
