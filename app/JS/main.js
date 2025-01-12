import "./style.css";
const DOMSelectors = {
  card: document.querySelector("#card"),
  result: document.querySelector("#result"),
  bet: document.querySelector("#search-input"),
  bet_button: document.querySelector("#submit")
};
async function drawCard() {
  try {
    let response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    let result = await response.json();
    let id = result.deck_id;

    response = await fetch(
      `https://deckofcardsapi.com/api/deck/${id}/draw/?count=52`
    );

    result = await response.json();

    return result;
  } catch (error) {}
}
async function convert() {
  let deck = await drawCard()
  deck.cards.forEach(card => {
    if (card.value === "JACK") {
      card.value = 11;
    } else if (card.value === "QUEEN") {
      card.value = 12;
    } else if (card.value === "KING") {
      card.value = 13;
    } else if (card.value === "ACE") {
      card.value = 1;
    }
  });
  return deck;
}
let i = 0;
let convertedDeck = await convert()
async function gameLogic() {
  

  let win;

  let deck = await drawCard();
  convert(deck);
  console.log(deck.deck_id);
  let user_card = deck.cards[i];
  let ai_card = deck.cards[i + 1];

  DOMSelectors.card.insertAdjacentHTML(
    "afterbegin",
    `<div id="ai-card"><h2>This is you opponents card</h2><img src="${ai_card.image}" alt="${ai_card.value}"></div>
    <div id="ai-card"><h2>This is your card</h2><img src="${user_card.image}" alt="${user_card.value}"></div>`
  );

  if (Number(user_card.value) > Number(ai_card.value)) {
    DOMSelectors.result.insertAdjacentHTML(
      "beforeend",
      `<h2 class="">You win</h2>`
    );
    win = true;
    return win;
  } else if (Number(user_card.value) < Number(ai_card.value)) {
    DOMSelectors.result.insertAdjacentHTML(
      "beforeend",
      `<h2 class="">You lose</h2>`
    );
    win = false;
    return win;
  } else {
    DOMSelectors.result.insertAdjacentHTML(
      "beforeend",
      `<h2 class="">draw</h2>`
    );
    win = false;
    return win;
  }
}
let x;
function betting(user_bet, win) {
  fio0p;
  let user_balance = 100;
  let ai_balance = 100;

  if (user_balance < user_bet || typeof user_bet != Number) {
  } else if (user_balance > user_bet || typeof user_bet == Number) {
    if (win == true) {
      user_balance += user_bet;
      ai_balance -= user_bet;
    } else {
      ai_balance += user_bet;
      user_balance -= user_bet;
    }
  }
}
DOMSelectors.bet_button.addEventListener("click", function () {
  event.preventDefault();
  gameLogic();
});
