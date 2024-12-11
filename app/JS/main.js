import "./style.css";
async function drawCard() {
  try {
    let response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    let result = await response.json();
    let id = result.deck_id;

    response = await fetch(
      `https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`
    );
    result = await response.json();
    console.log(result);
  } catch (error) {}
}
drawCard();
