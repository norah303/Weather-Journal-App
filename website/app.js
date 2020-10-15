/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=0d6ddc626c12aec9962d9ac05054f5db';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);

function performAction(){
    const zip = document.getElementById('zip').value; 
    const content = document.getElementById('feelings').value;

    getWeather(baseURL, zip, apiKey)

    .then((data) => {
        console.log(data);
        postWeather('/add', {temperature: data.temperature, 
                                date: newDate, 
                                content})
   
    .then(() =>{ // to update ui 
        updateUI ()
        })
    })
}

//async GET
const getWeather = async (baseURL, zip, apiKey) => {
   const res = await fetch(baseURL + zip + apiKey)
   
   try{
       const data = await res.json();
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
        body: JSON.stringify({
            date: data.date,
            temperature: data.temperature,
            content: data.content
        })
    })

    try{
        const newData = await req.json();
        return newData
    }
    catch(error){
        console.log('error ' + error)
    }
};

//UI 
const updateUI = async () => {
    const req = await fetch('/all');
    try{
        const allData = await req.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.content;
    }
    catch(error){
        console.log('error' + error);
    }
};