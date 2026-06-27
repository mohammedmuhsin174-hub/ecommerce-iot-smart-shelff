//ecommerce-frontend\src\Components\chatbot.js
import React, { useState, useRef, useEffect } from "react";
import "./chatbot.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm ElectroBot. May I help you choose a product?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [currentState, setCurrentState] = useState("greeting"); // States: greeting, category, filterType, filter, results
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const messagesEndRef = useRef(null);

  // Product data directly in the component
  const products = [{
  "_id": {
    "$oid": "681231d7fd7c3d090e989289"
  },
  "name": "Google Pixel 6 ",
  "brand": "Google",
  "description": "Smartphone with Google Tensor chip",
  "price": 699,
  "category": "Phones",
  "image": "https://firebasestorage.googleapis.com/v0/b/popsygae.appspot.com/o/smartphone-images%2Fpixel-6-pro%2Fblack%2F1.jpg?alt=media&token=b74a7040-9b02-44ec-a600-49d2e93c9530",
  "rating": 0,
  "stock": 44,
  "specifications": {
    "Processor": "Google Tensor",
    "RAM": "8GB",
    "Storage Options": "128GB, 256GB",
    "Display": "6.4-inch AMOLED",
    "Camera": "Dual 50MP + 12MP"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e98928a"
  },
  "name": "Google Pixel 6",
  "brand": "Google",
  "description": "Description for Google Pixel 6 Variant 1",
  "price": 378,
  "category": "Phones",
  "image": "https://i.ebayimg.com/images/g/eO4AAOSwck9hyhrR/s-l1600.webp",
  "rating": 3.7,
  "stock": 29,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "16GB",
    "Storage": "256GB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 14 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e98928b"
  },
  "name": "Samsung Galaxy S21 ",
  "brand": "Samsung",
  "description": "Description for Samsung Galaxy S21 ",
  "price": 651,
  "category": "Phones",
  "image": "https://m.media-amazon.com/images/I/81IWsqrVMTL.__AC_SX300_SY300_QL70_ML2_.jpg",
  "rating": 3.9,
  "stock": 9,
  "specifications": {
    "Processor": "Apple M1",
    "RAM": "4GB",
    "Storage": "256GB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 18 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e98928c"
  },
  "name": "Apple iPhone 13 ",
  "brand": "Apple",
  "description": "Description for Apple iPhone 13 ",
  "price": 1164,
  "category": "Phones",
  "image": "https://mcprod.jumbo.ae/media/catalog/product/i/p/iphone_13_starlight_pdp_image_position-1a_en.jpg",
  "rating": 4.9,
  "stock": 26,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "4GB",
    "Storage": "1TB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 19 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e98928d"
  },
  "name": "OnePlus 9 ",
  "brand": "OnePlus",
  "description": "Description for OnePlus 9 ",
  "price": 992,
  "category": "Phones",
  "image": "https://m.media-amazon.com/images/I/51oGIb2TUGL._AC_.jpg",
  "rating": 4.6,
  "stock": 44,
  "specifications": {
    "Processor": "Snapdragon 888",
    "RAM": "16GB",
    "Storage": "512GB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 16 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e98928e"
  },
  "name": "Xiaomi Mi 11 ",
  "brand": "Xiaomi",
  "description": "Description for Xiaomi Mi 11 ",
  "price": 1377,
  "category": "Phones",
  "image": "https://m.media-amazon.com/images/I/517JLoFGg0L._AC_SL1000_.jpg",
  "rating": 4.9,
  "stock": 9,
  "specifications": {
    "Processor": "Exynos 2100",
    "RAM": "4GB",
    "Storage": "256GB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 14 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e98928f"
  },
  "name": "Sony WH-1000XM4 ",
  "brand": "Sony",
  "description": "Description for Sony WH-1000XM4 ",
  "price": 267,
  "category": "Accessories",
  "image": "https://ecityuae.ae/cdn/shop/files/4548736142435_1.jpg?v=1714644990&width=990",
  "rating": 3.7,
  "stock": 47,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "16GB",
    "Storage": "512GB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 17 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e989290"
  },
  "name": "Logitech MX Master 3 ",
  "brand": "Logitech",
  "description": "Description for Logitech MX Master 3 ",
  "price": 1313,
  "category": "Accessories",
  "image": "https://mcprod.jumbo.ae/media/catalog/product/9/1/910006559ae.d7758e98bb.999xx_woldirjrg5ysyfzm.jpg",
  "rating": 4.2,
  "stock": 27,
  "specifications": {
    "Processor": "Exynos 2100",
    "RAM": "16GB",
    "Storage": "1TB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 15 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e989291"
  },
  "name": "Dell XPS 13 Variant 8",
  "brand": "Dell",
  "description": "Description for Dell XPS 13 Variant 8",
  "price": 1131,
  "category": "Laptops",
  "image": "https://via.placeholder.com/300?text=Dell+XPS+13+Variant+8",
  "rating": 4.5,
  "stock": 44,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "4GB",
    "Storage": "1TB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 19 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e989292"
  },
  "name": "HP Spectre x360 ",
  "brand": "HP",
  "description": "Description for HP Spectre x360 ",
  "price": 1457,
  "category": "Laptops",
  "image": "https://mcprod.jumbo.ae/media/catalog/product/1/6/16-aa0012ne-b0cyc1td7f.main.jpg?width=265&height=265&canvas=265,265&optimize=medium&fit=bounds",
  "rating": 3.5,
  "stock": 50,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "8GB",
    "Storage": "1TB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 18 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e989293"
  },
  "name": "Acer Swift 3 ",
  "brand": "Acer",
  "description": "Description for Acer Swift 3 ",
  "price": 961,
  "category": "Laptops",
  "image": "https://images.acer.com/is/image/acer/Swift-3-SF314-511-Fp-Sv-01a-2?$Product-Cards-XL$",
  "rating": 4.4,
  "stock": 36,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "16GB",
    "Storage": "128GB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 15 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e989294"
  },
  "name": "Lenovo ThinkPad X1 Variant 11",
  "brand": "Lenovo",
  "description": "Description for Lenovo ThinkPad X1 Variant 11",
  "price": 528,
  "category": "Laptops",
  "image": "https://via.placeholder.com/300?text=Lenovo+ThinkPad+X1+Variant+11",
  "rating": 5,
  "stock": 28,
  "specifications": {
    "Processor": "Apple M1",
    "RAM": "16GB",
    "Storage": "1TB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 17 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e989295"
  },
  "name": "Asus ROG Zephyrus Variant 12",
  "brand": "Asus",
  "description": "Description for Asus ROG Zephyrus Variant 12",
  "price": 1126,
  "category": "Laptops",
  "image": "https://via.placeholder.com/300?text=Asus+ROG+Zephyrus+Variant+12",
  "rating": 4.8,
  "stock": 33,
  "specifications": {
    "Processor": "Exynos 2100",
    "RAM": "4GB",
    "Storage": "1TB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 16 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e989296"
  },
  "name": "MSI GS66 Stealth Variant 13",
  "brand": "MSI",
  "description": "Description for MSI GS66 Stealth Variant 13",
  "price": 394,
  "category": "Laptops",
  "image": "https://via.placeholder.com/300?text=MSI+GS66+Stealth+Variant+13",
  "rating": 4.5,
  "stock": 9,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "4GB",
    "Storage": "512GB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 15 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e989297"
  },
  "name": "Razer Blade 15 Variant 14",
  "brand": "Razer",
  "description": "Description for Razer Blade 15 Variant 14",
  "price": 1281,
  "category": "Laptops",
  "image": "https://via.placeholder.com/300?text=Razer+Blade+15+Variant+14",
  "rating": 4.8,
  "stock": 22,
  "specifications": {
    "Processor": "Snapdragon 888",
    "RAM": "16GB",
    "Storage": "128GB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 13 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e989298"
  },
  "name": "MacBook Air M2 Variant 15",
  "brand": "MacBook",
  "description": "Description for MacBook Air M2 Variant 15",
  "price": 414,
  "category": "Laptops",
  "image": "https://via.placeholder.com/300?text=MacBook+Air+M2+Variant+15",
  "rating": 4,
  "stock": 39,
  "specifications": {
    "Processor": "Snapdragon 888",
    "RAM": "8GB",
    "Storage": "128GB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 12 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e989299"
  },
  "name": "JBL Flip 5 Variant 16",
  "brand": "JBL",
  "description": "Description for JBL Flip 5 Variant 16",
  "price": 1395,
  "category": "Accessories",
  "image": "https://via.placeholder.com/300?text=JBL+Flip+5+Variant+16",
  "rating": 4.9,
  "stock": 45,
  "specifications": {
    "Processor": "Apple M1",
    "RAM": "16GB",
    "Storage": "256GB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 10 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e98929a"
  },
  "name": "Bose QuietComfort 45 Variant 17",
  "brand": "Bose",
  "description": "Description for Bose QuietComfort 45 Variant 17",
  "price": 1014,
  "category": "Accessories",
  "image": "https://via.placeholder.com/300?text=Bose+QuietComfort+45+Variant+17",
  "rating": 3.8,
  "stock": 33,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "8GB",
    "Storage": "512GB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 15 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e98929b"
  },
  "name": "Anker Soundcore Life Q30 Variant 18",
  "brand": "Anker",
  "description": "Description for Anker Soundcore Life Q30 Variant 18",
  "price": 783,
  "category": "Accessories",
  "image": "https://via.placeholder.com/300?text=Anker+Soundcore+Life+Q30+Variant+18",
  "rating": 3.7,
  "stock": 34,
  "specifications": {
    "Processor": "Exynos 2100",
    "RAM": "16GB",
    "Storage": "128GB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 20 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e98929c"
  },
  "name": "Canon EOS R6 Variant 19",
  "brand": "Canon",
  "description": "Description for Canon EOS R6 Variant 19",
  "price": 461,
  "category": "Cameras",
  "image": "https://via.placeholder.com/300?text=Canon+EOS+R6+Variant+19",
  "rating": 3.9,
  "stock": 19,
  "specifications": {
    "Processor": "Snapdragon 888",
    "RAM": "16GB",
    "Storage": "128GB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 13 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e98929d"
  },
  "name": "Nikon Z6 II Variant 20",
  "brand": "Nikon",
  "description": "Description for Nikon Z6 II Variant 20",
  "price": 1388,
  "category": "Cameras",
  "image": "https://via.placeholder.com/300?text=Nikon+Z6+II+Variant+20",
  "rating": 3.6,
  "stock": 18,
  "specifications": {
    "Processor": "Google Tensor",
    "RAM": "8GB",
    "Storage": "256GB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 20 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e98929e"
  },
  "name": "Fujifilm X-T4 Variant 21",
  "brand": "Fujifilm",
  "description": "Description for Fujifilm X-T4 Variant 21",
  "price": 963,
  "category": "Cameras",
  "image": "https://via.placeholder.com/300?text=Fujifilm+X-T4+Variant+21",
  "rating": 4,
  "stock": 36,
  "specifications": {
    "Processor": "Exynos 2100",
    "RAM": "4GB",
    "Storage": "128GB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 16 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e98929f"
  },
  "name": "GoPro HERO10 Variant 22",
  "brand": "GoPro",
  "description": "Description for GoPro HERO10 Variant 22",
  "price": 607,
  "category": "Cameras",
  "image": "https://via.placeholder.com/300?text=GoPro+HERO10+Variant+22",
  "rating": 4.5,
  "stock": 14,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "4GB",
    "Storage": "512GB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 14 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892a0"
  },
  "name": "DJI Mini 2 Variant 23",
  "brand": "DJI",
  "description": "Description for DJI Mini 2 Variant 23",
  "price": 1485,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=DJI+Mini+2+Variant+23",
  "rating": 5,
  "stock": 24,
  "specifications": {
    "Processor": "Apple M1",
    "RAM": "4GB",
    "Storage": "512GB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 13 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892a1"
  },
  "name": "Amazon Echo Dot Variant 24",
  "brand": "Amazon",
  "description": "Description for Amazon Echo Dot Variant 24",
  "price": 594,
  "category": "Accessories",
  "image": "https://via.placeholder.com/300?text=Amazon+Echo+Dot+Variant+24",
  "rating": 4.2,
  "stock": 33,
  "specifications": {
    "Processor": "Exynos 2100",
    "RAM": "8GB",
    "Storage": "128GB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 20 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892a2"
  },
  "name": "Google Nest Hub Variant 25",
  "brand": "Google",
  "description": "Description for Google Nest Hub Variant 25",
  "price": 1371,
  "category": "Accessories",
  "image": "https://via.placeholder.com/300?text=Google+Nest+Hub+Variant+25",
  "rating": 4.7,
  "stock": 39,
  "specifications": {
    "Processor": "Apple M1",
    "RAM": "16GB",
    "Storage": "1TB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 10 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892a3"
  },
  "name": "Fire TV Stick 4K Variant 26",
  "brand": "Fire",
  "description": "Description for Fire TV Stick 4K Variant 26",
  "price": 735,
  "category": "Others",
  "image": "https://via.placeholder.com/300?text=Fire+TV+Stick+4K+Variant+26",
  "rating": 3.8,
  "stock": 40,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "16GB",
    "Storage": "1TB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 17 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892a4"
  },
  "name": "Roku Streaming Stick+ Variant 27",
  "brand": "Roku",
  "description": "Description for Roku Streaming Stick+ Variant 27",
  "price": 151,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Roku+Streaming+Stick++Variant+27",
  "rating": 4.8,
  "stock": 30,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "16GB",
    "Storage": "1TB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 11 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892a5"
  },
  "name": "TP-Link Deco X20 Variant 28",
  "brand": "TP-Link",
  "description": "Description for TP-Link Deco X20 Variant 28",
  "price": 1447,
  "category": "Accessories",
  "image": "https://via.placeholder.com/300?text=TP-Link+Deco+X20+Variant+28",
  "rating": 4.7,
  "stock": 17,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "4GB",
    "Storage": "256GB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 11 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892a6"
  },
  "name": "Netgear Nighthawk AX12 Variant 29",
  "brand": "Netgear",
  "description": "Description for Netgear Nighthawk AX12 Variant 29",
  "price": 994,
  "category": "Accessories",
  "image": "https://via.placeholder.com/300?text=Netgear+Nighthawk+AX12+Variant+29",
  "rating": 4.3,
  "stock": 30,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "16GB",
    "Storage": "1TB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 11 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892a7"
  },
  "name": "Ring Video Doorbell 4 Variant 30",
  "brand": "Ring",
  "description": "Description for Ring Video Doorbell 4 Variant 30",
  "price": 1290,
  "category": "Accessories",
  "image": "https://via.placeholder.com/300?text=Ring+Video+Doorbell+4+Variant+30",
  "rating": 4.7,
  "stock": 22,
  "specifications": {
    "Processor": "Snapdragon 888",
    "RAM": "16GB",
    "Storage": "256GB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 20 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892a8"
  },
  "name": "Fitbit Versa 3 Variant 31",
  "brand": "Fitbit",
  "description": "Description for Fitbit Versa 3 Variant 31",
  "price": 792,
  "category": "Accessories",
  "image": "https://via.placeholder.com/300?text=Fitbit+Versa+3+Variant+31",
  "rating": 4.3,
  "stock": 16,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "16GB",
    "Storage": "512GB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 20 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892a9"
  },
  "name": "Apple Watch SE Variant 32",
  "brand": "Apple",
  "description": "Description for Apple Watch SE Variant 32",
  "price": 1075,
  "category": "Accessories",
  "image": "https://via.placeholder.com/300?text=Apple+Watch+SE+Variant+32",
  "rating": 5,
  "stock": 25,
  "specifications": {
    "Processor": "Exynos 2100",
    "RAM": "8GB",
    "Storage": "128GB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 13 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892aa"
  },
  "name": "Garmin Venu Sq Variant 33",
  "brand": "Garmin",
  "description": "Description for Garmin Venu Sq Variant 33",
  "price": 717,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Garmin+Venu+Sq+Variant+33",
  "rating": 4.8,
  "stock": 15,
  "specifications": {
    "Processor": "Exynos 2100",
    "RAM": "8GB",
    "Storage": "256GB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 17 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892ab"
  },
  "name": "Samsung Galaxy Watch 4 Variant 34",
  "brand": "Samsung",
  "description": "Description for Samsung Galaxy Watch 4 Variant 34",
  "price": 1254,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Samsung+Galaxy+Watch+4+Variant+34",
  "rating": 5,
  "stock": 7,
  "specifications": {
    "Processor": "Exynos 2100",
    "RAM": "16GB",
    "Storage": "1TB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 16 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892ac"
  },
  "name": "Huawei Watch GT 3 Variant 35",
  "brand": "Huawei",
  "description": "Description for Huawei Watch GT 3 Variant 35",
  "price": 1404,
  "category": "Accessories",
  "image": "https://via.placeholder.com/300?text=Huawei+Watch+GT+3+Variant+35",
  "rating": 3.7,
  "stock": 32,
  "specifications": {
    "Processor": "Snapdragon 888",
    "RAM": "8GB",
    "Storage": "256GB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 13 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892ad"
  },
  "name": "Realme Narzo 50 Variant 36",
  "brand": "Realme",
  "description": "Description for Realme Narzo 50 Variant 36",
  "price": 1282,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Realme+Narzo+50+Variant+36",
  "rating": 3.8,
  "stock": 16,
  "specifications": {
    "Processor": "Google Tensor",
    "RAM": "4GB",
    "Storage": "512GB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 14 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892ae"
  },
  "name": "Infinix Zero 5G Variant 37",
  "brand": "Infinix",
  "description": "Description for Infinix Zero 5G Variant 37",
  "price": 597,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Infinix+Zero+5G+Variant+37",
  "rating": 4.9,
  "stock": 15,
  "specifications": {
    "Processor": "Apple M1",
    "RAM": "16GB",
    "Storage": "256GB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 14 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892af"
  },
  "name": "Lava Blaze 5G Variant 38",
  "brand": "Lava",
  "description": "Description for Lava Blaze 5G Variant 38",
  "price": 661,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Lava+Blaze+5G+Variant+38",
  "rating": 3.8,
  "stock": 41,
  "specifications": {
    "Processor": "Apple M1",
    "RAM": "16GB",
    "Storage": "256GB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 12 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892b0"
  },
  "name": "Tecno Pova 5 Variant 39",
  "brand": "Tecno",
  "description": "Description for Tecno Pova 5 Variant 39",
  "price": 648,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Tecno+Pova+5+Variant+39",
  "rating": 3.5,
  "stock": 26,
  "specifications": {
    "Processor": "Google Tensor",
    "RAM": "4GB",
    "Storage": "128GB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 17 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892b1"
  },
  "name": "Motorola Edge 30 Variant 40",
  "brand": "Motorola",
  "description": "Description for Motorola Edge 30 Variant 40",
  "price": 834,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Motorola+Edge+30+Variant+40",
  "rating": 4.2,
  "stock": 6,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "8GB",
    "Storage": "1TB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 16 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892b2"
  },
  "name": "Nothing Phone 1 Variant 41",
  "brand": "Nothing",
  "description": "Description for Nothing Phone 1 Variant 41",
  "price": 1211,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Nothing+Phone+1+Variant+41",
  "rating": 4,
  "stock": 12,
  "specifications": {
    "Processor": "Google Tensor",
    "RAM": "8GB",
    "Storage": "512GB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 14 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892b3"
  },
  "name": "Redmi Note 12 Pro Variant 42",
  "brand": "Redmi",
  "description": "Description for Redmi Note 12 Pro Variant 42",
  "price": 1284,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Redmi+Note+12+Pro+Variant+42",
  "rating": 4.5,
  "stock": 14,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "16GB",
    "Storage": "512GB",
    "Display": "6.5-inch AMOLED",
    "Battery Life": "Up to 19 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892b4"
  },
  "name": "Vivo V27 Variant 43",
  "brand": "Vivo",
  "description": "Description for Vivo V27 Variant 43",
  "price": 1471,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Vivo+V27+Variant+43",
  "rating": 4.8,
  "stock": 20,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "4GB",
    "Storage": "1TB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 20 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892b5"
  },
  "name": "Oppo Reno8 Variant 44",
  "brand": "Oppo",
  "description": "Description for Oppo Reno8 Variant 44",
  "price": 488,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Oppo+Reno8+Variant+44",
  "rating": 4.9,
  "stock": 22,
  "specifications": {
    "Processor": "Intel i7",
    "RAM": "8GB",
    "Storage": "512GB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 12 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892b6"
  },
  "name": "iQOO Neo 7 Variant 45",
  "brand": "iQOO",
  "description": "Description for iQOO Neo 7 Variant 45",
  "price": 386,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=iQOO+Neo+7+Variant+45",
  "rating": 3.8,
  "stock": 36,
  "specifications": {
    "Processor": "Snapdragon 888",
    "RAM": "8GB",
    "Storage": "256GB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 12 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892b7"
  },
  "name": "Asus Zenfone 9 Variant 46",
  "brand": "Asus",
  "description": "Description for Asus Zenfone 9 Variant 46",
  "price": 204,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Asus+Zenfone+9+Variant+46",
  "rating": 3.7,
  "stock": 50,
  "specifications": {
    "Processor": "Snapdragon 888",
    "RAM": "16GB",
    "Storage": "128GB",
    "Display": "13.3-inch FHD",
    "Battery Life": "Up to 19 hours"
  }
},
{
  "_id": {
    "$oid": "681232b2fd7c3d090e9892b8"
  },
  "name": "Nokia X30 Variant 47",
  "brand": "Nokia",
  "description": "Description for Nokia X30 Variant 47",
  "price": 165,
  "category": "Phones",
  "image": "https://via.placeholder.com/300?text=Nokia+X30+Variant+47",
  "rating": 4.1,
  "stock": 34,
  "specifications": {
    "Processor": "Apple M1",
    "RAM": "16GB",
    "Storage": "512GB",
    "Display": "14-inch OLED",
    "Battery Life": "Up to 19 hours"
  }
}];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text, sender = "bot", data = null) => {
    setMessages((prev) => [...prev, { text, sender, data }]);
  };

  const handleToggle = () => setIsOpen(!isOpen);

  const filterProducts = (category, filterType, filterValue) => {
    const loweredFilterValue = filterValue.toLowerCase();
    
    return products.filter((product) => {
      // Match category first
      if (!product.category.toLowerCase().includes(category.toLowerCase())) {
        return false;
      }
      
      // If no filterType specified, return all products in category
      if (!filterType || !filterValue) {
        return true;
      }
      
      if (filterType === "price") {
        // Price range handling (e.g., "between 200-400" or "200-400")
        const priceRange = loweredFilterValue.match(/(\d+)\s*-\s*(\d+)/);
        if (priceRange) {
          const minPrice = parseInt(priceRange[1]);
          const maxPrice = parseInt(priceRange[2]);
          return product.price >= minPrice && product.price <= maxPrice;
        }
        
        // "Under" price handling (e.g., "under 500")
        const underPrice = loweredFilterValue.match(/under\s*(\d+)/i);
        if (underPrice) {
          const maxPrice = parseInt(underPrice[1]);
          return product.price <= maxPrice;
        }
        
        // "Above" price handling (e.g., "above 300" or "more than 300")
        const abovePrice = loweredFilterValue.match(/(above|more than)\s*(\d+)/i);
        if (abovePrice) {
          const minPrice = parseInt(abovePrice[2]);
          return product.price >= minPrice;
        }
        
        // "Around" price handling (e.g., "around 400")
        const aroundPrice = loweredFilterValue.match(/around\s*(\d+)/i);
        if (aroundPrice) {
          const targetPrice = parseInt(aroundPrice[1]);
          const minPrice = targetPrice * 0.8; // Within 20% of target
          const maxPrice = targetPrice * 1.2;
          return product.price >= minPrice && product.price <= maxPrice;
        }
        
        // Direct price match (just a number)
        const exactPrice = loweredFilterValue.match(/(\d+)(?!\s*-)/);
        if (exactPrice) {
          const targetPrice = parseInt(exactPrice[1]);
          // Allow some flexibility (within 10% of specified price)
          const minPrice = targetPrice * 0.9;
          const maxPrice = targetPrice * 1.1;
          return product.price >= minPrice && product.price <= maxPrice;
        }
      } else if (filterType === "specs") {
        // RAM filter
        const ramMatch = loweredFilterValue.match(/(\d+)\s*gb\s*ram/i);
        if (ramMatch) {
          const targetRam = ramMatch[1] + "GB";
          return product.specifications?.RAM && 
            product.specifications.RAM.toLowerCase().includes(targetRam.toLowerCase());
        }
        
        // Storage filter
        const storageMatch = loweredFilterValue.match(/(\d+)\s*gb\s*storage/i) || 
                          loweredFilterValue.match(/(\d+)\s*gb/i);
        if (storageMatch && product.specifications) {
          const targetStorage = storageMatch[1] + "GB";
          // Check both Storage and Storage Options fields
          return (product.specifications.Storage && 
                 product.specifications.Storage.toLowerCase().includes(targetStorage.toLowerCase())) ||
                (product.specifications["Storage Options"] && 
                 product.specifications["Storage Options"].toLowerCase().includes(targetStorage.toLowerCase()));
        }
        
        // Brand filter
        if (product.brand && loweredFilterValue.includes(product.brand.toLowerCase())) {
          return true;
        }
        
        // Processor filter
        if (product.specifications?.Processor && 
            loweredFilterValue.includes(product.specifications.Processor.toLowerCase())) {
          return true;
        }
        
        // Display filter
        if (product.specifications?.Display && 
            loweredFilterValue.includes("display") || loweredFilterValue.includes("screen")) {
          return true;
        }
        
        // For any other spec match, try finding keywords in description or specifications
        return product.description.toLowerCase().includes(loweredFilterValue) ||
               Object.values(product.specifications || {}).some(spec => 
                 spec.toString().toLowerCase().includes(loweredFilterValue));
      }
      
      return true; // Default fallback
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const message = input.trim();
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setInput("");
    
    setTimeout(() => {
      handleBotResponse(message);
    }, 300);
  };

  const handleBotResponse = (message) => {
    const lower = message.toLowerCase();

    switch (currentState) {
      case "greeting":
        if (lower.includes("yes") || lower.includes("sure") || lower.includes("help") || lower.includes("ok")) {
          addBotMessage("Great! Which category are you interested in? (Phones, Laptops, Accessories, Cameras)");
          setCurrentState("category");
        } else if (lower.includes("no")) {
          addBotMessage("No problem! Feel free to ask if you need any assistance later.");
        } else {
          // Check if the message already contains category info
          if (lower.includes("phone") || lower.includes("laptop") || lower.includes("accessor") || lower.includes("camera")) {
            // Pass to the category handler directly
            handleCategoryDetection(lower);
          } else {
            // Ask for category
            addBotMessage("Which category are you interested in? (Phones, Laptops, Accessories, Cameras)");
            setCurrentState("category");
          }
        }
        break;
        
      case "category":
        handleCategoryDetection(lower);
        break;
        
      case "filterType":
        if (lower.includes("price") || lower.includes("cost") || lower.includes("budget") || lower.includes("money")) {
          setFilterType("price");
          addBotMessage(`Great! Please tell me your price range for ${selectedCategory}. For example: "under 500", "between 200-400", or "around 300".`);
          setCurrentState("filter");
        } else if (lower.includes("spec") || lower.includes("feature") || lower.includes("detail") || 
                  lower.includes("ram") || lower.includes("storage") || lower.includes("processor") || 
                  lower.includes("brand")) {
          setFilterType("specs");
          addBotMessage(`What specifications are you looking for in ${selectedCategory}? For example: RAM, storage, brand, processor, etc.`);
          setCurrentState("filter");
        } else {
          // Try to determine if they've already included filter information
          if (hasFilterInfo(lower)) {
            // Detect filter type from the message
            if (hasFilterPrice(lower)) {
              setFilterType("price");
              handleFilterInput(lower);
            } else {
              setFilterType("specs");
              handleFilterInput(lower);
            }
          } else {
            addBotMessage("Would you like to filter by price or specifications?");
          }
        }
        break;
        
      case "filter":
        handleFilterInput(lower);
        break;
        
      case "results":
        if (lower.includes("yes") || lower.includes("tell") || lower.includes("more")) {
          addBotMessage("What specific information would you like to know about these products? (Price, specs, availability, etc.)");
        } else if (lower.includes("no") || lower.includes("thank")) {
          addBotMessage("Thank you for using ElectroBot! Feel free to ask if you need anything else.");
          setCurrentState("greeting");
        } else if (lower.includes("restart") || lower.includes("start over") || lower.includes("new search")) {
          addBotMessage("Let's start over. Which category are you interested in? (Phones, Laptops, Accessories, Cameras)");
          setSelectedCategory(null);
          setFilterType(null);
          setCurrentState("category");
        } else if (lower.includes("cheap") || lower.includes("cheapest") || lower.includes("inexpensive") || lower.includes("lowest price")) {
          // Sort results by lowest price first
          const cheapestResults = filterProducts(selectedCategory, filterType, lower)
            .sort((a, b) => a.price - b.price)
            .slice(0, 3); // Get top 3 cheapest
          
          if (cheapestResults.length > 0) {
            addBotMessage(
              `Here are the most affordable ${selectedCategory} based on your criteria:`, 
              "bot-products", 
              cheapestResults
            );
          } else {
            addBotMessage(`I couldn't find any matching products. Would you like to try different criteria?`);
          }
        } else if (lower.includes("best") || lower.includes("recommend") || lower.includes("top") || lower.includes("highest rated")) {
          // Sort results by highest rating first
          const bestResults = filterProducts(selectedCategory, filterType, lower)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3); // Get top 3 rated
          
          if (bestResults.length > 0) {
            addBotMessage(
              `Here are the highest-rated ${selectedCategory} based on your criteria:`, 
              "bot-products", 
              bestResults
            );
          } else {
            addBotMessage(`I couldn't find any matching products. Would you like to try different criteria?`);
          }
        } else {
          // Try to detect if it's a filter refinement
          if (hasFilterInfo(lower)) {
            handleFilterInput(lower);
          } else {
            addBotMessage("Would you like to search for different products or get more details about these ones?");
          }
        }
        break;
        
      default:
        // Try to detect category or filter info in the message
        if (lower.includes("phone") || lower.includes("laptop") || lower.includes("accessor") || lower.includes("camera")) {
          handleCategoryDetection(lower);
        } else if (hasFilterInfo(lower)) {
          addBotMessage("Before we filter products, what category are you interested in? (Phones, Laptops, Accessories, Cameras)");
          setCurrentState("category");
        } else {
          addBotMessage("How can I help you with your shopping today?");
          setCurrentState("greeting");
        }
    }
  };

  // Helper function to handle category detection
  const handleCategoryDetection = (message) => {
    const lower = message.toLowerCase();
    let detectedCategory = null;
    
    if (lower.includes("phone")) {
      detectedCategory = "Phones";
    } else if (lower.includes("laptop")) {
      detectedCategory = "Laptops";
    } else if (lower.includes("accessor")) {
      detectedCategory = "Accessories";
    } else if (lower.includes("camera")) {
      detectedCategory = "Cameras";
    }
    
    if (detectedCategory) {
      setSelectedCategory(detectedCategory);
      
      // Check if the message already includes filter info
      if (hasFilterInfo(lower)) {
        if (hasFilterPrice(lower)) {
          setFilterType("price");
          handleFilterInput(lower);
        } else {
          setFilterType("specs");
          handleFilterInput(lower);
        }
      } else {
        addBotMessage(`Would you like to find ${detectedCategory} based on price or specifications?`);
        setCurrentState("filterType");
      }
    } else {
      addBotMessage("I didn't catch that. Please select from Phones, Laptops, Accessories, or Cameras.");
    }
  };

  // Helper function to check if message has filter information
  const hasFilterInfo = (message) => {
    return hasFilterPrice(message) || hasFilterSpecs(message);
  };

  // Helper to check if message has price filter information
  const hasFilterPrice = (message) => {
    const lower = message.toLowerCase();
    return lower.includes("price") || 
           lower.includes("$") || 
           lower.includes("under") || 
           lower.includes("above") || 
           lower.includes("between") || 
           lower.includes("around") || 
           /\d+/.test(lower);
  };

  // Helper to check if message has spec filter information
  const hasFilterSpecs = (message) => {
    const lower = message.toLowerCase();
    return lower.includes("ram") || 
           lower.includes("gb") || 
           lower.includes("processor") || 
           lower.includes("brand") || 
           lower.includes("storage") || 
           lower.includes("display") || 
           lower.includes("screen") || 
           lower.includes("battery");
  };

  // Handle filter input processing
  const handleFilterInput = (message) => {
    if (!selectedCategory) {
      addBotMessage("Please select a category first: Phones, Laptops, Accessories, or Cameras.");
      setCurrentState("category");
      return;
    }

    const results = filterProducts(selectedCategory, filterType, message);
    
    if (results.length > 0) {
      // Show at most 5 results to avoid overwhelming the user
      const displayResults = results.slice(0, 5);
      
      addBotMessage(
        `I found ${results.length} ${selectedCategory} based on your criteria${results.length > 5 ? " (showing top 5)" : ""}:`, 
        "bot-products", 
        displayResults
      );
      
      setTimeout(() => {
        addBotMessage("Is there anything else you'd like to know about these products?");
        setCurrentState("results");
      }, 500);
    } else {
      addBotMessage(`I couldn't find any ${selectedCategory} matching your criteria. Would you like to try different ${filterType} requirements?`);
    }
  };

  return (
    <div className="chatbot-container">
      <button className={`chatbot-toggle ${isOpen ? "open" : ""}`} onClick={handleToggle}>
        💬
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>ElectroBot</h3>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.sender === "bot-products" ? (
                  <div className="product-list">
                    {msg.data.map((product, i) => (
                      <a 
                        key={i} 
                        href={`/product/${product._id.$oid}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="product-card"
                      >
                        <img src={product.image || "https://via.placeholder.com/80"} alt={product.name} />
                        <div className="product-info">
                          <h4>{product.name}</h4>
                          <p>${product.price}</p>
                          <div className="rating">
                            {"★".repeat(Math.round(product.rating))}
                            {"☆".repeat(5 - Math.round(product.rating))}
                            <span className="stock">{product.stock} in stock</span>
                          </div>
                          <p>
                            {product.specifications?.RAM && `${product.specifications.RAM} RAM`}
                            {product.specifications?.Storage && ` • ${product.specifications.Storage} Storage`}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              autoFocus
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;