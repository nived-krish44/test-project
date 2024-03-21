// Import necessary modules and components
import React from "react";
//import { useClient } from "next/data-client"; // Import useClient from next/data-client
import MenuBox from "@/components/MenuBox";

const Home = () => {
  //useClient(); // Marking this component as a Client Component

  return (
    <div>
      <MenuBox/>
    </div>
  );
};

export default Home;
