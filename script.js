document.addEventListener("DOMContentLoaded", function() {
    console.log(`hello!`)

    // function that copies the received str to the clipboard
    const copyToClipBoard = (str) => {
        const element = document.createElement('textarea');
        element.value = str;
        document.body.appendChild(element);
        element.select();
        document.execCommand('copy');
        document.body.removeChild(element);
    };

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
                        <p class="quoteText">${data[i].quote}</p>
                        <h3>${data[i].character}, ${data[i].anime}</h3>
                    </div>
                    <div class="quoteOptions">
                        <input type="button" class="copyQuote" onclick=${addEventListener("click", function(){
                            // allowing the user to copy the entire text of the div
                            const copyText = document.querySelector(".quoteContent").textContent;
                            // function on line 5
                            copyToClipBoard(copyText)
                            const inputValue = document.getElementsByClassName("copyQuote");
                            if (copyText) {
                                inputValue[0].value = "copied"
                            } else {
                                inputValue[0].value = "copy the quote"
                            }})
                        } value="copy the quote"></input>
                    </div>          
                `;
                mainContainer[0].appendChild(quoteDiv);
            }
            const buttons = document.getElementsByClassName(`buttonsToGetQs`)
            closeText = () => {buttons[0].style.display="none"}
            closeText()
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