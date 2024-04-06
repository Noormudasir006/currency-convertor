#! /usr/bin/env node

import inquirer from "inquirer";
let apiLink = "https://v6.exchangerate-api.com/v6/943bcef9fe03e8df50f80b83/latest/pkr";
let fetchData = async(data: any) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates
}
let data = await fetchData(apiLink)
let countries = Object.keys(data)
 let first_currency = await inquirer.prompt({
    name: "name",
    type: "list",
    choices: countries,
    message: "converting from"
 })
 let user_amount = await inquirer.prompt({
    name: "money",
    type: "number",
    message: `please enter amount in ${first_currency.name}` 
 })
 
 let second_currency = await inquirer.prompt({
    name: "name",
    type: "list",
    choices: countries,
    message: "converting to"
 })
 
 let conversion = `https://v6.exchangerate-api.com/v6/943bcef9fe03e8df50f80b83/pair/${first_currency.name}/${second_currency.name}`;


 let convertedData = async(data: any) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate
}
let converting = await convertedData(conversion)
let result = user_amount.money * converting
console.log(result);
