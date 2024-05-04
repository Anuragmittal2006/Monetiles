const tiles = document.querySelectorAll('.tile');
const playAgainButton = document.getElementById('play-again');
const walletBalance = document.getElementById('wallet-balance');

let rewardedPoints = 0;

// Load reward point history from local storage
if (localStorage.getItem('rewardedPoints')) {
  rewardedPoints = parseInt(localStorage.getItem('rewardedPoints'));
  updateWallet();
}

function setupGame() {
  // Reset wallet balance
  rewardedPoints = 0;
  updateWallet();

  // Generate random indices for direct link tiles and rewarded tiles
  const directLinkIndices = generateRandomIndices(6, 9);
  const rewardedIndices = generateRandomIndices(3, 9);

  // Assign click event to each tile
  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => {
      if (tile.classList.contains('flipped')) return;

      tile.classList.add('flipped');
      tile.style.animation = 'flip 0.5s ease';

      setTimeout(() => {
        if (directLinkIndices.includes(index)) {
          window.location.href = "https://www.highcpmgate.com/pazsaj4uw?key=96d6b5643981606d838ba9e493e49914";
        } else if (rewardedIndices.includes(index)) {
          // Add rewarded points to virtual wallet
          rewardedPoints += 10;
          updateWallet();
          // Note rewarded points on tile
          const rewardText = document.createElement('div');
          rewardText.classList.add('reward-text');
          rewardText.textContent = '+10';
          tile.appendChild(rewardText);
        } else {
          // Non-rewarded tile behavior (do nothing)
        }
      }, 500);
    });
  });
}

// Update wallet balance display
function updateWallet() {
  walletBalance.textContent = rewardedPoints;
  // Update reward point history in local storage
  localStorage.setItem('rewardedPoints', rewardedPoints);
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
