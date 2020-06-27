document.addEventListener("DOMContentLoaded", function() {
    console.log(`hello!`)

    const oneQuote = document.getElementsByClassName(`oneQ`);
    oneQuote[0].addEventListener(`click`, function(e) {
        fetch('https://anime-chan.herokuapp.com/api/quotes/random').then(function(response) {
            return response.json();
        }).then(function (data) {
            console.log(data)
        }).catch(function(error){
            console.log(error)
        })
    })

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

    // const specificAnimeQuote = document.getElementsByClassName(`specificAnimeQ`);
    // specificAnimeQuote[0].addEventListener(`click`, function(e) {
    //     fetch('https://anime-chan.herokuapp.com/api/quotes?anime=naruto').then(function(response) {
    //         return response.json();
    //     }).then(function (data) {
    //         console.log(data)
    //     }).catch(function(error){
    //         console.log(error)
    //     })
    // })
    
});