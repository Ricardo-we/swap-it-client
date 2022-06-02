import { AppContext } from "../App";
import { useContext } from "react";

export default function useUser(){
    const { storedUser, setStoredUser } = useContext<any>(AppContext)
    return { storedUser, setStoredUser };
}
