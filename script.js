const quoteContainer = document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show showLoadingSpinner
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide showLoadingSpinner
function removeLoadingSpinner() {
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//get quote from API
async function getQuote() {
    if(!getQuote.errorCounter){
        getQuote.errorCounter = 1;
    }
    if(getQuote.errorCounter > 10){
        alert('Something goes wrong');
        return;
    }


    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json`;
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //if Author is blank, add 'Unknown
        if(data.quoteAuthor === ''){
            authorText.textContent = 'Unknown';
        }else{
            authorText.textContent = data.quoteAuthor;
        }

        if(data.quoteText.length > 50){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.textContent = data.quoteText;
        removeLoadingSpinner();
    }catch (e) {
        getQuote.errorCounter++;
        getQuote();
        console.log(e);
    }
}
//Tweet Quote
function tweetQuote() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

//Event listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On load
getQuote();
