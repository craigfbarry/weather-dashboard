$(document).ready(function(){

//localStorage.getItem("savedCity");










$(".btn").on("click",function(){
    //Determine the city selected

    var city = $(this).attr("id");
    console.log(city);
    const api_key = "181156e75b504c175179653b4b25401f";
    //API query which is determined by city chosen
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&forecast?q="
    + city + "&appid="+ api_key;
    var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid="+ api_key;
    $.ajax({
        url:    queryURL,
        method: "GET"
    }).then(function(response){
        var dateToday = moment().format("DD/MM/YYYY");    
        var result = (response.main.temp -273.15).toFixed(1);

    //Display outputs to the city-temperature div
        $("#city-temperature").html("<h3>" + city + " " + dateToday + "</h3>");
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

    $.ajax({
        url:    queryForecastURL,
        mthod:  "GET"
    }).then(function(response){

        //var forecastDay = $("div");



        //$("#5-day-forecast").append(forecastDay)
        console.log(response.list[2].dt_txt);
        console.log(response.list[2].weather[0].icon);
        console.log(response.list[2].main.temp_max);
        console.log(response.list[2].main.humidity);

    
    })

//localStorage.setItem("savedCity"+ city);
});



});
