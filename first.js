
const menu = document.querySelectorAll('select');
const btn = document.querySelector('button');
let amount = document.querySelector('input');
let cA = document.querySelector('.converted_amount');


let url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_XdmpZXY8Flv2DNfVWXrQ1U1AayCXzqgd3hASFW7I";


for (let drop of menu) {
    for (let code in countryList) {
        let newOption = document.createElement('option');
        newOption.value = code;
        newOption.innerHTML = code;
        if (drop.name === "from" && code === "BDT") {
            newOption.selected = 'selected';
        }

        if (drop.name === "to" && code === "USD") {
            newOption.selected = 'selected';
        }
        drop.append(newOption);
    }
}

let baseCountry = "BDT";
let conCountry = "USD";

for (let drop of menu) {
    drop.addEventListener("change", (evt) => {
        if(drop.name === "from"){
            baseCountry = evt.target.value;
        }
        if(drop.name === "to"){
            conCountry = evt.target.value;
        }
        
    })
}




btn.addEventListener("click", async (event) => {
    event.preventDefault();
    let amountValue = amount.value;

    if (Number(amountValue) < 1) {
        amount.value = "1";
        amountValue = 1;
    }


    let baseURL = `${url}&base_currency=${baseCountry}`;

    let response = await fetch(baseURL);
    let jdata = await response.json();

    let rate = jdata["data"][conCountry]["value"];

    cA.innerHTML = rate*amountValue;
    

})

