document.addEventListener("DOMContentLoaded", function() {
    console.log(`hello!`)

    // on button click, api call and get a quote
    const oneQuote = document.getElementsByClassName(`oneQ`);
    oneQuote[0].addEventListener(`click`, function(e) {
        fetch('https://anime-chan.herokuapp.com/api/quotes/random').then(function(response) {
            return response.json();
        }).then(function (data) {
            const mainContainer = document.getElementsByClassName(`displayingQs`)
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].anime)
                const quoteDiv = document.createElement(`div`); 
                console.log(mainContainer)
                quoteDiv.innerHTML = `
                <h2>${data[i].anime}</h2>`;
                mainContainer[0].appendChild(quoteDiv);
            }
        }).catch(function(error){
            console.log(error)
        })
    })

    // on button click, api call and get 10
    const tenQuotes = document.getElementsByClassName(`tenQ`);
    tenQuotes[0].addEventListener(`click`, function(e) {
        fetch('https://anime-chan.herokuapp.com/api/quotes').then(function(response) {
            return response.json();
        }).then(function (data) {
            console.log(data)
        }).catch(function(error){
            console.log(error)
        })
    })

    
});