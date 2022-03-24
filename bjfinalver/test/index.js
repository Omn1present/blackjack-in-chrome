let firstCard = 0
let secondCard = 0 
let sum = 0 
let hasBlackJack=false 
let isAlive=false
let message=""
let addCard = 0 
let cards = [] 
let dsum=0 
let dealerHasDrawn=false 
let i=2 
let isFirstHand=false
let chips=300 
let bet=10
let afterDealerDraw="" 
let numberOfPlayerAces=0 
let numberOfDealerAces=0
const deckType=[
    [11,"<img src='cards/ace_of_clubs.png'>"], 
    [11,"<img src='cards/ace_of_diamonds.png'>"],  
    [11,"<img src='cards/ace_of_hearts.png'>"], 
    [11,"<img src='cards/ace_of_spades2.png'>"],
    [2,'<img src="cards/2_of_clubs.png">'],
    [2,'<img src="cards/2_of_diamonds.png">'], 
    [2,'<img src="cards/2_of_hearts.png">'], 
    [2,'<img src="cards/2_of_spades.png">'], 
    [3,'<img src="cards/3_of_clubs.png">'],
    [3,'<img src="cards/3_of_diamonds.png">'], 
    [3,'<img src="cards/3_of_hearts.png">'], 
    [3,'<img src="cards/3_of_spades.png">'], 
    [4,'<img src="cards/4_of_clubs.png">'],
    [4,'<img src="cards/4_of_diamonds.png">'], 
    [4,'<img src="cards/4_of_hearts.png">'], 
    [4,'<img src="cards/4_of_spades.png">'], 
    [5,'<img src="cards/5_of_clubs.png">'],
    [5,'<img src="cards/5_of_diamonds.png">'], 
    [5,'<img src="cards/5_of_hearts.png">'], 
    [5,'<img src="cards/5_of_spades.png">'], 
    [6,'<img src="cards/6_of_clubs.png">'],
    [6,'<img src="cards/6_of_diamonds.png">'], 
    [6,'<img src="cards/6_of_hearts.png">'], 
    [6,'<img src="cards/6_of_spades.png">'], 
    [7,'<img src="cards/7_of_clubs.png">'],
    [7,'<img src="cards/7_of_diamonds.png">'], 
    [7,'<img src="cards/7_of_hearts.png">'], 
    [7,'<img src="cards/7_of_spades.png">'], 
    [8,'<img src="cards/8_of_clubs.png">'],
    [8,'<img src="cards/8_of_diamonds.png">'], 
    [8,'<img src="cards/8_of_hearts.png">'], 
    [8,'<img src="cards/8_of_spades.png">'], 
    [9,'<img src="cards/9_of_clubs.png">'],
    [9,'<img src="cards/9_of_diamonds.png">'], 
    [9,'<img src="cards/9_of_hearts.png">'], 
    [9,'<img src="cards/9_of_spades.png">'], 
    [10,'<img src="cards/10_of_clubs.png">'],
    [10,'<img src="cards/10_of_diamonds.png">'], 
    [10,'<img src="cards/10_of_hearts.png">'], 
    [10,'<img src="cards/10_of_spades.png">'], 
    [10,'<img src="cards/jack_of_clubs.png">'],
    [10,'<img src="cards/jack_of_diamonds.png">'], 
    [10,'<img src="cards/jack_of_hearts.png">'], 
    [10,'<img src="cards/jack_of_spades.png">'], 
    [10,'<img src="cards/queen_of_clubs.png">'],
    [10,'<img src="cards/queen_of_diamonds.png">'], 
    [10,'<img src="cards/queen_of_hearts.png">'], 
    [10,'<img src="cards/queen_of_spades.png">'], 
    [10,'<img src="cards/king_of_clubs.png">'],
    [10,'<img src="cards/king_of_diamonds.png">'], 
    [10,'<img src="cards/king_of_hearts.png">'], 
    [10,'<img src="cards/king_of_spades.png">'],
] 
let deck = deckType.slice()
let cardValue=0 
let imageSource=""


const messageEl=document.getElementById("message-el") 
const sumEl=document.getElementById("sum-el")
const cardsEl=document.getElementById("cards-el") 
const btn1El=document.getElementById("btn1")
const btn2El=document.getElementById("btn2") 
const btn3El=document.getElementById("btn3") 
const dCardsEl=document.getElementById("dcards-el") 
const dSumEl=document.getElementById("dsum-el")
const chipsEl=document.getElementById("chips-el")
const betEl=document.getElementById("bet-el") 
const select = document.getElementById('betval-el') 
const betPicker=document.getElementById("betpicker") 
const errorMessage=document.getElementById("error-message") 
const playerEl=document.getElementById("player-el")
const dealerEl=document.getElementById("dealer-el")  


function getRandomCard(){
    let randomResult=Math.floor(Math.random()*deck.length)   
    cardValue = deck[randomResult][0] 
    imageSource = deck[randomResult][1]
    deck.splice(randomResult, 1) 
}  

function pickBet(){
    var value = select.options[select.selectedIndex].value;
    bet=parseInt(value) 
    betEl.textContent="Your Bet: "+bet+"$"
}
function renderGame(){
    for (let j = 0; j<numberOfPlayerAces; j++) {
    if (sum>21){
        sum=sum-10 
        j=j-1 
        numberOfPlayerAces=numberOfPlayerAces-1
    }   
} 
    if (dealerHasDrawn) {
        if (dsum>21){
            message="Dealer's bust! You won! Wanna place another bet?"
            chips+=2*bet
            chipsEl.textContent="Your chips: "+chips+"$" 
        } else if (dsum>sum){
            message="You lost! Wanna place another bet?"
        } else if (dsum===sum){
            message="Draw! Wanna place another bet?" 
            chips+=bet
            chipsEl.textContent="Your chips: "+chips+"$"
        } else {
            message="You won! Wanna place another bet?"
            chips+=2*bet
            chipsEl.textContent="Your chips: "+chips+"$"
        }
            betPicker.style.visibility="visible" 
            select.style.visibility="visible"
    } else {
        if (sum<21) {
        message="Do you want to stand on it?"
        } else if (sum===21) {
            if(isFirstHand) {
                hasBlackJack=true
                message="Congratulations! You have BlackJack! Wanna place another bet?"
                chips+=2.5*bet
                chipsEl.textContent="Your chips: "+chips+"$"
                betPicker.style.visibility="visible" 
                select.style.visibility="visible"
            }else {
                    dealerDraw()
                }
        btn2El.style.visibility="hidden" 
        btn3El.style.visibility="hidden"
        } else {
        message="Bust, you lost! Wanna place another bet?" 
        isAlive=false 
        btn2El.style.visibility="hidden" 
        btn3El.style.visibility="hidden"
        betPicker.style.visibility="visible" 
        select.style.visibility="visible"
        } 
        sumEl.textContent=`Sum: ${sum}`  
        cardsEl.textContent="Your Cards: " 
        for (let i = 0; i < cards.length; i++) {
            cardsEl.textContent+=" "+cards[i]
        }            
        dSumEl.textContent="Sum: " + dsum 
        dCardsEl.textContent="Dealer's Cards: " + dealerFirstCard + " ?"
        }
        dSumEl.textContent="Sum: " + dsum 
        messageEl.textContent=message 
    } 
function newCard(){
    isFirstHand=false
    getRandomCard()
        if (cardValue===11){
        numberOfPlayerAces++
    }
    addCard=cardValue
    sum+=addCard 
    cards.push(addCard)
    playerEl.innerHTML+=imageSource
    renderGame()   
} 
function startGame(){ 
    if (bet>chips){
        errorMessage.style.visibility="visible"
    }else{
 errorMessage.style.visibility="hidden"   
    chips-=bet 
    chipsEl.textContent="Your Chips: "+chips+"$"
    hasBlackJack=false
    isFirstHand=true
    dealerHasDrawn=false 
    playerEl.innerHTML="<p> " 
    dealerEl.innerHTML="" 
    numberOfPlayerAces=0 
    numberOfPlayerAces=0
    deck=deckType.slice()

    getRandomCard()
        if (cardValue===11){
        numberOfPlayerAces++
    }
    firstCard=cardValue 
    playerEl.innerHTML+=imageSource 
    getRandomCard()
        if (cardValue===11){
        numberOfPlayerAces++
    }
    secondCard=cardValue 
    playerEl.innerHTML+=imageSource 
    cards=[
        firstCard, secondCard
    ] 
    isAlive=true 
    sum = firstCard + secondCard 
    btn2El.style.visibility="visible" 
    btn3El.style.visibility="visible"
    cardsEl.style.visibility="visible" 
    sumEl.style.visibility="visible"
    cardsEl.style.visibility="visible" 
    dSumEl.style.visibility="visible"
    dCardsEl.style.visibility="visible"
    betPicker.style.visibility="hidden" 
    select.style.visibility="hidden"
    getRandomCard() 
            if (cardValue===11){
        numberOfDealerAces++ 
    }
    dealerFirstCard=cardValue 
    dealerEl.innerHTML+=imageSource 
    getRandomCard()  
            if (cardValue===11){
        numberOfDealerAces++ 
    }
    dealerSecondCard=cardValue
    afterDealerDraw=dealerEl.innerHTML+imageSource
    dealerEl.innerHTML+='<img src="cards/cardback.png">'
    dsum=dealerFirstCard+"+?" 
    renderGame()
} 
}   
function dealerDraw() {
    btn2El.style.visibility="hidden" 
    btn3El.style.visibility="hidden"
    dsum= dealerFirstCard+dealerSecondCard
    let dcards = [
        dealerFirstCard, dealerSecondCard
    ]  
    dCardsEl.textContent="Dealer's cards: "+ dcards[0]+" "+dcards[1] 
    dsum.textContent="Sum: " + dsum 
    dealerEl.innerHTML=afterDealerDraw
    while (dsum<17) {
        getRandomCard()
        if (cardValue===11){
        numberOfDealerAces++ 
    }
        addCard=cardValue 
        dsum+=addCard  
        dSumEl.textContent="Sum: " + dsum 
        dCardsEl.textContent+=" "+addCard 
        dealerEl.innerHTML+=imageSource 
        if (dsum>21 &&numberOfDealerAces) {
            dsum=dsum-10 
            numberOfDealerAces=numberOfDealerAces-1

        }
    } 
    dealerHasDrawn=true 
    renderGame()
} 

btn1El.addEventListener("click", startGame) 
betPicker.addEventListener("click", pickBet) 
btn2El.addEventListener("click", newCard) 
btn3El.addEventListener("click", dealerDraw) 