import React, { useState } from "react";
import { TbBrandNeteaseMusic } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import welcomeimg from "../../assets/welcomepageimg/wlcm4.png";
import Signup from "./Signup";
import Signin from "./Signin";

const WelcomeInterface = ({ mera}) => {
  // const [signn,Setsignn] = useState()
  // const a = () => {
  //   mera
  // }

  const [clickme , setClickme]= useState(false)

const getit=()=>{
  setClickme(true)
}

  const a = () => {
    mera(true);
  };


  return (
    <div className={"bg-black  min-h-screen flex  justify-center items-center  "  } >
      <div className=" ">
        <div className="flex justify-center items-center flex-col gap-7" > 

          <div >
              <h1 className="text-white text-6xl font-bold "><span className="text-red-600">F</span><span className="animate-pulse">eel</span> <span className="animate-pulse">The</span> <span className="animate-pulse">Beat</span></h1>
          </div>

          <div className="flex">
            <h1 className="text-red-600 text-4xl font-bold animate-bounce ">.</h1>
            <h1 className="text-white text-3xl font-bold animate-pulse">|</h1>
            <h1 className="text-red-600 text-4xl font-bold animate-bounce">.</h1>
            <h1 className="text-white text-3xl font-bold animate-pulse">|</h1>
            <h1 className="text-red-600 text-4xl font-bold animate-bounce">.</h1>
         </div>




             


          <div className=''>
            <Signup tosignup={a}/>
            
          </div>
           
        
        </div>



        {/* signup */}
       
      </div>
    </div>
  );
};

export default WelcomeInterface;
