

window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.getElementById('tempDescription')
    let temperatureDegree = document.getElementById('tempDegree')
    let timeZone = document.getElementById('locationTimezone')
    let degreeSection = document.querySelector('.degree-section')
    let temperatureUnit = document.querySelector('.degree-section span')
    let searchLocation = document.getElementById('searchLocation')
    let search = document.getElementById('search')
    let locateMe = document.getElementById('locateMe')
    let feels = document.getElementById('feelsLike')
    const myKey = "6b7f3bbf8a9b5e1c6a25462fd33882d2"
    
    locateMe.addEventListener('click', ()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position=>{
                console.log(position)
                long = position.coords.longitude
                lat = position.coords.latitude
                // lat = 25.2048
                // long = 55.2708
                
                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${myKey}`;
                locating(api, temperatureDescription, temperatureDegree, timeZone, degreeSection, temperatureUnit, feels)
            })
        }
    })

    
    search.addEventListener('click', ()=>{
        console.log(searchLocation.value)
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation.value}&appid=${myKey}`
        locating(api, temperatureDescription, temperatureDegree, timeZone, degreeSection, temperatureUnit, feels)
    })

    function locating(api, temperatureDescription, temperatureDegree, timeZone, degreeSection, temperatureUnit, feels){
        fetch(api)
                .then(response =>{
                    return response.json();
                }).then(data =>{
                    console.log(data);
                    if(data.cod==="404") alert("Location Not Found, Try Again")
                    else{
                    const {temp, feels_like} = data.main;
                    const {main} = data.weather[0];
                    
                    let temperature = Math.floor(temp-273.15)
                    temperatureDegree.innerText = temperature
                    temperatureDescription.innerText = main
                    timeZone.innerText = data.name
                    feels.innerText ="Feels Like: "+ Math.floor(feels_like-273.15) + "°C"
                    temperatureInFahren =  Math.floor((temperatureDegree.innerText * 1.8) + 32)
                    //Change unit
                    degreeSection.addEventListener('click', () =>{
                        if(temperatureUnit.textContent === "°F"){
                            temperatureUnit.textContent = "°C"
                            temperatureDegree.textContent = temperature
                        }else{
                            temperatureDegree.innerText =  temperatureInFahren
                            temperatureUnit.textContent = "°F"
                        }
                    })
                }
                    
                })
            
    }
})

   
 
    


// https://api.openweathermap.org/data/2.5/weather?lat=10.9364469&lon=75.9811564&appid=6b7f3bbf8a9b5e1c6a25462fd33882d2