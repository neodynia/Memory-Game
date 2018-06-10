/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Get class names of cards, put into an array
const cardClassesNodeList = document.querySelectorAll(".deck .card i"); //Get nodelist of classes on cards
console.log(cardClassesNodeList);
const cardClassesArray = Array.apply(null, cardClassesNodeList); //Convert nodelist to array
console.log(cardClassesArray);

// Shuffle the array of card classes
const shuffledClasses = shuffle(cardClassesArray);
console.log(shuffledClasses);





// Add Event Listeners to cards via event delegation and 
const myDeck =document.querySelector('.deck');  //

// What to do when card is CLICKED
myDeck.addEventListener('click', applyListener);

// Create array for clicked cards
let clickedCards = [];

// Create move counter
let moveCount = 0;


// Functions --------------------------------------------------------------------------------------------
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

// If <li> is clicked, call toggle classe function
function applyListener(event) {  
  const myClickedCard = event.target;
  if (myClickedCard.nodeName==="LI") {
    toggleCardClass(myClickedCard);
  }
}

// Toggle the show/Open classes which turn card blue and show symbol
function toggleCardClass(myClickedCard) {
  if(!myClickedCard.classList.contains("match")) { //If already matched, don't allow user to interact with it
    event.target.classList.toggle("show");
    event.target.classList.toggle("open"); 
    addCardsOpened(myClickedCard);  //Add cards to array  
  }
}

// Add clicked cards to the clickedCards array (will only have TWO cards at most)
function addCardsOpened(myClickedCard) {
  // if (myClickedCard.classList.contains("open") && clickedCards.length <2) { // Add card to array ONLY if card recently toggled/flipped over
  if (myClickedCard.classList.contains("open") ) { // Add card to array ONLY if card recently toggled/flipped over
    clickedCards.push(myClickedCard);

    if(clickedCards.length === 2)  { // if we have two cards, compare theese two cards
      compareCards();
    }    
  }
}

// Compare two cards when the array has two cards added to it
function compareCards() {
  // console.log(clickedCards);
  // console.log(`${clickedCards[0].children[0].className} ---- ${clickedCards[1].children[0].className}`);
  const item_0 = clickedCards[0].children[0].className;
  const item_1 = clickedCards[1].children[0].className;
  if(item_0 === item_1) {
    // console.log("we HAVE matched");
    cardsMatchTrue();    
  } else  {
    // console.log("we have NOT matched");
    cardsMatchFalse();  
  }
}

// If cards match remove show/open class, add match class
function cardsMatchTrue() {
  clickedCards[0].classList.remove("show"); 
  clickedCards[0].classList.remove("open"); 
  clickedCards[0].classList.add("match");
  clickedCards[1].classList.remove("show"); 
  clickedCards[1].classList.remove("open"); 
  clickedCards[1].classList.add("match");
  clickedCards = [];    // Clear array as we only need to work with two cards at a time
  incrementMoveCount(); // Add a move each time cards are matched
  isGameOver();         // After a successfull move, check if game is won or not
}

// If cards DO NOT match, remove show/open class(I.e., put face down)
function cardsMatchFalse() {
  clickedCards[0].classList.remove("show"); 
  clickedCards[0].classList.remove("open"); 
  clickedCards[1].classList.remove("show"); 
  clickedCards[1].classList.remove("open"); 
  clickedCards = []; // Clear array as we only need to work with two cards at a time
  incrementMoveCount(); //Add a move each time cards are NOT matched
}

// Increment move Counter
function incrementMoveCount() {
  moveCount++;
  // console.log(moveCount);
  const movesOnPage = document.querySelector(".moves");
  if (moveCount == 1) { // Added this condition to check for 'one MOVE' vs 'two MOVES'
    movesOnPage.textContent = `${moveCount} Move`;
  } else {
    movesOnPage.textContent = `${moveCount} Moves`;
  }
}

// Check if game is won or not, returns bool
function isGameOver() {
  let matchCount = 0; // var to count number of MATCHED cards. If 16 matches, game===OVER
  const getDeck = document.querySelectorAll(".card");

  Array.prototype.forEach.call(getDeck, function (item) { //loop through nodelist
    if( item.classList.contains('match') ) {
      matchCount++;
      console.log(matchCount);
    } 
  });

  if (matchCount === 16) { //If 16 matches, game is over
    return true;
  } else  {
    return false;
  }
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
