import { apiConnector } from "../apiConnector";
import { landEndpoints } from "../apis";

export const createLand= async(token , data)=>{
    try{

        const response = await apiConnector("POST", landEndpoints.createLand , data, {"Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`});

        console.log("Created successfully");
        

    } catch(error){
        console.log(error);
    }
}

export const pendingProperties = async(token)=>{
    try{

        const response = await apiConnector("GET", landEndpoints.getPendingLands ,{}, {"Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`});

        return response;
    } catch(error){
        console.log(error);
    }
}