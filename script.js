$(document).ready(function(){




$(".btn").on("click",function(){
    var city = "Sydney";
    console.log(city);
    var api_key = "181156e75b504c175179653b4b25401f";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&forecast?q="
    + city + "&appid="+ api_key;
    $.ajax({
        url:    queryURL,
        method: "GET"
    }).then(function(response){
        var dateToday = moment().format("DD/MM/YYYY");    
        var result = (response.main.temp -273.15).toFixed(1);


        $("#city-temperature").html("<h3>" + city + " " + dateToday + "</h3>");
        $("#currentTemp").html("Temperature: " + result + "&#8451;");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + response.wind.speed + "MPH");

        var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat+"&lon=" + response.coord.lon + "&appid=181156e75b504c175179653b4b25401f";
        $.ajax({
            url:    UVqueryURL,
            method: "GET"
        }).then(function(data){
            console.log(data);
            $("#UV-index").text("UV-index: " + data.value);
        });
       
    });

});



});
