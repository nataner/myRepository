
//this program fetch data from openweathermap.org and shows the weather at Dhaka

var mykey = "";


function API_submit() {
    
	mykey = document.getElementById("mySubmit").value;
	document.getElementById("form").style.visibility = "hidden";
	getWeather();
	
}

function getWeather(){
	
	document.getElementById("loader").style.visibility = "visible";
	
	const city_name = "dhaka";
	var API = mykey;
	
	const URL = "http://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&APPID=" + mykey;
	
	//fetching the json data
	async function getData()
	{
			const response = await fetch(URL);
			const data = await response.json();
			
			console.log(data);
			
			renderData(data);
			
	}
	
	//after fetching the data render it on the widget
	function renderData(data)
	{
		if(data.cod == 401)
		{
			alert("invalid API key");
		}
		
		document.getElementById("city").innerHTML = data.name;
		document.getElementById("temp").innerHTML = celciusConvert(data.main.temp);
		
		document.getElementById("iconsrc").src = "http://openweathermap.org/img/wn/"+ data.weather[0].icon +"@2x.png"; 
		
		
		document.getElementById("speed").innerHTML = speedConvert(data.wind.speed);
		document.getElementById("description").innerHTML = data.weather[0].description;
		
		//after all the data is ready hide the loading spinner and show the weather
		document.getElementById("loader").style.visibility = "hidden";
		document.getElementById("container").style.visibility = "visible";
	}
	
	//converts temperature from kelvin to celcius
	function celciusConvert(temp)
	{
		return (Math.floor((temp-273.15)));
	}
	
	//converts speed from m/s to km/h
	function speedConvert(wind)
	{
		return (Math.round(100*(wind*3.6))/100);
	}
	
	getData();	
}