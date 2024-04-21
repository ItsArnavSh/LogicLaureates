import { writable } from 'svelte/store';
let ques = [
    ["How often will you need to access your storage?",2,"Frequent Access",["Daily","Weekly","Monthly","Yearly"]],//0 means true false
    ["What city do you prefer for storage",1,"Location"],//1 means an input
    ["What will be your recommended price?",1,"Price"],
    ["Will you need transportation?",0,"Transport"],

];
ques.push(["Let's Find your Space!",0]);
let ans = new Array(ques.length-1).fill(false);
export const question = writable(ques);
export const preference = writable(ans)