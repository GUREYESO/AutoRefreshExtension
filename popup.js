// Declare a variable to hold the interval ID for the auto-refresh functionality
let intervalId;
// Function to toggle auto-refresh on button click
function toggleRefresh() {
    // Get the value of the refresh time input field in minutes
    const refreshTimeInMinutes = parseInt(document.getElementById('refreshTime').value);
    // Convert minutes to milliseconds for setInterval
    const refreshTimeInMillis = refreshTimeInMinutes * 60 * 1000; // Convert minutes to milliseconds
  
    // Get the button element by ID
    const btn = document.getElementById('startStopBtn');
  
    // Check if there's an existing interval (auto-refresh is active)
    if (intervalId) {
      // If auto-refresh is active, clear the interval
      clearInterval(intervalId);
      // Change the button text to 'Start Refresh'
      btn.textContent = 'Start Refresh';
      // Set intervalId to null (indicating no active auto-refresh)
      intervalId = null;
    } else {
      // If auto-refresh is not active, create a new interval
      intervalId = setInterval(() => {
        // Query the active tab in the current window
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          // Reload the first tab's ID (index 0) in the tabs array
          chrome.tabs.reload(tabs[0].id);
        });
      }, refreshTimeInMillis); // Set interval time based on the refreshTime input in minutes (converted to milliseconds)
      // Change the button text to 'Stop Refresh'
      btn.textContent = 'Stop Refresh';
    }
  }
  
  // Add click event listener to the button to trigger the toggleRefresh function
  document.getElementById('startStopBtn').addEventListener('click', toggleRefresh);
  
  
