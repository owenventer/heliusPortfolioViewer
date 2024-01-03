"use client";
import React from "react";
import { Token, Attribute } from "../types/Token";

interface TokenCardProps {
  token: Token;
  tokenType: string;
}

function TokenCard({ token, tokenType }: TokenCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-lg">
      {/* Other token information */}
      {tokenType === "fungible" ? (
        <div>
          <img
            src={token.content.links.image}
            alt={token.content.metadata.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="font-bold text-xl mb-2">
              {token.content.metadata.symbol}
            </h2>
            {/* <p>{token.content.metadata.description}</p> */}
            <p>Amount:{token.token_info.balance}</p>
            {token.token_info.price_info?.total_price ? (
              <p>Value: ${token.token_info.price_info.total_price}</p>
            ) : null}
          </div>
        </div>
      ) : (
        <div>
          <img
            src={token.content.links.image}
            alt={token.content.metadata.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="font-bold text-xl mb-2">
              {token.content.metadata.name}
            </h2>
            <p>{token.content.metadata.description}</p>
            <ul className="list-disc pl-5 mt-3">
              {token.content.metadata?.attributes?.map(
                (attribute: Attribute, index: number) => (
                  <li key={index}>
                    {attribute.trait_type}: {attribute.value}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TokenCard;
