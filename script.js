$(document).ready(function(){

var savedCity = localStorage.getItem("savedCity");

if (savedCity != null){
//If any city saved in local storage then display the weather conditions on refresh.
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
        $("#cityInput").val('');
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
        
    //Display outputs to the city-temperature div including conditions icons see resource https://openweathermap.org/weather-conditions
        $("#city-temperature").html("<h3>" + cityTemp + " " + dateToday + "</h3><img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png' alt='conditions' height='40'>");
        $("#currentTemp").html("Temperature: " + result + "&#8451;");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + (response.wind.speed*1.60934).toFixed(1) + " km/h");

    //The UV-index requires an additional AJAX call dependant on latitude and longitude from the previous query
        var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat+"&lon=" + response.coord.lon + "&appid=181156e75b504c175179653b4b25401f";
        $.ajax({
            url:    UVqueryURL,
            method: "GET"
        }).then(function(data){
                
                $("#UV-index").text("UV-index: ");
                $("#UV-index").append("<div id='UV-result' class='px-2 ml-2 rounded-lg text-white'>")
                if(data.value >= 10){
                    $("#UV-result").addClass("index-extreme");
                }
                else if(data.value >= 8){
                    $("#UV-result").addClass("bg-danger");
                }
                else if(data.value >= 6){
                    $("#UV-result").addClass("index-high");
                }
                else if(data.value >= 4){
                    $("#UV-result").addClass("bg-warning");
                }
                else {
                    $("#UV-result").addClass("bg-success");
                }

                $("#UV-result").text(data.value);


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
            //set the increment in the forecast response array to take values 8,16,24,32 which will be 24 hours increment
            //from the time of the query.
            
            
            $("#forecast"+i).text(moment(response.list[i*8].dt_txt).format("DD/MM/YYYY"));
            $("#forecast"+i).append("<br/><img src='http://openweathermap.org/img/wn/" + response.list[i*8].weather[0].icon + "@2x.png' alt='conditions' height='30'>");
            $("#forecast"+i).append("<br/>Temp: " + (response.list[i*8].main.temp_max -273.15).toFixed(1) + "&#8451;");
            $("#forecast"+i).append("<br/>Humidity: " + response.list[i*8].main.humidity + "%");
        }
    })  
    }


});
