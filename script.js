// Define variables
const tiles = document.querySelectorAll('.tile');
const playAgainButton = document.getElementById('play-again');
const walletBalance = document.getElementById('wallet-balance');
const withdrawButton = document.getElementById('withdraw');
let rewardedPoints = 0;
let flippedTiles = 0;
let tilesClickable = true; // Variable to track whether tiles are clickable
let rewardedIndices = []; // Global variable to store rewarded indices

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
  
  // Reset the game board and randomize tiles
  setupGame(true);
  // Play again button functionality
playAgainButton.addEventListener('click', () => {
  // Reset game logic
  resetGame();
  
  // Reload the page to increase page views
  setTimeout(() => {
    window.location.reload();
  }, 500); // Short delay to ensure resetGame completes
});
}

// Function to set up the game
function setupGame(randomize = false) {
  // Reset wallet balance and flipped tiles counter
  updateWallet();
  updateFlippedTilesCount();

  // Reset all tiles
  tiles.forEach((tile, index) => {
    tile.classList.remove('flipped');
    tile.innerHTML = ''; // Remove any previous reward text
    tile.style.pointerEvents = 'auto'; // Enable pointer events for all tiles
  });

  // Generate random indices for rewarded tiles if needed
  if (randomize) {
    rewardedIndices = generateRandomIndices(3, tiles.length);
  }

  // Assign click event listener to tiles
  tiles.forEach((tile, index) => {
    tile.onclick = () => {
      // Check if tiles are clickable
      if (!tilesClickable) return;

      // Disable other tiles
      tilesClickable = false;

      // Process click event for the clicked tile
      if (flippedStatus[index] === 'unflipped') {
        if (rewardedIndices.includes(index)) {
          // Handle rewarded tile click
          rewardedPoints += 10;
          updateWallet();
          // Note rewarded points on tile
          const rewardText = document.createElement('div');
          rewardText.classList.add('reward-text');
          rewardText.textContent = '+10';
          tile.appendChild(rewardText);
          // Change tile color when flipped
          tile.classList.add('flipped');
          flippedStatus[index] = 'rewarded';
        } else {
          // Handle link tile click
          openLinkInBackground("https://www.highcpmgate.com/pazsaj4uw?key=96d6b5643981606d838ba9e493e49914");
          tile.classList.add('flipped');
          flippedStatus[index] = 'flipped';
        }
        // Update flipped tiles count and store flipped status
        localStorage.setItem('flippedStatus', JSON.stringify(flippedStatus));
        updateFlippedTilesCount();
      }

      // Re-enable tiles after a short delay (adjust the delay as needed)
      setTimeout(() => {
        tilesClickable = true;
      }, 2000);
    };
  });
}

// Function to open a link in a new tab in the background
function openLinkInBackground(url) {
  const newTab = window.open(url, '_blank');
  newTab.blur(); // Move focus to the new tab
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

// Function to toggle hamburger menu visibility
function toggleMenu() {
  const menuItems = document.querySelector('.menu-items');
  const hamburgerIcon = document.querySelector('.hamburger-icon');

  if (menuItems && hamburgerIcon) {
    menuItems.classList.toggle('active');
    hamburgerIcon.classList.toggle('active');
  }
}

// Event listener for hamburger icon click
const hamburgerIcon = document.querySelector('.hamburger-icon');
if (hamburgerIcon) {
  hamburgerIcon.addEventListener('click', toggleMenu);
}

// Initialize the game
setupGame(true); // Initialize with randomization
