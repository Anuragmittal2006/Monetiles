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

  // Assign direct links and rewarded tiles
  const directLinkTiles = [0, 1, 2]; // Assuming tiles 0, 1, 2 are direct links
  const rewardedTiles = [3, 4, 5];   // Assuming tiles 3, 4, 5 are rewarded

  // Assign click event to each tile
  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => {
      if (tile.classList.contains('flipped')) return;

      tile.classList.add('flipped');
      tile.style.animation = 'flip 0.5s ease';

      setTimeout(() => {
        if (directLinkTiles.includes(index)) {
          window.location.href = "https://www.highcpmgate.com/pazsaj4uw?key=96d6b5643981606d838ba9e493e49914";
        } else if (rewardedTiles.includes(index)) {
          // Add rewarded points to virtual wallet
          rewardedPoints += 10;
          updateWallet();
          // Note rewarded points on tile
          const rewardText = document.createElement('div');
          rewardText.classList.add('reward-text');
          rewardText.textContent = '+10';
          tile.appendChild(rewardText);
        } else {
          // Handle other tiles if needed
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
