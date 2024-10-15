const BASE_URL= "https://api.currencyapi.com/v3/latest?apikey=cur_live_Y5GNkm7Wkhf80DD7PSKXlG2oyTwD4ozBxUiAe3hM";

const dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;

        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if 
            (select.name==="to" && currCode==="INR"){
                newOption.selected="selected";      
            }            
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

    const updatedExchangeRate= async ()=>{
    let amount = document.querySelector(".amount input");
    let amountValue= amount.value;
   if(amountValue === "" || amountValue < 1){
        amountValue=1;
        amount.value="1";
    }
    // console.log(fromCurr.value,toCurr.value);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    // const URL=`${BASE_URL}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;


    let response= await fetch(URL);
    // console.log(response);
    let data= await response.json();
    // console.log(data);
    let rate= data[toCurr.value.toLowerCase()];
    // let rate= data.toCurr.value;
     console.log(rate);


    let finalAmount= amountValue * rate;
    
    msg.innerText= `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


    const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}


    button.addEventListener("click",(evt)=>{
    evt.preventDefault();           //stops the page relod and automatic work 
    updatedExchangeRate();
   
});


    window.addEventListener("load",()=>{
    updatedExchangeRate();
});
