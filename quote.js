const quoteContentText = document.getElementById('quoteContent');
const quoteAuthorText = document.getElementById('quoteAuthor');
const loaderSpinner = document.getElementById('loader');
const quoteTagInput = document.getElementById('tags');

let quoted;


function newQuote() {
    quoteContentText.classList.add('hidden');
    quoteAuthorText.classList.add('hidden');
    loaderSpinner.classList.remove('hidden');
    fetch(`https://api.quotable.io/random?maxLength=70&tags=${quoteTagInput.value}`)
        .then(response => response.json())
        .then(quote => {
            loaderSpinner.classList.add('hidden');
            quoteContentText.classList.remove('hidden');
            quoteAuthorText.classList.remove('hidden');
            quoteContentText.innerHTML = `"${quote.content}"`
            quoteAuthorText.innerHTML = `-${quote.author}`
            document.getElementById('tweet-quote').href = `https://twitter.com/intent/tweet?hashtags=quotify&related=babegadev&text=${encodeURIComponent(`"${quote.content}" -${quote.author} https://babega.com/quotify`)}`;
        })
}

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

tags = [
    'famous-quotes', 'life',
    'friendship', 'science',
    'technology', 'inspirational',
    'motivational', 'literature',
    'art', 'business',
    'love', 'success',
    'religion', 'social-justice'
]

autocomplete(quoteTagInput, tags);

