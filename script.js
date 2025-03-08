setInterval(function() {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            // Update exchange rates in your app
        })
        .catch(error => console.error('Error:', error));
}, 60000); // Update every minute
