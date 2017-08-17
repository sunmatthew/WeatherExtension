function convertToC (temp) {
	return (temp - 32) * (5 / 9);
}

document.getElementById("getWeather").addEventListener("click", function () {
	var location = document.getElementById("location").value;

	var key = "AIzaSyCb1Q1utOihFdF2kKCXCtoRqvNh1gjR2fw";
	var formatLocation = location.replace(" ", "+");
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + formatLocation + "&key=" + key;

	$.ajax({
		url:url,
		dataType:'json',
		type:'get',
		success:function(response) {
			console.log(response);
			var long = response.results[0].geometry.location.lat; 
			var lat = response.results[0].geometry.location.lng; 
			makeApiCall(long, lat);
		},
		error: function(reponse) {
			console.log("Error");
			alert("Invalid input!!");
		}
	});
});
function getCoordinates () {
	
}

function makeApiCall (long, lat) {
	var key = "6ef25e7ed996f89cc54073911a1e67d0";
	var url = "https://api.darksky.net/forecast/" + key + "/" + long + "," + lat;
	$.ajax({
        url: url,
        dataType:'jsonp',
        type: 'get',
        success:function(response){
        	$("#weatherFindings").show();
        	console.log(response);
        	document.getElementById("weather").textContent=response.currently.summary;
        	document.getElementById("temp").textContent=Math.round(convertToC(response.currently.apparentTemperature));
        	document.getElementById("clouds").textContent=response.currently.cloudCover;
        	document.getElementById("humid").textContent=response.currently.humidity;
        	document.getElementById("rain").textContent=response.currently.precipProbability;
        	document.getElementById("wind").textContent=response.currently.windSpeed;
        },
        error: function(response) {
        	console.log("Error");
        	alert("Invalid input!");
        }
    });
}