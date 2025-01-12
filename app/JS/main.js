import "./style.css";
const DOMSelectors = {
  card: document.querySelector("#card"),
  result: document.querySelector("#result"),
  bet: document.querySelector("#search-input"),
  bet_button: document.querySelector("#submit"),
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
  } catch (error) {
    console.log("the api is poopy");
  }
}

async function convert() {
  let deck = await drawCard();

  deck.cards.forEach((card) => {
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
let convertedDeck = await convert();
let i = 0;
async function gameLogic() {

  let win;

  let user_card = convertedDeck.cards[i];
  let ai_card = convertedDeck.cards[i + 1];
  i += 2;
  console.log(convertedDeck);
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

let user_balance = 100;
let ai_balance = 100;
function betting(user_bet, win) {
  console.log(user_bet);
  user_bet = Number(user_bet);
  console.log(typeof user_bet);
  if (user_balance < user_bet) {
    console.log("unc");
  } else if (user_balance >= user_bet) {
    if (win == true) {
      console.log("sdfh");
      user_balance += user_bet;
      ai_balance -= user_bet;
    } else {
      console.log("sdfh");
      ai_balance += user_bet;
      user_balance -= user_bet;
    }
  }
  console.log(user_balance);
}
DOMSelectors.bet_button.addEventListener("click", async function (event) {
  event.preventDefault();
  const x = await gameLogic();
  betting(DOMSelectors.bet.value, x);
});
