var APIKey = "e074a732c29d61e8b30c9a8a8cedfa29";
var cityInput = $("#city");

nameList();

for ( i=0 ; i < localStorage.length; i++ ) { 
   if(localStorage.getItem(localStorage.key(i)) == "last"){
       openWeatherCall(localStorage.key(i));
   }

       
}

$("#search").on("click", function() {
    event.preventDefault();
    var city = cityInput.val();
    openWeatherCall(city);
   });

function openWeatherCall(city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    var queryURLFuture = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    var date = moment().format("MM/DD/YYYY");
    console.log(city);
      
    $.ajax({
        url: queryURL,
        method: "GET"
        
    })
    
    .then(function(response) {
        
       localStorage.setItem(response.name, " ");
        nameList();
        setLast(response.name);
     
        var temp = (response.main.temp - 273.15) * 1.80 + 32;
        var tempRounded = Math.round(temp * 10) / 10;
        var icon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
        
        var queryURLUvi = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
        

        $.ajax({
            url: icon,
            method: "GET"
        })

        $.ajax({
            url: queryURLUvi,
            method: "GET"
        })
            
            .then(function(response2) { 
                
                 $("#results").html("<h2>" + response.name + " " + "(" + date + ")" + "</h2>");
               
               

                $("#temp").html("<p>" + "Temperature:" + " " + tempRounded + "\xB0F" + "<p>");
                $("#humidity").html("<p>" + "Humidity:" + " " + response.main.humidity + "%" + "<p>");
                $("#windSpeed").html("<p>" + "Wind Speed:" + " " + response.wind.speed + " " + "MPH" + "<p>");
                
                $("#uvIndex").html("<p>" + "UV Index:" + " " + "<span>" + response2.value + "</span>" + "<p>");
                
                function getColors() {
                    if (response2.value <= 2) {
                        ("<span>").addClass("badge badge-success");
                        
                    }  
                    
                    
                    if (response2.value >= 3  || response2.value <=7 ) {
                        $("<span>").addClass("badge badge-warning");
                    }
                    
                    
                    
                    if (response2.value >= 8) {
                        $("<span>").addClass("badge badge-danger"); 
                    }
                    
                    
                    
                    
                };

                
                getColors();


        

                $.ajax({
                    url: queryURLFuture,
                    method: "GET"
                })

                    .then(function(response3) {
                       
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
                
        
    });

}


$("#past").on("click", function() {
    var cityHistory = event.target.id;
    setLast(cityHistory);
    
});

function setLast(city) {
    for ( i=0 ; i < localStorage.length ; i++ ) { 
        localStorage.setItem(localStorage.key(i)," ");
    }

    localStorage.setItem(city, "last");
}

function nameList() {
    $("#past").empty();
    for ( i=0 ; i < localStorage.length ; i++ ) { 
        var cityNames =localStorage.key(i);
        var cityList = $("<button>");
        $(cityList).addClass('list-group-item list-group-item-action');
        $(cityList).attr("id", localStorage.key(i));
        $(cityList).attr("type", "button");
        $(cityList).text(localStorage.key(i));
        $("#past").append(cityList);
    }
};

