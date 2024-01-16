const baseURL = "https://deckofcardsapi.com/api/deck";


const $newDeckBtn = $("#new-deck-btn");
const $drawCardBtn = $("#draw-card-btn");
const $cardContainer = $("#card-container");

let deckID;
let rotation = 0;




$drawCardBtn.on('click', function(e){
    e.preventDefault();
    drawCard()
    .then(cardData => addCardHTML(cardData.images.png))
    .catch(()=>getNewDeck().then(drawCard).then(result => addCardHTML(result.images.png)))
})

async function getNewDeck(){
    $cardContainer.empty();
    let response = await axios({
        url: `${baseURL}/new/shuffle/?deck_count=1`,
        method: 'GET',
    });
   
    deckID = response.data.deck_id
    return response
}

async function drawCard(){
    let response = await axios({
        url: `${baseURL}/${deckID}/draw/?count=1`,
        method: 'GET',
    });
    let result = response.data.cards[0]
    console.log(`${result.value} of ${result.suit}`)
    return result
}

function addCardHTML(card_img){
    
    let imageElement = `<img class="card" src="${card_img}" style="transform: rotate(${rotation}deg">`
    $cardContainer.append(imageElement)
    rotation += 12;
}
getNewDeck();