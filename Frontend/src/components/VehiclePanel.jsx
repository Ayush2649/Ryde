import React from 'react';

const VehiclePanel = (props) => {
    return (
        <div>
             <h5 className="p-1 text-center w-full absolute top-0" onClick={() => {
                    props.setVehiclePanel(false)
                }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
                <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
                <div onClick={() => {
                    props.setConfirmRidePanel(true)
                }} className="flex mb-2 border-2 active:border-black rounded-xl w-full items-center p-3 justify-between">
                    <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png" alt="" />
                    <div className="w-1/2">
                        <h4 className="font-medium text-base">UberGo <span><i className="ri-user-fill"></i>3</span></h4>
                        <h5 className="font-medium text-sm">2 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
                    </div>
                    <h2 className="text-xl font-semibold">{props.fare.car}</h2>
                </div>
                <div onClick={() => {
                    props.setConfirmRidePanel(true);
                }} className="flex mb-2 border-2 active:border-black rounded-xl w-full items-center p-3 justify-between">
                    <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                    <div className="w-[60%]">
                        <h4 className="font-medium text-base">Moto <span><i className="ri-user-fill"></i>1</span></h4>
                        <h5 className="font-medium text-sm">3 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable motorcycle rides</p>
                    </div>
                    <h2 className="text-xl font-semibold">{props.fare.moto}</h2>
                </div>
                <div onClick={() => {
                    props.setConfirmRidePanel(true);
                }} className="flex mb-2 border-2 active:border-black rounded-xl w-full items-center p-3 justify-between">
                    <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                    <div className="w-1/2">
                        <h4 className="font-medium text-base">UberAuto <span><i className="ri-user-fill"></i>2</span></h4>
                        <h5 className="font-medium text-sm">1 mins away</h5>
                        <p className="font-normal text-xs text-gray-600">Affordable auto rides</p>
                    </div>
                    <h2 className="text-xl font-semibold">{props.fare.auto}</h2>
                </div>
        </div>
    )
}

export default VehiclePanel;