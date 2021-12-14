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
navItemVodka.addEventListener("click", function () { handleLiqourClick("vodka"), displayJoke() })
navItemGin.addEventListener("click", function () { handleLiqourClick("gin"), displayJoke() })
navItemTequila.addEventListener("click", function () { handleLiqourClick("tequila"), displayJoke() })
navItemRum.addEventListener("click", function () { handleLiqourClick("rum"), displayJoke() })

//This function takes the random drink ID and gets the information for that drink
var getCockTail = function (drinkID) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayCard(data)
                    getJoke()
                })
            }
        })
}

// This function will call a joke
var getJoke = function () {
    var apiUrl = "https://v2.jokeapi.dev/joke/programming,christmas,spooky,pun?safe-mode&type=single"
        fetch(apiUrl)
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        displayJoke(data)
                    })
                }
            })
}


// This function will display the joke
var displayJoke = function (jokeData) {
    var jokeContainer = document.getElementById("jokeContainer")
    jokeContainer.innerHTML = ""

    var jokeCardDiv = document.createElement("div")
    jokeCardDiv.classList.add("card")
    jokeContainer.appendChild(jokeCardDiv)

    var jokeCardContent = document.createElement("div")
    jokeCardContent.classList.add("card-content")
    jokeCardDiv.appendChild(jokeCardContent)
    
    var jokeTitle = document.createElement("p")
    jokeTitle.classList.add("title")
    jokeTitle.textContent = jokeData.joke
    jokeCardContent.appendChild(jokeTitle)
}

// This function grabs the image from the array and displays it on the page
var displayCard = function (data) {
    
    var mainContainer = document.getElementById("cocktail-container")
    mainContainer.innerHTML = ""
    mainContainer.classList.add("tile", "is-child", "is-3")

    //Div to hold the cocktail card
    var cardHolder = document.createElement("div")
    cardHolder.classList.add("card")
    mainContainer.appendChild(cardHolder)
    var cardDiv = document.createElement("div")
    cardDiv.classList.add("card-image")
    cardHolder.appendChild(cardDiv)

    //Image creation
    var figure = document.createElement("figure")
    figure.classList.add("image", "is-4by3")
    cardDiv.appendChild(figure)
    var image = document.createElement('img')
    image.src = data.drinks[0].strDrinkThumb
    figure.appendChild(image)

    //Div to hold the content of the card
    var cardContent = document.createElement("div")
    cardContent.classList.add("card-content")
    cardHolder.appendChild(cardContent)
    var media = document.createElement("div")
    media.classList.add("media")
    cardContent.appendChild(media)
    var mediaContent = document.createElement("div")
    mediaContent.classList.add("media-content")
    media.appendChild(mediaContent)

    //Drink information
    var drinkName = document.createElement("p")
    drinkName.textContent = data.drinks[0].strDrink
    drinkName.classList.add("title", "is-4")
    mediaContent.appendChild(drinkName)
    var ingredientTitle = document.createElement("p")
    ingredientTitle.textContent = "Ingredients"
    mediaContent.appendChild(ingredientTitle)
    var recipeContainer = document.createElement("ul")
    mediaContent.appendChild(recipeContainer)
    var content = document.createElement("div")
    content.classList.add("content")
    cardContent.appendChild(content)
    var instructionsTitle = document.createElement("div")
    instructionsTitle.textContent = "Instructions"
    instructionsTitle.classList.add("title", "is-4")
    content.appendChild(instructionsTitle)
    var instructionsContainer = document.createElement("div")
    content.appendChild(instructionsContainer)

    //Save button
    var footer = document.createElement("footer")
    footer.classList.add("card-footer")
    cardHolder.appendChild(footer)
    var savebtn = document.createElement("button")
    savebtn.classList.add("card-footer-item", "button", "is-info")
    savebtn.textContent = "Save to Favorites"
    footer.appendChild(savebtn)


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

