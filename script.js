 document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.tile');
  const playAgainButton = document.getElementById('play-again');
  const walletBalance = document.getElementById('wallet-balance');
  const withdrawButton = document.getElementById('withdraw');
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const menuItems = document.querySelector('.menu-items');
  let rewardedPoints = 0;
  let flippedTiles = 0;
  let tilesClickable = true;

  // Toggle hamburger menu visibility
  function toggleMenu() {
      menuItems.classList.toggle('active');
      hamburgerIcon.classList.toggle('active');
  }

  // Add click event listener to the hamburger icon
  hamburgerIcon.addEventListener('click', toggleMenu);

  // Function to update wallet balance display
  function updateWallet() {
      walletBalance.textContent = rewardedPoints;
  }

  // Function to update flipped tiles count
  function updateFlippedTilesCount() {
      flippedTiles = Array.from(tiles).filter(tile => tile.classList.contains('flipped') || tile.classList.contains('reward')).length;
  }

  // Function to check if all tiles are flipped
  function checkAllTilesFlipped() {
      if (flippedTiles === tiles.length) {
          tilesClickable = false;
          playAgainButton.style.display = 'block';
      }
  }

  // Function to reset the game
  function resetGame() {
      rewardedPoints = 0;
      flippedTiles = 0;
      tilesClickable = true;
      updateWallet();
      tiles.forEach(tile => {
          tile.classList.remove('flipped', 'reward');
      });
      playAgainButton.style.display = 'none';
  }

  // Assign click event listener to tiles
  tiles.forEach((tile, index) => {
      tile.addEventListener('click', () => {
          if (!tilesClickable) {
              return; // If tiles are not clickable, do nothing
          }
          if (!tile.classList.contains('flipped')) {
              tile.classList.add('flipped');
              flippedTiles++;
              updateFlippedTilesCount();
              checkAllTilesFlipped();
              if (index % 2 === 0) { // Example condition for rewarded tiles
                  tile.classList.add('reward');
                  rewardedPoints += 10;
                  updateWallet();
              }
          }
      });
  });

  // Play again button functionality
  playAgainButton.addEventListener('click', resetGame);
});
