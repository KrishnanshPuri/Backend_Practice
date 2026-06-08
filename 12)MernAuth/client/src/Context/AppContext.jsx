import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
export const AppContent = createContext()
import  axios  from "axios";
import { useEffect } from "react";

axios.defaults.withCredentials=true;

export const AppContextProvider = (props)=>{



const backendUrl = import.meta.env.VITE_BACKEND_URL
const [isLogged,setIsLoggedIn]=useState(false);
const [userData, setUserData]=useState(false);



const getUserData = async () => {
    try {
        const { data } = await axios.get(backendUrl + '/api/user/data');
        data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
        toast.error(error.message);
    }
}


useEffect(() => {
    const checkAuthStatus = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
            if (data.success) {
                setIsLoggedIn(true);
                getUserData(); 
            }
        } catch (error) {
           
            console.error("Auth check failed:", error.message); 
        }
    };
    checkAuthStatus();
}, []); 
const value = {
backendUrl,
isLogged,setIsLoggedIn,
userData,setUserData,
getUserData
}
return (
<AppContent.Provider value={value}>
{props.children}
</AppContent.Provider>
)
}
export default AppContextProvider;