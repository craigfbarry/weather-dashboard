$(document).ready(function(){

var savedCity = localStorage.getItem("savedCity");

if (savedCity != null){
//If any city saved in local storage then display the weather conditions on page refresh.
    currentTemp(savedCity);
    forecast(savedCity);
}

$(".btn").on("click",function(){
    //Determine the city selected by text input or button selection
    var city;
    if($(this).attr("type") == "submit"){
        city = $("#cityInput").val();
    }

    else{
        city = $(this).attr("id");
    }

    currentTemp(city);
    forecast(city);

    localStorage.setItem("savedCity", city);
});



//This function will use ajax to query the API to return weather conditions and display them.
function currentTemp(cityTemp){
    const api_key = "181156e75b504c175179653b4b25401f";
    //API query which is determined by city chosen
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityTemp +"&appid="+ api_key;
    
    $.ajax({
        url:    queryURL,
        method: "GET"
    }).then(function(response){
        var dateToday = moment().format("DD/MM/YYYY");    
        var result = (response.main.temp -273.15).toFixed(1);

    //Display outputs to the city-temperature div
        $("#city-temperature").html("<h3>" + cityTemp + " " + dateToday + "</h3>");
        $("#currentTemp").html("Temperature: " + result + "&#8451;");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + response.wind.speed + "MPH");

    //The UV-index requires an additional AJAX call dependant on latitude and longitude from the previous query
        var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat+"&lon=" + response.coord.lon + "&appid=181156e75b504c175179653b4b25401f";
        $.ajax({
            url:    UVqueryURL,
            method: "GET"
        }).then(function(data){
            console.log(data);
            $("#UV-index").text("UV-index: " + data.value);
        });
    });
}

//This function will use the API to query the 4 day forecast and display to the page
function forecast(cityForecast){

    const api_key = "181156e75b504c175179653b4b25401f";
    var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityForecast + "&appid="+ api_key;
    $.ajax({
        url:    queryForecastURL,
        method:  "GET"
    }).then(function(response){

        //Loop to update the forecast boxes
        for (i=1;i<5;i++){
            $("#forecast"+i).text(moment(response.list[i*5].dt_txt).format("DD/MM/YYYY"));
            $("#forecast"+i).append("<br/>" + response.list[i*5].weather[0].icon);
            $("#forecast"+i).append("<br/>Temp: " + (response.list[i*5].main.temp_max -273.15).toFixed(1) + "&#8451;");
            $("#forecast"+i).append("<br/>Humidity: " + response.list[i*5].main.humidity + "%");
        }
    })  
    }


});
