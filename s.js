const tiles = document.querySelectorAll('.tile');
const playAgainButton = document.getElementById('play-again');
const walletBalance = document.getElementById('wallet-balance');
const withdrawButton = document.getElementById('withdraw');
let rewardedPoints = 0;
let flippedTiles = 0;
let tilesClickable = true; // Variable to track whether tiles are clickable
let rewardedIndices = []; // Global variable to store rewarded indices
let linkIndices = []; // Global variable to store link indices


// Add click event listener to the withdraw button
withdrawButton.addEventListener('click', () => {
  // Redirect user to the withdraw page
  window.location.href = "withdraw.html";
});

let flippedStatus = localStorage.getItem('flippedStatus');
if (!flippedStatus) {
  flippedStatus = Array.from({ length: tiles.length }, () => 'unflipped');
} else {
  flippedStatus = JSON.parse(flippedStatus);
  updateFlippedTilesCount();
  renderFlippedTiles(); // Render flipped tiles based on stored status
}

// Function to update wallet balance display and local storage
function updateWallet() {
  walletBalance.textContent = rewardedPoints;
  if (window.updateUserWalletBalance) {
    window.updateUserWalletBalance(rewardedPoints); // Update the database
  }
  console.log("Wallet updated: ", rewardedPoints);
}

// Function to fetch the initial wallet balance
function fetchUserWalletBalance() {
  if (window.fetchUserWalletBalance) {
    window.fetchUserWalletBalance().then(balance => {
      rewardedPoints = balance;
      updateWallet();
      console.log("Fetched wallet balance: ", balance);
    }).catch(error => {
      console.error("Error fetching wallet balance: ", error);
    });
  } else {
    console.error("fetchUserWalletBalance function not found");
  }
}

// Function to update flipped tiles count
function updateFlippedTilesCount() {
  flippedTiles = flippedStatus.filter(status => status === 'flipped' || status === 'rewarded').length;
}

// Function to reset the game
function resetGame() {
  // Reset flipped status to 'unflipped'
  flippedStatus = Array.from({ length: tiles.length }, () => 'unflipped');
  localStorage.setItem('flippedStatus', JSON.stringify(flippedStatus));

  // Reset the game board and randomize tiles
  setupGame(true);
}

// Function to render flipped tiles based on stored status
function renderFlippedTiles() {
  tiles.forEach((tile, index) => {
    if (flippedStatus[index] === 'flipped' || flippedStatus[index] === 'rewarded') {
      tile.classList.add('flipped');
      if (flippedStatus[index] === 'rewarded') {
        const rewardText = document.createElement('div');
        rewardText.classList.add('reward-text');
        rewardText.textContent = '+10';
        tile.appendChild(rewardText);
      }
    }
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
    linkIndices = generateRandomIndices(6, tiles.length, rewardedIndices); // 3 tiles for links + 3 tiles for rewards = 6 total indices
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
        } else if (linkIndices.includes(index)) {
          // Handle link tile click
          const link = getLinkByIndex(index);
          openLinkInBackground(link);
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

  // Render flipped tiles based on stored status
  renderFlippedTiles();
}

// Function to open a link in a new tab in the background
function openLinkInBackground(url) {
  const newTab = window.open(url, '_blank');
  newTab.blur(); // Move focus to the new tab
}

// Play again button functionality
playAgainButton.addEventListener('click', () => {
  // Reset game logic
  resetGame();
  // Reload the page after resetting the game
  setTimeout(() => {
    window.location.reload();
  }, 500); // Short delay to ensure resetGame completes
});

// Function to generate an array of random indices, ensuring no overlap
function generateRandomIndices(count, total, excludeIndices = []) {
  const indices = [];
  while (indices.length < count) {
    const index = Math.floor(Math.random() * total);
    if (!indices.includes(index) && !excludeIndices.includes(index)) {
      indices.push(index);
    }
  }
  return indices;
}

// Function to get a link based on the index
function getLinkByIndex(index) {
  const links = ["https://www.highrevenuenetwork.com/pazsaj4uw?key=96d6b5643981606d838ba9e493e49914"
     ];
  return links[index % links.length];
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

setTimeout(() => {
  console.log("Starting game setup after delay...");
  setupGame(true); // Initialize with randomization
}, 4000); // 3 seconds delay

// Call the function to fetch the initial wallet balance
fetchUserWalletBalance();
console.log("Initial wallet balance fetch called");