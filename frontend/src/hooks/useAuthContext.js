import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext";



export const useAuthContext =()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw Error('useAuthContext must bbe used inside an AuthContextProvider')

    }
    return context
}