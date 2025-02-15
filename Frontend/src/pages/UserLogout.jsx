import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            if (!token) {
                navigate("/user-login");
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users/logout`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    localStorage.removeItem("token");
                    navigate("/user-login");
                }
            } catch (error) {
                console.error("Error during logout:", error);
                // Optionally handle logout errors, such as showing a notification.
            }
        };

        logoutUser();
    }, [token, navigate]);

    return <div className="home">Logging out...</div>;
};

export default UserLogout;
