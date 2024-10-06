import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function PrivateRoute() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    //const [userAuthenticated, setUserAuthenticated] = useState(false);

    useEffect(() => {

        const authenticateToken = async () => {
            try {
                const res = await fetch('/api/auth/authenticateToken', {
                    method: 'POST',
                });
                const data = await res.json();
                if (!res.ok) {
                    dispatch(signoutSuccess());
                    
                } 
                if (res.ok) {
                    //
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (currentUser) {
            authenticateToken();
        }
        
    }, [currentUser]);  

return currentUser ? <Outlet /> : <Navigate to='/sign-in' />
}