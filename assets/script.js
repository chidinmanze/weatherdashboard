var APIKey = "e074a732c29d61e8b30c9a8a8cedfa29";
var cityInput = $("#city");


$("#search").on("click", function() {
    event.preventDefault();
    var city = cityInput.val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    var queryURLFuture = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
   var date = moment().format("MM/DD/YYYY");
   console.log(city);
   
   $.ajax({
       url: queryURL,
       method: "GET"
       
    })
    
    .then(function(response) {
        
        console.log(queryURL);
        console.log(response);
        // $("#results").html("<h2>" + response.name + "</h2>");
        var temp = (response.main.temp - 273.15) * 1.80 + 32;
        var tempRounded = Math.round(temp * 10) / 10;
        
        var queryURLUvi = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
        
        $.ajax({
            url: queryURLUvi,
            method: "GET"
        })
            
            .then(function(response2) { 
                
                console.log(queryURLUvi);
                console.log(response2);

                $("#results").html("<h2>" + response.name + " " + "(" + date + ")" + "</h2>");
                $("#temp").html("<p>" + "Temperature:" + " " + tempRounded + "\xB0F" + "<p>");
                $("#humidity").html("<p>" + "Humidity:" + " " + response.main.humidity + "%" + "<p>");
                $("#windSpeed").html("<p>" + "Wind Speed:" + " " + response.wind.speed + " " + "MPH" + "<p>");
                $("#uvIndex").html("<p>" + "UV Index:" + " " + response2.value + "<p>");

                $.ajax({
                    url: queryURLFuture,
                    method: "GET"
                })

                    .then(function(response3) {
                        console.log(queryURLFuture);
                        console.log(response3); 

                        var day1 = moment().add(1, 'days').format('LL'); 
                        var day2 = moment().add(2, 'days').format('LL'); 
                        var day3 = moment().add(3, 'days').format('LL'); 
                        var day4 = moment().add(4, 'days').format('LL');
                        var day5 = moment().add(5, 'days').format('LL');

                        var temp1 = Math.round((response3.list[3].main.temp - 273.15) * 1.80 + 32)* 10 / 10;
                        var temp2 = Math.round((response3.list[11].main.temp - 273.15) * 1.80 + 32)* 10 / 10;
                        var temp3 = Math.round((response3.list[19].main.temp - 273.15) * 1.80 + 32)* 10 / 10;
                        var temp4 = Math.round((response3.list[27].main.temp - 273.15) * 1.80 + 32)* 10 / 10;
                        var temp5 = Math.round((response3.list[35].main.temp - 273.15) * 1.80 + 32)* 10 / 10;
                        
                       
                        $("#5day").html("<h2>" + "5-Day Forecast" + "</h2>");
                        $("#day1").html("<h5>" + day1 + "</h5>");
                        $("#day2").html("<h5>" + day2 + "</h5>");
                        $("#day3").html("<h5>" + day3 + "</h5>");
                        $("#day4").html("<h5>" + day4 + "</h5>");
                        $("#day5").html("<h5>" + day5 + "</h5>");

                        $("#day1Temp").html("<p>" + "Temp:" + " " + temp1 + "\xB0F" + "<p>");
                        $("#day2Temp").html("<p>" + "Temp:" + " " + temp2 + "\xB0F" + "<p>");
                        $("#day3Temp").html("<p>" + "Temp:" + " " + temp3 + "\xB0F" + "<p>");
                        $("#day4Temp").html("<p>" + "Temp:" + " " + temp4 + "\xB0F" + "<p>");
                        $("#day5Temp").html("<p>" + "Temp:" + " " + temp5 + "\xB0F" + "<p>");

                        
                        $("#day1Humid").html("<p>" + "Humidity:" + " " + response3.list[3].main.humidity + "%" + "<p>");
                        $("#day2Humid").html("<p>" + "Humidity:" + " " + response3.list[11].main.humidity + "%" + "<p>");
                        $("#day3Humid").html("<p>" + "Humidity:" + " " + response3.list[19].main.humidity + "%" + "<p>");
                        $("#day4Humid").html("<p>" + "Humidity:" + " " + response3.list[27].main.humidity + "%" + "<p>");
                        $("#day5Humid").html("<p>" + "Humidity:" + " " + response3.list[35].main.humidity + "%" + "<p>");
                    })   
            })
                
        
    })
    

   
});

 