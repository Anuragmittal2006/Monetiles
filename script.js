// Define variables
const tiles = document.querySelectorAll('.tile');
const playAgainButton = document.getElementById('play-again');
const walletBalance = document.getElementById('wallet-balance');
const withdrawButton = document.getElementById('withdraw');

// Initialize rewarded points and flipped tiles counters
let rewardedPoints = 0;
let flippedTiles = 0;

// Add click event listener to the withdraw button
withdrawButton.addEventListener('click', () => {
  // Redirect user to the withdraw page
  window.location.href = "withdraw.html";
});

// Load reward point history and flipped tiles from local storage
if (localStorage.getItem('rewardedPoints')) {
  rewardedPoints = parseInt(localStorage.getItem('rewardedPoints'));
  updateWallet();
}
let flippedStatus = localStorage.getItem('flippedStatus');
if (!flippedStatus) {
  flippedStatus = Array.from({ length: tiles.length }, () => 'unflipped');
} else {
  flippedStatus = JSON.parse(flippedStatus);
  updateFlippedTilesCount();
}

// Function to update wallet balance display and local storage
function updateWallet() {
  walletBalance.textContent = rewardedPoints;
  localStorage.setItem('rewardedPoints', rewardedPoints);
}

// Function to update flipped tiles count
function updateFlippedTilesCount() {
  flippedTiles = flippedStatus.filter(status => status === 'flipped' || status === 'rewarded').length;
}

// Function to reset game
function resetGame() {
  // Reset flipped status to 'unflipped'
  flippedStatus = Array.from({ length: tiles.length }, () => 'unflipped');
  localStorage.setItem('flippedStatus', JSON.stringify(flippedStatus));
  
  // Reset the game board
  setupGame();
}

// Function to set up the game
function setupGame() {
  // Reset wallet balance and flipped tiles counter
  updateWallet();
  updateFlippedTilesCount();

  // Reset all tiles
  tiles.forEach((tile, index) => {
    tile.classList.remove('flipped');
    tile.innerHTML = ''; // Remove any previous reward text
    tile.style.pointerEvents = 'auto'; // Enable pointer events for all tiles
    if (flippedStatus[index] === 'flipped' || flippedStatus[index] === 'rewarded') {
      tile.classList.add('flipped');
    }
  });

  // Generate random indices for rewarded tiles
  let rewardedIndices = generateRandomIndices(3, tiles.length);

  // Assign direct link and reward to tiles
  tiles.forEach((tile, index) => {
    if (flippedStatus[index] === 'unflipped') {
      if (rewardedIndices.includes(index)) {
        tile.addEventListener('click', () => {
          if (flippedStatus[index] !== 'rewarded') { // Check if the tile hasn't been rewarded before
            // Add rewarded points to virtual wallet
            rewardedPoints += 10;
            updateWallet();
            // Note rewarded points on tile
            const rewardText = document.createElement('div');
            rewardText.classList.add('reward-text');
            rewardText.textContent = '+10';
            tile.appendChild(rewardText);
            // Change tile color when flipped
            tile.classList.add('flipped');
            // Prevent further clicks on the tile
            tile.style.pointerEvents = 'none';
            flippedStatus[index] = 'rewarded';
            localStorage.setItem('flippedStatus', JSON.stringify(flippedStatus));
            updateFlippedTilesCount();
            
          }
        });
      } else {
        // Assign direct link to tile
        tile.addEventListener('click', () => {
          // Change tile color when flipped
          tile.classList.add('flipped');
          // Prevent further clicks on the tile
          tile.style.pointerEvents = 'none';
          // Redirect to direct link
          window.location.href = "https://www.highcpmgate.com/pazsaj4uw?key=96d6b5643981606d838ba9e493e49914";
          flippedStatus[index] = 'flipped';
          localStorage.setItem('flippedStatus', JSON.stringify(flippedStatus));
          updateFlippedTilesCount();
         
        });
      }
    }
  });
}

// Play again button functionality
playAgainButton.addEventListener('click', resetGame);

// Function to generate an array of random indices
function generateRandomIndices(count, total) {
  const indices = [];
  while (indices.length < count) {
    const index = Math.floor(Math.random() * total);
    if (!indices.includes(index)) {
      indices.push(index);
    }
  }
  return indices;
}

// Check if all rewarded tiles are flipped


// Initialize the game
setupGame();
