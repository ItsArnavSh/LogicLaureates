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

        return response.data.data;
        console.log(response.data.data);

    } catch(error){
        console.log(error);
    }
}

export const getPublishedLands = async(token)=>{
    try{    

        const response = await apiConnector("GET", landEndpoints.PublishedLands ,{}, {"Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`}); 


        return response.data.data;

    } catch(error){
        console.log(error);
    }
}

export const getStorageById = async(token , data)=>{
    try{

        const  response = await apiConnector("PUT", landEndpoints.getStorageById + `/${data.id}` , data , {"Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`});
        console.log(response);
        return response.data.data;

    } catch(error){
        console.log(error);
    }

}