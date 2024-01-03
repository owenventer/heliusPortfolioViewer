"use client";
import React, { useState, useEffect } from "react";
import fetchTokens from "../lib/searchAssets";
import TokenCard from "../components/tokenCard";
import { Token, Attribute } from "../types/Token";

interface Tokens {
  items: Token[];
}

interface PageProps {
  params: {
    wallet: string;
  };
}

export default function Page({ params }: PageProps) {
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [tokenType, setTokenType] = useState("fungible");

  useEffect(() => {
    fetchTokens(params.wallet).then(setTokens).catch(console.error);
  }, [params.wallet]);

  console.log("tokens", tokens);
  const fungibleTokens = tokens
    ? tokens.items.filter(
        (token) =>
          token.interface === "FungibleToken" ||
          token.interface === "FungibleAsset"
      )
    : [];
  const nonFungibleTokens = tokens
    ? tokens.items.filter(
        (token) =>
          token.interface !== "FungibleToken" &&
          token.interface !== "FungibleAsset"
      )
    : [];

  const displayedTokens =
    tokenType === "fungible" ? fungibleTokens : nonFungibleTokens;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-5xl text-[#E84125] font-bold text-center my-2">
        Portfolio Viewer
      </h1>
      <h1 className="text-xl font-bold text-center my-6">{params.wallet}</h1>
      <div className="flex justify-center my-4">
        <button
          className={`px-4 py-2 mr-2 rounded-md ${
            tokenType === "fungible" ? "bg-[#E84125] text-white" : "bg-gray-400"
          }`}
          onClick={() => setTokenType("fungible")}
        >
          Fungible Tokens
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            tokenType === "nonFungible"
              ? "bg-[#E84125] text-white"
              : "bg-gray-400"
          }`}
          onClick={() => setTokenType("nonFungible")}
        >
          Non-Fungible Tokens
        </button>
      </div>
      {displayedTokens.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedTokens.map((token) => (
            <TokenCard key={token.id} token={token} tokenType={tokenType} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
