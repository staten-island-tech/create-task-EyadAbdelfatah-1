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

async function gameLogic() {
  let user_win_count = 0;
  let ai_win_count = 0;

  let user_balance = 0;
  let ai_balance = 0;

  let deck = await drawCard();

  let user_card = deck.cards[i];
  let ai_card = deck.cards[i + 1];

  deck.cards.forEach(card => {
    if (card.value === "JACKS") {
      card.value = 11;
    } else if (card.value === "QUEEN") {
      card.value = 12;
    } else if (card.value === "KING") {
      card.value = 13;
    } else if (card.value === "ACE") {
      card.value = 1;
    }
  });
  DOMSelectors.ai.insertAdjacentHTML(
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

function betting(user_bet) {
  if (user_balance < bet || bet != Number) {
    console.log("Please bet less/bet a valid number");
  } else if (user_balance > bet || bet == Number) {
    if (win == true) {
      user_balance += user_bet;
      ai_balance -= user_bet;
    } else {
      ai_balance += user_bet;
      user_balance -= user_bet;
    }
  }
}
