import React from 'react';

const CaptainDetails = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-3">
                    <img className="h-10 w-10 rounded-full object-cover" src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww" alt="" />
                    <h4 className="text-lg font-medium">Harshad Mehta</h4>
                </div>
                <div>
                    <h4 className="text-xl font-semibold">₹457.28</h4>
                    <p className="text-sm font-medium text-gray-600">Earned</p>
                </div>
            </div>
            <div className="flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start">
                <div className="text-center">
                <i className="text-3xl mb-3 font-thin ri-time-line"></i>
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>
                <div className="text-center">
                <i className="text-3xl mb-3 font-thin ri-speed-up-line"></i>
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>
                <div className="text-center">
                <i className="text-3xl mb-3 font-thin ri-booklet-line"></i>
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails;