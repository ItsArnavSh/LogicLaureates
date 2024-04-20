import { writable } from 'svelte/store';
let ques = [
    ["Will you need to access the storage frequently?",0,"Frequent Access"],//0 means true false
    ["What city do you prefer for storage",1,"Location"],//1 means an input
    ["What will be your recommended price per day?",1,"Price"],
    ["Will you need transportation?",0,"Transport"],

];
ques.push(["Let's Find your Space!",0]);
let ans = new Array(ques.length-1).fill(false);
export const question = writable(ques);
export const preference = writable(ans)