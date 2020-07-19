var APIKey = "e074a732c29d61e8b30c9a8a8cedfa29";
var city = $("#city").val();

console.log(city);

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

console.log(queryURL);
$("#search").on("click", function() {
    event.preventDefault();
        $.ajax({
            url: queryURL,
            method: "GET"
            
        })
            
            .then(function(response) {
                console.log(queryURL);
                console.log(response);
                

    });
  


});