var handleLiqourClick = function (liquorchoice) {
    getDrinkID(liquorchoice)
}

var getDrinkID = function(liquor) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquor 
    fetch (apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                   var randomNumber = Math.floor(Math.random() * data.drinks.length) 
                    var drinkID = data.drinks[randomNumber].idDrink
                    getCockTail(drinkID)
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

var getCockTail = function(drinkID) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID
    fetch (apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayImage(data.drinks[0].strDrinkThumb)
                })
            }
        })
}

var displayImage = function(imageUrl) {
    var image = document.createElement('img')
    image.src = imageUrl
    var mainContainer = document.getElementById("container")
    mainContainer.innerHTML = ""
    mainContainer.appendChild(image)
}