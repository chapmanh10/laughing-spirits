var handleLiqourClick = function (liquorchoice) {
    getDrinkID(liquorchoice)
}

//This function gets a random drink ID from the array called by liquor type
var getDrinkID = function (liquor) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquor
    fetch(apiUrl)
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

// These variables and listeners watch for users to choose a
var navItemVodka = document.getElementById("vodka")
var navItemGin = document.getElementById("gin")
var navItemRum = document.getElementById("rum")
var navItemTequila = document.getElementById("tequila")
navItemVodka.addEventListener("click", function () { handleLiqourClick("vodka") })
navItemGin.addEventListener("click", function () { handleLiqourClick("gin") })
navItemTequila.addEventListener("click", function () { handleLiqourClick("tequila") })
navItemRum.addEventListener("click", function () { handleLiqourClick("rum") })

//This function takes the random drink ID and gets the information for that drink
var getCockTail = function (drinkID) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayImage(data.drinks[0].strDrinkThumb)
                    displayRecipe(data)
                })
            }
        })
}

// This function grabs the image from the array and displays it on the page
var displayImage = function (imageUrl) {
    var image = document.createElement('img')
    image.src = imageUrl
    var mainContainer = document.getElementById("container")
    mainContainer.innerHTML = ""
    var figure = document.createElement("figure")
    figure.classList.add("image", "is-128x128","is-inline-block")
    mainContainer.appendChild(figure)
    image.classList.add("is-rounded")
    figure.appendChild(image)
}

// This function creates a list of ingredients
var displayRecipe = function (data) {
    var mainContainer = document.getElementById("container")
    mainContainer.classList.add("tile", "is-child", "is-4")
    mainContainer.classList.add("display")
    var drinkName = document.createElement("div")
    drinkName.textContent = data.drinks[0].strDrink
    mainContainer.appendChild(drinkName)
    var ingredientTitle = document.createElement("div")
    ingredientTitle.textContent = "Ingredients"
    mainContainer.appendChild(ingredientTitle)
    var recipeContainer = document.createElement("ul")
    mainContainer.appendChild(recipeContainer)
    var instructionsTitle = document.createElement("div")
    instructionsTitle.textContent = "Instructions"
    mainContainer.appendChild(instructionsTitle)
    var instructionsContainer = document.createElement("div")
    mainContainer.appendChild(instructionsContainer)

// This for loop ensures the right amount of ingredients display for the drink
    for (var i = 1; i < 16; i++) {
        var ingredient = data.drinks[0]["strIngredient" + i]
        var amount = data.drinks[0]["strMeasure" + i]
        if (!ingredient) {
            break
        }

        var ingredientText = document.createElement("li")
        ingredientText.textContent = amount + " " + ingredient
        recipeContainer.append(ingredientText)
    }

// This displays the instructions
    var instructionsText = document.createElement("div")
    instructionsText.textContent = data.drinks[0].strInstructions
    instructionsContainer.appendChild(instructionsText)

}

//Make cocktails cards