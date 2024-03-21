// import img1 from "@/public/images/butter-chicken.jpg";
// import img2 from "@/public/images/chicken-tikka-masala.jpg";
// import img3 from "@/public/images/shahi paneer.jpg";

export interface MenuItem {
  name: string;
  price: number;
  id :number;
}

export const menu: MenuItem[] = [
    { name: "Classic Cheeseburger", price: 300,id:1001 },
    { name: "Margherita Pizza", price: 400 ,id:1002},
    { name: "Grilled Chicken Salad", price: 250 ,id:1003},
    { name: "Spaghetti Carbonara", price: 450 ,id:1004},
    { name: "Vegetable Stir-Fry", price: 350 ,id:1005},
    { name: "Fish and Chips", price: 500,id:1006},
    { name: "Caesar Salad", price: 200 ,id:1007},
    { name: "BBQ Ribs", price: 600,id:1008},
    { name: "Mushroom Risotto", price: 400,id:1009 },
    { name: "Chicken Alfredo", price: 500 ,id:1010},
    { name: "Tiramisu", price: 200 ,id:1011},
    { name: "Fruit Platter", price: 300,id:1012 },
    { name: "Chocolate Brownie", price: 150 ,id:1013},
  ];

export interface PopularItem {
  name: string;
  img: string;
}

// export const popularItems: PopularItem[] = [
//   { name: "Butter Chicken", img: img1.src },
//   {
//     name: "Chicken Tikka Masala",
//     img: img2.src,
//   },
//   { name: "Shahi Paneer", img: img3.src },
// ];
