import {apiConnector} from '../apiConnector';
import {authEndpoints} from '../apis';
import {token , user} from '../../writeables/authWriteables'
import {goto} from '$app/navigation';
import {toasts} from 'svelte-toasts'


export const loginApi = async (email, password) => {
    try{

        const response = await apiConnector("POST" , authEndpoints.login , {email , password});

        localStorage.setItem('token', response.data.token);
        token.set(response.data.token);
        user.set(response.data.user);

        toasts.success("Logged in");

        if(response.data.user.accountType === 'Admin'){
            goto('/Admin');
        }
        else if(response.data.user.accountType === 'Renter'){
            goto('/user-dashboard');
        }
        else{
            goto('/storage-owner-dashboard');
        }        

    } catch(error){
        toasts.error(error.message);
        console.log(error);
    }
}

export const loginTokenApi = async(token)=>{
    try{

        const response = await apiConnector("GET" , authEndpoints.loginToken , {} , {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        user.set(response.data.user); 

        return response

    } catch(error){
        logout();
        console.log(error);
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    token.set(null);
    user.set(null);
    goto('/Login');
}

export const sendOtp = async (email) => {
    try{

        const response = await apiConnector("POST" , authEndpoints.sendOtp , {email});
        console.log(response);

    } catch(error){
        console.log(error);
    }
}

export const signup = async (data) => {
    try{
            const response = await apiConnector("POST" , authEndpoints.signup , data);
            console.log(response);

            goto('/Login');

    } catch(error){
        console.log(error);
    }
}