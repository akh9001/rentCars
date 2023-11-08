import React, {useState} from "react";
import { BiInfoCircle } from "react-icons/bi";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Car from "../../../Assets/iris 1.png";


export default function TopPlacementsByCategories() {
    
    const data = [
        {
          title: "Cars by revenue",
          items: [
            { name: "S 500 Sedan", price: "320 DH" },
            { name: "S 600 Sedan", price: "350 DH" },
            { name: "S 700 Sedan", price: "380 DH" },
            { name: "S 700 Sedan", price: "380 DH" },
            { name: "S 700 Sedan", price: "380 DH" },
            { name: "S 700 Sedan", price: "380 DH" },
          ],
        },
        {
            title: "Cars by revenue",
            items: [
              { name: "S 500 Sedan", price: "320 DH" },
              { name: "S 600 Sedan", price: "350 DH" },
              { name: "S 700 Sedan", price: "380 DH" },
              { name: "S 700 Sedan", price: "380 DH" },
              { name: "S 700 Sedan", price: "380 DH" },
              { name: "S 700 Sedan", price: "380 DH" },
            ],
          },
          {
            title: "Cars by revenue",
            items: [
              { name: "S 500 Sedan", price: "320 DH" },
              { name: "S 600 Sedan", price: "350 DH" },
              { name: "S 700 Sedan", price: "380 DH" },
              { name: "S 700 Sedan", price: "380 DH" },
              { name: "S 700 Sedan", price: "380 DH" },
              { name: "S 700 Sedan", price: "380 DH" },
            ],
          },
          {
            title: "Cars by revenue",
            items: [
              { name: "S 500 Sedan", price: "320 DH" },
              { name: "S 600 Sedan", price: "350 DH" },
              { name: "S 700 Sedan", price: "380 DH" },
              { name: "S 700 Sedan", price: "380 DH" },
              { name: "S 700 Sedan", price: "380 DH" },
              { name: "S 700 Sedan", price: "380 DH" },
            ],
          },
      ];

    const [carouselIndex, setCarouselIndex] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    const TranslateLeft = () => {
        if (carouselIndex > 0 ) {
           
            setCarouselIndex(carouselIndex - 1);
            setTranslateX(translateX + 600);
          
          }
    };

    const TranslateRight = () => {
        if (carouselIndex < data.length - 3) {
            setCarouselIndex(carouselIndex + 1);
            setTranslateX(translateX - 600);
           
          }
    };

    return(

    <div className=" relative border rounded-2xl border-zinc-400 p-10 my-10 w-full h-68 overflow-hidden">
    
    <div class="absolute top-0 bottom-0 left-0 w-10 z-30 bg-gradient-to-r from-white to-transparent"></div>

        <div className="flex items-center justify-between col-span-6 row-span-1 ">
            <h1 className="font-bold text-xl py-4">Top Performance</h1>
        
            <div className="flex">
            <AiOutlineLeft   size={30}
            className={`border m-1 duration-400 hover:shadow-lg cursor-pointer hover-bg-slate-100 border-black rounded-full p-1 ${
              carouselIndex === 0 ? "opacity-50" : ""
            }`}
            onClick={TranslateLeft}/>

            <AiOutlineRight size={30}
            className={`border m-1 duration-400 hover:shadow-lg cursor-pointer hover-bg-slate-100 border-black rounded-full p-1 ${
              carouselIndex === data.length-3 ? "opacity-50" : ""
            }`}
            onClick={TranslateRight} />
            </div>
        </div>

    <div className={`flex w-fit translate-x-[${translateX}px] transition-transform duration-400 ease-in-out`}>

    {data.map((category, index) => (
          <ul key={index} className="bg-zinc-100 rounded-2xl w-96 p-4 mr-4">
            <h1 className="flex justify-between p-2 items-center font-bold">
              {category.title}
              <BiInfoCircle className="float-right text-zinc-500" />
            </h1>
            {category.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="flex items-center justify-between py-6 px-2 border-t border-zinc-400"
              >
                <img src={Car} alt="car" className="h-12" />
                <p className="font-bold text-lg">{item.name}</p>
                <p className="mr-4 text-zinc-500 font-medium">{item.price}</p>
              </li>
            ))}
          </ul>
        ))}
       </div>
       <div class="absolute top-0 bottom-0 right-0 w-10 z-30 bg-gradient-to-r from-transparent to-white"></div>

    </div>

    );
};
