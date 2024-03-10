const cards = document.querySelectorAll('.game-card');
let hasFlipped = false;
let locked = false;
let firstCard, secondCard;

function flipCard(){
    if(locked) return;
    if(this === firstCard) return;
    this.classList.add('flip');
    if(!hasFlipped)
    {
        hasFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;

    checkMatchedCards();
}
function checkMatchedCards(){
    let matched = firstCard.dataset.name === secondCard.dataset.name;
    matched ?  disableCards() :  unflipCards();
}
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();
}

function unflipCards(){
    locked = true;
    setTimeout(()=> 
    {firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetCards();
    }, 1000);
}

function resetCards(){
    hasFlipped = false;
    locked = false;
    firstCard = null;
    secondCard = null;
}

(function shuffle(){
    cards.forEach(card => {
        let randomNumber = Math.floor(Math.random() * 12);
        card.style.order = randomNumber;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard));