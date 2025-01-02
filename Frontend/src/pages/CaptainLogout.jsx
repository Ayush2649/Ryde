import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const logoutCaptain = async () => {
            if (!token) {
                navigate("/captain-login");
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captains/logout`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    localStorage.removeItem("token");
                    navigate("/captain-login");
                }
            } catch (error) {
                console.error("Error during logout:", error);
                // Optionally handle logout errors, such as showing a notification.
            }
        };

        logoutCaptain();
    }, [token, navigate]);

    return <div className="home">Logging out...</div>;
};

export default CaptainLogout;
