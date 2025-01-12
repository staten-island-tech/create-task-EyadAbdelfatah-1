import "./style.css";

const DOMSelectors = {
  card: document.querySelector("#card"),
  result: document.querySelector("#result"),
  bet: document.querySelector("#search-input"),
  bet_button: document.querySelector("#submit")
};

let deck;
let convertedDeck;
let isDeckReady = false;
let i = 0;

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
    console.error("Error fetching the deck:", error);
  }
}

function convert(deck) {
  deck.cards.forEach(card => {
    if (card.value === "JACK") {
      card.value = 11;
    } else if (card.value === "QUEEN") {
      card.value = 12;
    } else if (card.value === "KING") {
      card.value = 13;
    } else if (card.value === "ACE") {
      card.value = 1;
    } else {
      card.value = Number(card.value);
    }
  });
  return deck;
}

async function prepareDeck() {
  deck = await drawCard();
  convertedDeck = await convert(deck);
  isDeckReady = true;
}
async function initGame() {
  await prepareDeck();
  if (isDeckReady) {
    DOMSelectors.result.innerHTML = "";
    DOMSelectors.result.insertAdjacentHTML(
      "beforeend",
      "<h2>Deck is ready</h2> <h2>Your money:100</h2>"
    );
  }
}
let x;
initGame();
function gameLogic() {
  if (!isDeckReady) {
    return;
  } else if (convertedDeck.cards.length < i + 1) {
    DOMSelectors.result.insertAdjacentHTML(
      "beforeend",
      `<h2>There are no more cards in the deck</h2> <button id="reset">Reset</button>`
    );
  }

  let win;
  let user_card = convertedDeck.cards[i];
  let ai_card = convertedDeck.cards[i + 1];

  DOMSelectors.card.insertAdjacentHTML(
    "afterbegin",
    `<div id="ai-card"><h2>This is your opponent's card</h2><img src="${ai_card.image}" alt="${ai_card.value}"></div>
    <div id="user-card"><h2>This is your card</h2><img src="${user_card.image}" alt="${user_card.value}"></div>`
  );

  if (user_card.value > ai_card.value) {
    DOMSelectors.result.insertAdjacentHTML("beforeend", `<h2>You win</h2>`);
    win = true;
  } else if (user_card.value < ai_card.value) {
    DOMSelectors.result.insertAdjacentHTML("beforeend", `<h2>You lose</h2>`);
    win = false;
  } else {
    DOMSelectors.result.insertAdjacentHTML("beforeend", `<h2>draw</h2>`);
    win = undefined;
  }
  return win;
}

let user_balance = 100;
let ai_balance = 100;
function betting(user_bet) {
  user_bet = Number(user_bet);

  let win = gameLogic();
  console.log(win);
  if (user_balance == 0) {
    DOMSelectors.card.innerHTML = "";
    DOMSelectors.result.innerHTML = "";
    DOMSelectors.bet_button.remove();
    DOMSelectors.result.insertAdjacentHTML(
      "beforeend",
      `<h2>no more money</h2> <button class="btn btn-secondary"id="reset">Reset</button>`
    );
    return;
  } else if (ai_balance == 0) {
    DOMSelectors.card.innerHTML = "";
    DOMSelectors.result.innerHTML = "";
    DOMSelectors.bet_button.remove();
    DOMSelectors.result.insertAdjacentHTML(
      "beforeend",
      `<h2>opponent has no more money</h2> <button class="btn btn-secondary"id="reset">Reset</button>`
    );
    return;
  } else if (user_balance < user_bet || !user_bet || user_bet < 0) {
    DOMSelectors.result.insertAdjacentHTML(
      "beforeend",
      "<h2>Please enter a valid value</h2>"
    );
    return;
  } else if (user_balance >= user_bet) {
    if (win == true) {
      user_balance += user_bet;
      ai_balance -= user_bet;
    } else if (win == false) {
      ai_balance += user_bet;
      user_balance -= user_bet;
    } else {
    }
  }

  DOMSelectors.result.insertAdjacentHTML(
    "beforeend",
    `<h2>Your balance: ${user_balance}</h2> <h2>opponent balance:${ai_balance}</h2>`
  );
}

DOMSelectors.bet_button.addEventListener("click", function(event) {
  event.preventDefault();

  if (!isDeckReady) {
    return;
  }
  DOMSelectors.card.innerHTML = "";
  DOMSelectors.result.innerHTML = "";

  betting(DOMSelectors.bet.value);

  i += 2;
});

DOMSelectors.result.addEventListener("click", function(event) {
  if (event.target.id === "reset") {
    location.reload();
  }
});
