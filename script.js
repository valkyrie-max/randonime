document.addEventListener("DOMContentLoaded", function() {

    console.log(`hello!`)

    // function othername() {
    //     var input = document.getElementById("userInput").value;
    //     alert(input);
    // }

    function copyText() {
        let text = document.getElementsByClassName(`quoteText`)[0].textContent
        console.log(text)
    }

    // page refresh 
    refreshPage = () => {
        window.location.reload();
    } 
    // on button click, api call and get a quote
    const oneQuote = document.getElementsByClassName(`oneQ`);
    oneQuote[0].addEventListener(`click`, function(e) {
        fetch('https://anime-chan.herokuapp.com/api/quotes/random').then(function(response) {
            return response.json();
        }).then(function (data) {
            const mainContainer = document.getElementsByClassName(`displayingQs`)
            // loop to dynamically attach quotes to the page
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].anime)
                const quoteDiv = document.createElement(`div`); 
                quoteDiv.classList.add(`quote`)
                console.log(mainContainer)
                quoteDiv.innerHTML = `
                    <div id="quoteContent" class="quoteContent">
                        <span class="quoteCircle"></span>
                        <p class="quoteText1">${data[i].quote}</p>
                        <h3>${data[i].character}, ${data[i].anime}</h3>
                    </div>
                    <div class="quoteOptions">
                        <input type="button" class=copyQuote value="copy the quote"></input>
                        <button class="refresh" onclick="window.location.reload()">restart?</button>
                    </div>          
                `;
                mainContainer[0].appendChild(quoteDiv);
                const textContainer = document.querySelector(`.quoteText1`);
                const copyQuoteBtn = document.querySelector(`.copyQuote`);
                copyQuoteBtn.addEventListener('click', () => {
                    console.log(textContainer.textContent);
                    const copyText = document.querySelector(`.quoteContent`).textContent;
                    copyToClipBoard(copyText)
                    const inputValue = document.getElementsByClassName(`copyQuote`);
                    if (copyText) {
                        inputValue[0].value = "copied"
                    } else {
                        inputValue[0].value = "copy the quote"
                    }
                });
            }
            const buttons = document.getElementsByClassName(`buttonsToGetQs`)
            const quoteField = document.getElementsByClassName(`displayingQs`)
            closeButtons = () => {
                quoteField[0].style.display="block"
                buttons[0].style.display="none"
            }
            closeButtons()
        }).catch(function(error){
            console.log(error)
        })
    })


    // function that copies the received str to the clipboard
    const copyToClipBoard = (str) => {
        const textArea = document.createElement('textarea');
        textArea.value = str;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    };

    // on button click, api call and get 10
    const tenQuotes = document.getElementsByClassName(`tenQ`);
    tenQuotes[0].addEventListener(`click`, function(e) {
        fetch('https://anime-chan.herokuapp.com/api/quotes').then(function(response) {
            return response.json();
        }).then(function (data) {
            const mainContainer = document.getElementsByClassName(`displayingQs`);
				// loop to dynamically attach quotes to the page
				for (let i = 0; i < data.length; i++) {
					// console.log(data[i].anime)
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
                        <button class="refresh" onclick="window.location.reload()">restart?</button>
                    </div>          
                `;
					mainContainer[0].appendChild(quoteDiv);
					const textContainer = document.querySelector(`.quoteText${i}`);
                    const copyQuoteBtn = document.querySelector(`.copyQuote${i}`);
					copyQuoteBtn.addEventListener('click', () => {
                        console.log(textContainer.textContent);
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
				const buttons = document.getElementsByClassName(`buttonsToGetQs`);
				const quoteField = document.getElementsByClassName(`displayingQs`);
				closeButtons = () => {
					quoteField[0].style.display = 'block';
					buttons[0].style.display = 'none';
				};
				closeButtons();
        }).catch(function(error){
            console.log(error)
        })
    })
    
});