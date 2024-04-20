import { writable } from 'svelte/store';

let loginToken;

if(typeof window !== 'undefined'){
    loginToken = localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')) :null
}
export const token = writable(loginToken);
export const user = writable(null);
