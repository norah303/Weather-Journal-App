/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '0d6ddc626c12aec9962d9ac05054f5db';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//async function to make GET request

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zip = document.getElementById('zip').value; 
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    getWeather(baseURL, zip, apiKey)

    .then((data) => {
        console.log(data);
        postWeather('/addData', {temperature:data.temp, 
                                date: newDate, 
                                content: feelings})
   
    .then(() =>{ // to update ui
        updateUI ()
        })
    })
}

//async GET
const getWeather = async (baseURL, zip, apiKey) => {
   const res = await fetch(baseURL+zip+',us'+'&APPID='+apiKey)
   
   try{
       const data = await res.json();
       console.log(data);
       return data;
   }catch(error){
       console.log('error ' + error)
   }
}
//async post
const postWeather = async (url = '', data={}) => {
    const req = await fetch(url, {
        method: 'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    });

    try{
        const newData = await req.json();
        return newData
    }catch(error){
        console.log('error ' + error)
    }
}

//UI 
const updateUI = async () => {
    const req = await fetch('/all');
    try{
        const allData = await req.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.content;
    }catch(error){
        console.log('error' + error);
    }
}