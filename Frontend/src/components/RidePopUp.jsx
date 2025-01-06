import React, { useRef, useState } from 'react';

const RidePopUp = (props) => {

    return (
        <div>
            <h5 className="p-1 text-center w-full absolute top-0" onClick={() => {
                props.setRidePopUpPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
            <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
            <div className='flex items-center justify-between p-3 mt-4 bg-gray-100 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className="h-12 w-12 rounded-full object-cover " src="https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg" alt="" />
                    <h2 className='text-lg font-medium'>Akshita Patel</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className="flex gap-2 justify-between flex-col items-center">
                <div className="w-full mt-5">
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-2xl ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">Kaikondrahalli, Bangaluru, Karnataka</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-2xl ri-map-pin-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">Third Wave Coffee</h3>
                            <p className="text-sm -mt-1 text-gray-600">Airport, Bangaluru, Karnataka</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                        <i className="text-2xl ri-money-rupee-circle-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹193.20</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {

                }} className="w-full mt-1 bg-green-600 text-white font-semibold p-2 rounded-lg">Confirm</button>
                <button onClick={() => {
                    props.setRidePopUpPanel(false)
                }} className="w-full mt-1 bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg">Ignore</button>
            </div>
        </div>
    )
}

export default RidePopUp;