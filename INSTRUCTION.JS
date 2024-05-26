document.addEventListener('DOMContentLoaded', function() {
    // Display welcome message if username is present in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
  
    if (username) {
      const welcomeMessage = document.getElementById('welcome-message');
      welcomeMessage.textContent = `Welcome, ${username}!`;
      welcomeMessage.style.display = 'block';
  
      // Hide the welcome message after 3 seconds
      setTimeout(() => {
        welcomeMessage.style.display = 'none';
      }, 3000);
    }
  
    // Get the modal
    const modal = document.getElementById('instruction-modal');
  
    // Get the <span> element that closes the modal
    const closeBtn = document.getElementsByClassName('close')[0];
  
    // Pages and buttons
    const pages = document.getElementsByClassName('modal-page');
    const nextButtons = document.getElementsByClassName('next-button');
    const prevButtons = document.getElementsByClassName('prev-button');
    const finishButton = document.getElementById('finish');
    const helpButton = document.getElementById('help-button');
  
    // Show the first page onload
    if (shouldShowModal()) {
      modal.style.display = 'block';
      showPage(0);
    }
  
    // Show the specified page
    function showPage(pageIndex) {
      for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
      }
      pages[pageIndex].style.display = 'block';
    }
  
    // Next button click event
    for (let i = 0; i < nextButtons.length; i++) {
      nextButtons[i].onclick = function() {
        showPage(i + 1);
      }
    }
  
    // Previous button click event
    for (let i = 0; i < prevButtons.length; i++) {
      prevButtons[i].onclick = function() {
        showPage(i);
      }
    }
  
    // Finish button click event
    finishButton.onclick = function() {
      modal.style.display = 'none';
      localStorage.setItem('hasSeenInstructions', true);
    }
  
    // Close button click event
    closeBtn.onclick = function() {
      modal.style.display = 'none';
      localStorage.setItem('hasSeenInstructions', true);
    }
  
    // Click outside the modal to close
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
        localStorage.setItem('hasSeenInstructions', true);
      }
    }
  
    // Help button click event to show the modal
    helpButton.onclick = function() {
      modal.style.display = 'block';
      showPage(0);
    }
  
    // Check if the modal should be displayed
    function shouldShowModal() {
      return !localStorage.getItem('hasSeenInstructions');
    }
  });
  
