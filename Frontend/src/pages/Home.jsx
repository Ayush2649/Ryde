import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const Home = () => {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false); // Default to open
    const [vehiclePanel, setVehiclePanel] = useState(false); // Ensure default is false
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null);

    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);

    const {socket} = useContext(SocketContext)
    const {user} = useContext(UserDataContext)

    useEffect(() => {
        socket.emit("join", {userType : "user", userId : user._id})
    }, [user])

    const fetchSuggestions = async (input, type) => {
        try {
            // console.log("Fetching suggestions for:", input); // Debugging
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                {
                    params: { input },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // Update suggestions based on the type
            if (type === "pickup") {
                setPickupSuggestions(response.data.suggestions || []);
            } else if (type === "destination") {
                setDestinationSuggestions(response.data.suggestions || []);
            }
        } catch (error) {
            // console.error("Error fetching suggestions:", error);
            // alert("Failed to fetch suggestions. Check your network or backend.");
        }
    };

    const handleInputChange = (e, type) => {
        const value = e.target.value;
        if (type === "pickup") {
            setPickup(value);
            setActiveField("pickup");
        } else if (type === "destination") {
            setDestination(value);
            setActiveField("destination");
        }
        if (value.trim() !== "") {
            fetchSuggestions(value, type);
        } else {
            if (type === "pickup") setPickupSuggestions([]);
            if (type === "destination") setDestinationSuggestions([]);
        }
    };

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

    useGSAP(() => {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [waitingForDriver]);

    async function findTrip() {
        try {
          setVehiclePanel(true);
          setPanelOpen(false);
      
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
            {
              params: { pickup, destination },
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
      
          console.log(response.data);
          setFare(response.data.fare);
        } catch (error) {
          console.error("Error fetching fare:", error);
          alert("Failed to fetch trip details. Please try again later.");
        }
      } 

      async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers : {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        console.log(response.data);
      }

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
                <div className="h-[35%] p-6 bg-white relative">
                    <h5
                        ref={panelCloseRef}
                        onClick={() => setPanelOpen(false)}
                        className="absolute opacity-0 right-6 top-6 text-2xl"
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-3xl font-bold">Find a trip</h4>
                    <form onSubmit={submitHandler}>
                        <div className="line absolute h-16 w-1 top-[52%] -translate-y-1/2 left-10 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => setPanelOpen(true)}
                            value={pickup}
                            onChange={(e) => handleInputChange(e, "pickup")}
                            className="bg-[#eee] px-12 py-2 text-medium rounded-lg w-full mt-3"
                            type="text"
                            placeholder="Add a pick-up location"
                        />
                        <input
                            onClick={() => setPanelOpen(true)}
                            value={destination}
                            onChange={(e) => handleInputChange(e, "destination")}
                            className="bg-[#eee] px-12 py-2 text-medium rounded-lg w-full mt-3"
                            type="text"
                            placeholder="Enter your destination"
                        />
                    </form>
                    <button onClick={findTrip}
                    className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">Find Trip</button>
                </div>
                <div ref={panelRef} className="bg-white h-0">
                <LocationSearchPanel
                        suggestions={
                            activeField === "pickup" ? pickupSuggestions : destinationSuggestions
                        }
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>
            <div ref={vehiclePanelRef} className="fixed z-10 bottom-0 bg-white w-full px-3 py-6 pt-12 translate-y-full" >
                <VehiclePanel setVehicleType={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
            </div>
            <div ref={confirmRidePanelRef} className="fixed z-10 bottom-0 bg-white w-full px-3 py-6 pt-12 translate-y-full">
                <ConfirmRide 
                    createRide={createRide}
                    pickup = {pickup}
                    destination = {destination}
                    fare = {fare}
                    vehicleType = {vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
            </div>
            <div ref={vehicleFoundRef} className="fixed z-10 bottom-0 bg-white w-full px-3 py-6 pt-12 translate-y-full">
                <LookingForDriver 
                 createRide={createRide}
                 pickup = {pickup}
                 destination = {destination}
                 fare = {fare}
                 vehicleType = {vehicleType}
                 setVehicleFound={setVehicleFound}/>
            </div>
            <div ref={waitingForDriverRef} className="fixed z-10 bottom-0 bg-white w-full px-3 py-6 pt-12 translate-y-full" >
                <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
            </div>
        </div>
    );
};

export default Home;
