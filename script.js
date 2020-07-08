document.addEventListener("DOMContentLoaded", function() {
    // page refresh function
    refreshPage = () => {
        window.location.reload();
    } 

    // function that copies the received str to the clipboard
    const copyToClipBoard = (str) => {
        const textArea = document.createElement('textarea');
        textArea.value = str;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    };

    // function to attach quotes
    const attachQuotes = (data) => {
        const mainContainer = document.getElementsByClassName(`displayingQs`);
        for (let i = 0; i < data.length; i++) {
            const quoteDiv = document.createElement(`div`);
            quoteDiv.classList.add(`quote`);
            quoteDiv.innerHTML = `
                <div id="quoteContent" class="quoteContent quote${i}">
                    <span class="quoteCircle"></span>
                    <p class=quoteText${i}>${data[i].quote}</p>
                    <h3>${data[i].character}, ${data[i].anime}</h3>
                </div>
                <div class="quoteOptions">
                    <input type="button" class=copyQuote${i} value="copy the quote"></input>
                </div>          
            `;  
            mainContainer[0].appendChild(quoteDiv);
            const textContainer = document.querySelector(`.quoteText${i}`);
            const copyQuoteBtn = document.querySelector(`.copyQuote${i}`);
            copyQuoteBtn.addEventListener('click', () => {
                const copyText = document.querySelector(`.quote${i}`).textContent;
                copyToClipBoard(copyText)
                const inputValue = document.getElementsByClassName(`copyQuote${i}`);
                if (copyText) {
                    inputValue[0].value = "copied"
                } else {
                    inputValue[0].value = "copy the quote"
                }
            });
        }
    }

    const attachWarning = (userSubmission) => {
        const mainContainer = document.getElementsByClassName(`displayingQs`);
        const quoteDiv = document.createElement(`div`);
        quoteDiv.classList.add(`warning`);
        quoteDiv.innerHTML = `
            <div id="warning" class="warningContainer">
                <p>I'm sorry but there are no quotes from <span class="animeName">"${userSubmission}"</span>.</p>
            </div>       
        `;  
        mainContainer[0].appendChild(quoteDiv);
    }

    // function to hide the hero page
    const hideHeroPage = () => {
        const buttons = document.getElementsByClassName(`buttonsToGetQs`);
        const quoteField = document.getElementsByClassName(`displayingQs`);
        closeButtons = () => {
            quoteField[0].style.display = 'block';
            buttons[0].style.display = 'none';
        };
        closeButtons();
    }

    // on button click, api call and get a quote
    const oneQuote = document.getElementsByClassName(`oneQ`);
    oneQuote[0].addEventListener(`click`, function(e) {
        fetch('https://anime-chan.herokuapp.com/api/quotes/random').then(function(response) {
            return response.json();
        }).then(function (data) {
            // const mainContainer = document.getElementsByClassName(`displayingQs`)
            // loop to dynamically attach quotes to the page
            attachQuotes(data);
            hideHeroPage();
        }).catch(function(error){
            prompt(`something went wrong. please contact the creator of this generator.`)
        })
    })

    // on button click, api call and get 10
    const tenQuotes = document.getElementsByClassName(`tenQ`);
    tenQuotes[0].addEventListener(`click`, function(e) {
        fetch('https://anime-chan.herokuapp.com/api/quotes').then(function(response) {
            return response.json();
        }).then(function (data) {
            // dynamically attaching quotes to the page
            attachQuotes(data);
            hideHeroPage();
        }).catch(function(error){
            prompt(`something went wrong. please contact the creator of this generator.`)
        })
    })

    // on submit, api call and get specific anime quotes
    const specificAnimeQuotes = document.getElementsByClassName(`animeSubmit`); 
    specificAnimeQuotes[0].addEventListener(`click`, function(e) {
        e.preventDefault()
        const userInput = document.getElementById(`animeName`);
        let userInputCopy = userInput.value.toLowerCase();
        fetch(`https://anime-chan.herokuapp.com/api/quotes?anime=${userInputCopy}`).then(function(response) {
            return response.json();
        }).then(function (data) {
            if (data.length <= 0) {
                attachWarning(userInputCopy);
                hideHeroPage();
            } else {
                attachQuotes(data);
                hideHeroPage();
            }
        }).catch(function(error){
            prompt(`something went wrong. please contact the creator of this generator.`)
        })
    })
});