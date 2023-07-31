const apiUrl = 'https://api.coinlore.net/api/tickers/';

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.data; // Return the array of cryptocurrencies
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of an error
  }
}

// Function to display top 5 cryptocurrencies
function displayTop5Cryptos(cryptos) {
  const top5ListElement = document.getElementById('top5List');

  // Sort the cryptocurrencies based on market cap
  cryptos.sort((a, b) => b.market_cap_usd - a.market_cap_usd);

  // Take the top 5 cryptocurrencies from the sorted list
  const top5Cryptos = cryptos.slice(0, 5);

  // Generate HTML for displaying each cryptocurrency
  const top5HTML = top5Cryptos.map(crypto => `
    <div>
      <h3>${crypto.name} (${crypto.symbol})</h3>
      <p>Price: $${crypto.price_usd}</p>
      <p>Market Cap: $${crypto.market_cap_usd}</p>
      <p>Trade Volume: $${crypto.volume24}</p>
      <p>Percent Change (7d): ${crypto.percent_change_7d}%</p>
      <p>Percent Change (24h): ${crypto.percent_change_24h}%</p>
    </div>
  `).join('');

  // Set the HTML to the top5ListElement
  top5ListElement.innerHTML = top5HTML;
}

// Watchlist array to store added cryptocurrencies
let watchlist = [];

// Function to display the watchlist
function displayWatchlist() {
  const watchlistElement = document.getElementById('watchlist');

  const watchlistHTML = watchlist.map(crypto => `
    <div data-id="${crypto.id}">
      <h3>${crypto.name} (${crypto.symbol})</h3>
      <p>Price: $${crypto.price_usd}</p>
      <p>Market Cap: $${crypto.market_cap_usd}</p>
      <p>Trade Volume: $${crypto.volume24}</p>
      <p>Percent Change (7d): ${crypto.percent_change_7d}%</p>
      <p>Percent Change (24h): ${crypto.percent_change_24h}%</p>
      <button class="removeButton">Remove</button>
    </div>
  `).join('');

  watchlistElement.innerHTML = watchlistHTML;
}

// Function to add a cryptocurrency to the watchlist
function addToWatchlist(crypto) {
  const cryptoId = crypto.id; // Assuming `id` is the unique identifier for each cryptocurrency
  const isCryptoInWatchlist = watchlist.some(item => item.id === cryptoId);

  if (!isCryptoInWatchlist) {
    watchlist.push(crypto);
    displayWatchlist();
  }
}

// Function to remove a cryptocurrency from the watchlist
function removeFromWatchlist(cryptoId) {
  watchlist = watchlist.filter(item => item.id !== cryptoId);
  displayWatchlist();
}

// Function to add a cryptocurrency to the watchlist by rank
async function addCryptoByRank() {
  const rankInput = document.getElementById('rankInput').value;
  if (!rankInput || isNaN(rankInput)) {
    alert('Please enter a valid rank (1-100).');
    return;
  }

  const rank = parseInt(rankInput, 10);
  if (rank < 1 || rank > 100) {
    alert('Please enter a valid rank (1-100).');
    return;
  }

  try {
    const cryptos = await fetchData();
    const selectedCrypto = cryptos.find(crypto => crypto.rank === rank);

    if (selectedCrypto) {
      addToWatchlist(selectedCrypto);
    } else {
      alert(`Cryptocurrency with rank ${rank} not found.`);
    }
  } catch (error) {
    console.error('Error adding cryptocurrency by rank:', error);
  }
}

// Function to set up event listeners for the watchlist
function setupWatchlistEventListeners() {
  const watchlistElement = document.getElementById('watchlist');

  watchlistElement.addEventListener('click', event => {
    if (event.target.classList.contains('removeButton')) {
      const cryptoElement = event.target.closest('[data-id]');
      if (cryptoElement) {
        const cryptoId = cryptoElement.getAttribute('data-id');
        removeFromWatchlist(cryptoId);
      }
    }
  });
}

// Call the fetchData function, display the top 5, and set up the watchlist
fetchData().then(cryptos => {
  displayTop5Cryptos(cryptos);
  cryptos.slice(0, 5).forEach(crypto => addToWatchlist(crypto));
  displayWatchlist();
  setupWatchlistEventListeners(); // Setup the event listeners after displaying the watchlist
}).catch(error => console.error('Error initializing:', error));




















/*const apiUrl = 'https://api.coinlore.net/api/tickers/';

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.data; // Return the array of cryptocurrencies
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of an error
  }
}

// Function to display top 5 cryptocurrencies
function displayTop5Cryptos(cryptos) {
  const top5ListElement = document.getElementById('top5List');

  // Sort the cryptocurrencies based on market cap
  cryptos.sort((a, b) => b.market_cap_usd - a.market_cap_usd);

  // Take the top 5 cryptocurrencies from the sorted list
  const top5Cryptos = cryptos.slice(0, 5);

  // Generate HTML for displaying each cryptocurrency
  const top5HTML = top5Cryptos.map(crypto => `
    <div>
      <h3>${crypto.name} (${crypto.symbol})</h3>
      <p>Price: $${crypto.price_usd}</p>
      <p>Market Cap: $${crypto.market_cap_usd}</p>
      <p>Trade Volume: $${crypto.volume24}</p>
      <p>Percent Change (7d): ${crypto.percent_change_7d}%</p>
      <p>Percent Change (24h): ${crypto.percent_change_24h}%</p>
    </div>
  `).join('');

  // Set the HTML to the top5ListElement
  top5ListElement.innerHTML = top5HTML;
}

// Watchlist array to store added cryptocurrencies
let watchlist = [];

// Function to display the watchlist
function displayWatchlist() {
  const watchlistElement = document.getElementById('watchlist');

  const watchlistHTML = watchlist.map(crypto => `
    <div data-id="${crypto.id}">
      <h3>${crypto.name} (${crypto.symbol})</h3>
      <p>Price: $${crypto.price_usd}</p>
      <p>Market Cap: $${crypto.market_cap_usd}</p>
      <p>Trade Volume: $${crypto.volume24}</p>
      <p>Percent Change (7d): ${crypto.percent_change_7d}%</p>
      <p>Percent Change (24h): ${crypto.percent_change_24h}%</p>
      <button class="removeButton">Remove</button>
    </div>
  `).join('');

  watchlistElement.innerHTML = watchlistHTML;
}

// Function to add a cryptocurrency to the watchlist
function addToWatchlist(crypto) {
  const cryptoId = crypto.id; // Assuming `id` is the unique identifier for each cryptocurrency
  const isCryptoInWatchlist = watchlist.some(item => item.id === cryptoId);

  if (!isCryptoInWatchlist) {
    watchlist.push(crypto);
    displayWatchlist();
  }
}

// Function to remove a cryptocurrency from the watchlist
function removeFromWatchlist(cryptoId) {
  watchlist = watchlist.filter(item => item.id !== cryptoId);
  displayWatchlist();
}

// Function to set up event listeners for the watchlist
function setupWatchlistEventListeners() {
  const watchlistElement = document.getElementById('watchlist');

  watchlistElement.addEventListener('click', event => {
    if (event.target.classList.contains('removeButton')) {
      const cryptoElement = event.target.closest('[data-id]');
      if (cryptoElement) {
        const cryptoId = cryptoElement.getAttribute('data-id');
        removeFromWatchlist(cryptoId);
      }
    }
  });
}

// Call the fetchData function, display the top 5, and set up the watchlist
fetchData().then(cryptos => {
  displayTop5Cryptos(cryptos);
  cryptos.slice(0, 5).forEach(crypto => addToWatchlist(crypto));
  displayWatchlist();
  setupWatchlistEventListeners(); // Setup the event listeners after displaying the watchlist
}).catch(error => console.error('Error initializing:', error));*/
