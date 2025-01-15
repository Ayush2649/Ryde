import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {

    const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)

    const ridePopUpPanelRef = useRef(null)
    const ConfirmRidePopUpPanelRef = useRef(null)

    const {socket} = useContext(SocketContext)
    const {captain} = useContext(CaptainDataContext)

    useEffect(() => {
        socket.emit('join', {
            userId : captain._id,
            userType : 'captain'
        })

        const updateLocation = () => {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId : captain._id,
                        location: {
                            ltd : position.coords.latitude,
                            lng : position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()
    })

    useGSAP(() => {
        if (ridePopUpPanel) {
            gsap.to(ridePopUpPanelRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(ridePopUpPanelRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [ridePopUpPanel]);

    useGSAP(() => {
        if (confirmRidePopUpPanel) {
            gsap.to(ConfirmRidePopUpPanelRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(ConfirmRidePopUpPanelRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [confirmRidePopUpPanel]);

    return (
        <div className="h-screen">
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
                <Link to="/captain-login" className="bg-white rounded-full flex items-center justify-center h-10 w-10">
                <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-3/5">
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className="h-2/5 p-6">
                <CaptainDetails />
            </div>
            <div ref={ridePopUpPanelRef} className="fixed z-10 bottom-0 bg-white w-full px-3 py-6 pt-12 translate-y-full">
                <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
            </div>
            <div ref={ConfirmRidePopUpPanelRef} className="fixed z-10 bottom-0 bg-white h-screen w-full px-3 py-6 pt-12 translate-y-full">
                <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
            </div>
        </div>
    )
}

export default CaptainHome;