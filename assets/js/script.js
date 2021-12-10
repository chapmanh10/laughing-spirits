var handleLiqourClick = function (liquorchoice) {
    getCocktail(liquorchoice)
}

var getCocktail = function(liquor) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquor 
    fetch (apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                   var randomNumber = Math.floor(Math.random() * data.drinks.length) 
                   console.log(randomNumber)
                    console.log(data.drinks[randomNumber].idDrink)
                })
            }
        })
}

var navItemVodka = document.getElementById("vodka")
var navItemGin = document.getElementById("gin")
var navItemRum = document.getElementById("rum")
var navItemTequila = document.getElementById("tequila")
navItemVodka.addEventListener("click", function(){handleLiqourClick("vodka")})
navItemGin.addEventListener("click", function(){handleLiqourClick("gin")})
navItemTequila.addEventListener("click", function(){handleLiqourClick("tequila")})
navItemRum.addEventListener("click", function(){handleLiqourClick("rum")})