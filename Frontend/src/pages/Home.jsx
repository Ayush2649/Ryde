import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";

const Home = () => {
    const [pickUp, setPickUp] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false); // Default to open
    const [vehiclePanel, setVehiclePanel] = useState(false); // Ensure default is false
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);

    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
    };

    useGSAP(() => {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: "75%",
                padding: 24,
            });
            gsap.to(panelCloseRef.current, {
                opacity: 1,
            });
        } else {
            gsap.to(panelRef.current, {
                height: "0%",
                padding: 0,
            });
            gsap.to(panelCloseRef.current, {
                opacity: 0,
            });
        }
    }, [panelOpen]);

    useGSAP(() => {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [vehiclePanel]);

    useGSAP(() => {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [confirmRidePanel]);

    useGSAP(() => {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [vehicleFound]);

    return (
        <div className="h-screen relative overflow-hidden">
            <img
                className="w-16 absolute left-5 top-5"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
                alt="Uber Logo"
            />
            <div className="h-screen w-screen">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="Background"
                />
            </div>
            <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
                <div className="h-[25%] p-5 bg-white relative">
                    <h5
                        ref={panelCloseRef}
                        onClick={() => setPanelOpen(false)}
                        className="absolute opacity-0 right-6 top-6 text-2xl"
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-3xl font-bold">Find a trip</h4>
                    <form onSubmit={submitHandler}>
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
                    <LocationSearchPanel
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                    />
                </div>
            </div>
            <div
                ref={vehiclePanelRef}
                className="fixed z-10 bottom-0 bg-white w-full px-3 py-6 pt-12 translate-y-full"
            >
                <VehiclePanel
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>
            <div
                ref={confirmRidePanelRef}
                className="fixed z-10 bottom-0 bg-white w-full px-3 py-6 pt-12 translate-y-full"
            >
                <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
            </div>
            <div
                ref={vehicleFoundRef}
                className="fixed z-10 bottom-0 bg-white w-full px-3 py-6 pt-12 translate-y-full"
            >
                <LookingForDriver setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
            </div>
        </div>
    );
};

export default Home;
