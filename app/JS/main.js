import "./style.css";
const DOMSelectors = {
  ai: document.querySelector("#ai"),
  user: document.querySelector("#user")
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
    console.log(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=52`);
    result = await response.json();
    return result;
  } catch (error) {}
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
    `<div id="ai-card"><img src="${ai_card.image}" alt=""><p>${ai_card.value}</p></div>`
  );
  while (user_win_count < 2 || ai_win_count < 2) {
    if (Number(user_card.value) > Number(ai_card.value)) {
      user_win_count++;
    } else {
      ai_win_count++;
    }
  }
}
gameLogic();

let user_balance = 100;
let ai_balance = 100;
function betting(user_bet, win) {
  console.log(user_bet);
  user_bet = Number(user_bet);
  if (user_balance < user_bet) {
    console.log("unc");
  } else if (user_balance >= user_bet) {
    if (win == true) {
      user_balance += user_bet;
      ai_balance -= user_bet;
    } else {
      ai_balance += user_bet;
      user_balance -= user_bet;
    }
  }
}
