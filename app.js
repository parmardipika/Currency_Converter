const BASE_URL=
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const mess=document.querySelector(".msg")

window.addEventListener("load",()=>{
 updateExchangeRate();
})


for(let select of dropdowns){
    for(code in countryList){
        let newOption=document.createElement("option");
        newOption.innerHTML=code;
        newOption.value=code;
        select.append(newOption);
        if(select.name==="from" && code==="USD"){
            newOption.selected="selected";
        }
         else if(select.name==="to" && code==="INR"){
            newOption.selected="selected";
        }
}

select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
});
}

const updateFlag=(element)=>{
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
       
})

const updateExchangeRate= async()=>{
     let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value=1;
    }


    let response=await fetch(BASE_URL);
    let data=await response.json();
    let value_from=data.eur[fromCurr.value.toLowerCase()];
    let to_from=data.eur[toCurr.value.toLowerCase()];
    let res=to_from/value_from;

    let finalres=amtval*res;
    mess.innerText = `${amtval} ${fromCurr.value} = ${finalres} ${toCurr.value}`;
   
}