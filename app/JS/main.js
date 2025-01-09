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
function convert(deck) {
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
}
async function gameLogic() {
  let i = 0;

  let win;

  let deck = await drawCard();
  convert(deck);

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

let user_balance = 100;
let ai_balance = 100;
function betting(user_bet, win) {
  console.log(user_bet);
  user_bet = Number(user_bet);
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
}
DOMSelectors.bet_button.addEventListener("click", async function () {
  event.preventDefault();
  const x = await gameLogic();
  betting(DOMSelectors.bet.value, x);
});
