import { useState ,useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useUser = ()=>{
    const [user,SetUser]= useState(null);
    const [isLoading,SetIsLoading]= useState(null);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(getAuth(),user=>{
            SetUser(user);
            SetIsLoading(isLoading);
        })
        return unsubscribe;
    },[])
    return {user,isLoading};
}




export default useUser;