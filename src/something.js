import Observer from './Observable.js'

function updateStockPrices(price) {
    console.log(`Stock Price: $${price}`);
  }
  
  stockObserver.subscribe(updateStockPrices);
  
  // Simulate real-time updates
  setInterval(() => {
    const newPrice = Math.random() * 100;
    stockObserver.notify(newPrice);
  }, 2000);