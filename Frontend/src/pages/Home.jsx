import React, { useRef, useState } from "react";
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
    const [pickUp, setPickUp] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
    }

    useGSAP(function() {
        if(panelOpen){
            gsap.to(panelRef.current, {
                height: '75%',
                padding: 24
                // opacity: 1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                // opacity: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])

    return (
        <div className="h-screen relative overflow-hidden">
            <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"/>
            <div className="h-screen w-screen">
            <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"/>
            </div>
            <div className="flex flex-col justify-end h-screen absolute top-0 w-full ">
                <div className="h-[25%] p-5 bg-white relative">
                    <h5 
                    ref={panelCloseRef}
                    onClick={() => setPanelOpen(false)}
                    className="absolute opacity-0 right-6 top-6 text-2xl">
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-3xl font-bold">Find a trip</h4>
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className="line absolute h-16 w-1 top-[60%] -translate-y-1/2 left-10 bg-gray-700 rounded-full"></div>
                        <input 
                        onClick={() => setPanelOpen(true)}
                        value={pickUp}
                        onChange={(e) => setPickUp(e.target.value)}
                        className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5" 
                        type="text" 
                        placeholder="Add a pick-up location" 
                        />
                        <input 
                        onClick={() => setPanelOpen(true)}
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3" 
                        type="text" 
                        placeholder="Enter your destination" 
                        />
                    </form>
                </div>
                <div ref={panelRef} className="bg-white h-0">
                    <LocationSearchPanel />
                </div>
            </div>
            <div className="fixed z-10 bottom-0 bg-white w-full px-3 py-8 translate-y-full">
                <h4 className="text-2xl font-semibold mb-5">Choose a Vehicle</h4>
                <div className="flex mb-2 border-2 active:border-black rounded-xl w-full items-center p-3 justify-between">
                    <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png" alt="" />
                    <div className="w-1/2">
                        <h4 className="font-medium text-base">UberGo <span><i className="ri-user-fill"></i>3</span></h4>
                        <h5 className="font-medium text-sm">2 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
                    </div>
                    <h2 className="text-xl font-semibold">$20</h2>
                </div>
                <div className="flex mb-2 border-2 active:border-black rounded-xl w-full items-center p-3 justify-between">
                    <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                    <div className="w-1/2">
                        <h4 className="font-medium text-base">Moto <span><i className="ri-user-fill"></i>1</span></h4>
                        <h5 className="font-medium text-sm">3 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable motorcycle rides</p>
                    </div>
                    <h2 className="text-xl font-semibold">$10</h2>
                </div>
                <div className="flex mb-2 border-2 active:border-black rounded-xl w-full items-center p-3 justify-between">
                    <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                    <div className="w-1/2">
                        <h4 className="font-medium text-base">UberAuto <span><i className="ri-user-fill"></i>2</span></h4>
                        <h5 className="font-medium text-sm">1 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable auto rides</p>
                    </div>
                    <h2 className="text-xl font-semibold">$15</h2>
                </div>
            </div>
        </div>
    )
}

export default Home; 