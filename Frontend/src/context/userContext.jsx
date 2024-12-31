import React from "react";

export const UserDataContext = React.createContext();

const UserContext = ({children}) => {

    const [user, setUser] = useState({
        email: "",
        fullname: {
            firstname: "",
            lastname: ""
        }
    });

    return (    
        <div>
            <UserDataContext.Provider>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext;