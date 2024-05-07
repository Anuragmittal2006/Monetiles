const tiles = document.querySelectorAll('.tile');
const playAgainButton = document.getElementById('play-again');
const walletBalance = document.getElementById('wallet-balance');

let rewardedPoints = 0;
let flippedTiles = 0; // Keep track of flipped tiles
// Get reference to the withdraw button
const withdrawButton = document.getElementById('withdraw');

// Add click event listener to the withdraw button
withdrawButton.addEventListener('click', () => {
  // Redirect user to the withdraw page
  window.location.href = "withdraw.html";
});

// Load reward point history from local storage
if (localStorage.getItem('rewardedPoints')) {
  rewardedPoints = parseInt(localStorage.getItem('rewardedPoints'));
  updateWallet();
}

function setupGame() {
  // Reset wallet balance
  updateWallet();
  flippedTiles = 0;

  // Generate random indices for direct link tiles and rewarded tiles
  const directLinkIndices = generateRandomIndices(6, 9);
  const rewardedIndices = generateRandomIndices(3, 9);

  // Reset all tiles
  tiles.forEach(tile => {
    tile.classList.remove('flipped');
    tile.innerHTML = ''; // Remove any previous reward text
  });

  // Assign direct link and reward to tiles
  tiles.forEach((tile, index) => {
    if (directLinkIndices.includes(index)) {
      // Assign direct link to tile
      tile.addEventListener('click', () => {
        window.location.href = "https://www.highcpmgate.com/pazsaj4uw?key=96d6b5643981606d838ba9e493e49914";
      });
    } else if (rewardedIndices.includes(index)) {
      // Assign reward to tile
      tile.addEventListener('click', () => {
        // Add rewarded points to virtual wallet
        rewardedPoints += 10;
        updateWallet();
        // Note rewarded points on tile
        const rewardText = document.createElement('div');
        rewardText.classList.add('reward-text');
        rewardText.textContent = '+10';
        tile.appendChild(rewardText);
        tile.classList.add('flipped');
        flippedTiles++;
        checkGameCompletion();
      });
    } else {
      // Empty tile behavior (do nothing)
      tile.addEventListener('click', () => {
        tile.classList.add('flipped');
        flippedTiles++;
        checkGameCompletion();
      });
    }
  });
}

// Update wallet balance display
function updateWallet() {
  walletBalance.textContent = rewardedPoints;
  // Update reward point history in local storage
  localStorage.setItem('rewardedPoints', rewardedPoints);
}

// Check if all tiles are flipped
function checkGameCompletion() {
  if (flippedTiles === 9) {
    // Game completed
    alert("Congratulations! You've flipped all tiles.");
  }
}

// Setup initial game
setupGame();

// Play again button functionality
playAgainButton.addEventListener('click', () => {
  // Reset game
  setupGame();
});

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
