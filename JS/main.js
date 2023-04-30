document.querySelectorAll('.nav-link')
for(var i =0 ; i<document.querySelectorAll('.nav-link').length ; i++){
    document.querySelectorAll('.nav-link')[i].addEventListener('click',function(){
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    })
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ['Sunday' , 'Monday' , 'Tuesday' ,'Wednesday', 'Thursday', 'Friday', 'Saturday'];


var inputLocation = document.getElementById('search');

var weatherapi; // kol el api
var final;
async function get(x){
    weatherapi =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${x}&days=3`)
    final = await weatherapi.json();
    date();
    display();
    // var req = new XMLHttpRequest();
    // req.open('Get' , `https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${x}&days=3`)
    // req.send();
    // req.addEventListener('readystatechange' , function(){
    //     if(req.readyState == 4 && req.status == 200){
    //         weatherapi = JSON.parse(req.response); 
    //         date(); 
    //         display();
    //     }
    // })
}



window.addEventListener('load', function(){
     get('cairo');
    
})

inputLocation.addEventListener('input' , function(){
     get(inputLocation.value)
     
   
})


let currentDate ;  
 function date(){
    currentDate = new Date(final.forecast.forecastday[0].date);
}

function display(){
    //today
    document.querySelector('#today .head .day').innerHTML =  days[currentDate.getDay()];
    document.querySelector('#today .head .date').innerHTML = currentDate.getDate() + months[currentDate.getMonth()];
    document.querySelector('#today .weather .country h4').innerHTML = final.location.name;
    document.querySelector('#today .weather .temperature h1').innerHTML = `
        ${final.current.temp_c}  <sup>o</sup>C`

    document.querySelector('#today .weather .condition img').setAttribute('src',`https://${final.current.condition.icon}`) 
    document.querySelector('#today .weather .condition h6').innerHTML = final.current.condition.text;
    

    //tomorrow
    document.querySelector('#tomorrow .head .day').innerHTML = days[(currentDate.getDay()+1)%7];
    document.querySelector('#tomorrow .weather .img  img').setAttribute('src',`https://${final.forecast.forecastday[1].day.condition.icon}`)
    document.querySelector('#tomorrow .weather .max h1').innerHTML = `
    ${final.forecast.forecastday[1].day.maxtemp_c}  <sup>o</sup>C`
    document.querySelector('#tomorrow .weather .min h6').innerHTML = `
    ${final.forecast.forecastday[1].day.mintemp_c}  <sup>o</sup>C`
    document.querySelector('#tomorrow .weather .condition h6').innerHTML = final.forecast.forecastday[1].day.condition.text;

    //after tomorrow
    document.querySelector('#after .head .day').innerHTML = days[(currentDate.getDay()+2)%7];
    document.querySelector('#after .weather .img  img').setAttribute('src',`https://${final.forecast.forecastday[2].day.condition.icon}`)
    document.querySelector('#after .weather .max h1').innerHTML = `
    ${final.forecast.forecastday[2].day.maxtemp_c}  <sup>o</sup>C`
    document.querySelector('#after .weather .min h6').innerHTML = `
    ${final.forecast.forecastday[2].day.mintemp_c}  <sup>o</sup>C`
    document.querySelector('#after .weather .condition h6').innerHTML = final.forecast.forecastday[2].day.condition.text;
}






// sun. 0
// mon. 1
//Tue. 2
//wed. 3
//thu. 4
//fri. 5
//sat. 6


    






