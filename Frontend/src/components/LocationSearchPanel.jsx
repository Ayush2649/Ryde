import React from 'react';

const LocationSearchPanel = (props ) => {

    // Sample array for locations
    const locations = [
        "24B, Street 1, Block 1, Area 1, Dhaka, Bangladesh",
        "23A, Street 7, Block 15, Area 2, Mumbai, India",
        "12C, Street 3, Block 5, Area 3, Karachi, Pakistan",
        "15D, Street 5, Block 2, Area 4, Colombo, Sri Lanka",
    ]

    return (
        <div>
            {
                locations.map(function(elem){
                    return <div onClick={() => {
                        props.setVehiclePanel(true);
                    }}
                    className='border-2 p-3 border-gray-50 active:border-black rounded-xl gap-4 flex items-center my-2 justify-start'>
                    <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill"></i></h2>
                    <h4 className='text-lg font-semibold'>{elem}</h4>
                </div>
                })
            }
        </div>
    )
}

export default LocationSearchPanel;