"use client"

import { useState } from "react";
import { MenuItem, menu } from "@/constants/items";

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = async ({
    itemName,
    itemId,
  }: {
    itemName: string;
    itemId: number;
  }) => {
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName, itemId }),
      });

      if (response.ok) {
        console.log("Item name sent successfully.");
        // Handle success response if needed
      } else {
        console.error("Failed to send item name.");
        // Handle error response if needed
      }
    } catch (error) {
      console.error("Error sending item name:", error);
      // Handle network or other errors
    }
  };

  return (
    <div className="w-full border-2 rounded-lg shadow-lg p-4">
      <div className="text-xl font-bold mb-4">Menu</div>
      {menu.map((item: MenuItem, index: number) => {
        return (
          <div
            key={index}
            className={`flex items-center justify-between border-b-2 py-2 hover:bg-gray-100 transition-colors ${
              selectedItem === item.name ? "bg-blue-200" : ""
            }`}
            onClick={() => {
              setSelectedItem(item?.name);
              handleItemClick({ itemName: item?.name, itemId: item?.id });
            }}
          >
            <p className="w-1/6 text-center font-bold">{index + 1}</p>
            <p className="w-1/2 pl-5 hover:text-blue-500 cursor-pointer">
              {item.name}
            </p>
            <p className="w-1/3 text-right pr-2 hover:text-blue-500 cursor-pointer">
              Rs. {item.price}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;