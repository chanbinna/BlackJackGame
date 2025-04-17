
// our main funtion that creates the card
function createCardElement(rank, suit) {
  const faceIcons = {
    'J': {
      black: './faces/j_black.svg',
      red: './faces/j_red.svg'
    },
    'Q': {
      black: './faces/q_black.svg',
      red: './faces/q_red.svg'
    },
    'K': {
      black: './faces/k_black.svg',
      red: './faces/k_red.svg'
    }
  };


  // Creating card element as div, adding class "card"
  const card = document.createElement("div");
  card.className = "card";

  // Setting card color based on suit.color variable
  const cardColor = suit.color;


  // either face or normal symbol
  const getCenterContent = () => {
    if (faceIcons[rank] && faceIcons[rank][suit.color]) {
      return `
          <div class="face-card">
            <img src="${faceIcons[rank][suit.color]}" alt="${rank}" class="face-img" />
          </div>
        `;
    } else {
      return `<div class="card-center">${suit.symbol}</div>`;
    }
  };


  // main execution
  card.innerHTML = `
      <div class="card-inner"> 
        <div class="card-front ${cardColor}">
          <div class="card-corner top-left">
            <div>${rank}</div>
            <div>${suit.symbol}</div>
          </div>
          ${getCenterContent()}
          <div class="card-corner bottom-right">
            <div>${rank}</div>
            <div>${suit.symbol}</div>
          </div>
        </div>
        <div class="card-back"></div>
      </div>
    `;

  // click flip part
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  return card;
}



// now here is the part where card is executed

(() => {
  // this part make the card preview, grabbing the DOM preview element
  const preview = document.getElementById("preview");

  // Contains all the suits and their colors that I want
  const suits = [
    { symbol: '♠', color: 'black' },
    { symbol: '♥', color: 'red' },
    { symbol: '♦', color: 'red' },
    { symbol: '♣', color: 'black' }
  ];

  // Contains all the ranks that I want
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  // Loop through the suits and ranks to create cards

  // TODO: how about adding the shuffle button here?
  let count = 0;
  const cards = [];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      const card = createCardElement(ranks[j], suits[i]);
      cards.push(card);
      count++;
    }
  }

  cards.forEach(card => preview.appendChild(card));

  // best way to sort is using Fisher-Yates algorithm

  const shuffle = document.querySelector('.shuffle');
  shuffle.addEventListener('click', () => {
    cards.forEach(card => {
      card.classList.add('shuffle-effect');
      card.addEventListener('animationend', () => {
        card.classList.remove('shuffle-effect');
      }), { once: true }
    })

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }

    preview.innerHTML = '';
    cards.forEach(card => preview.appendChild(card));
  })




  document.getElementById("card-count").innerText = count;

  const flipAll = document.querySelector('.flip');
  flipAll.addEventListener('click', () => {
    const cards = document.querySelectorAll('.card');
    for (const card of cards) {
      card.classList.toggle('flipped');
    }
  });


})();