$(document).ready(function(){




$(".btn").on("click",function(){
    var city = "sydney";
    console.log(city);
    var api_key = "181156e75b504c175179653b4b25401f";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&forecast?q=" 
    + city + "&appid="+ api_key;
    $.ajax({
        url:    queryURL,
        method: "GET"
    }).then(function(response){
        var result = response.main.temp -273.15;
        var humidity = response.main.humidity;
        var wind = response.wind.speed;

        console.log(result);
        console.log(humidity+" %");
        console.log("Wind Speed:" + wind + "MPH")
    });

});



});
