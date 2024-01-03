import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [address, setAddress] = useState<string>("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    router.push(`/${address}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center my-4"
    >
      <input
        type="text"
        placeholder="Enter Solana Wallet Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border-2 border-gray-300 rounded-md w-full text-center px-4 py-2 mb-4 flex-grow text-black"
      />
      <button
        type="submit"
        className="bg-[#E84125] text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </form>
  );
}
