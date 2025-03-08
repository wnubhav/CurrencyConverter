document.getElementById('converterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    // Input Validation
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid positive number.');
        return;
    }

    if (fromCurrency === toCurrency) {
        alert('Please select different currencies for conversion.');
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.rates || !data.rates[toCurrency]) {
                throw new Error(`Exchange rate for ${toCurrency} not found.`);
            }

            const exchangeRate = data.rates[toCurrency];
            const result = amount * exchangeRate;

            document.getElementById('result').innerText = `${amount} ${fromCurrency} is equal to ${result.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerText = 'Conversion failed. Please try again.';
        });
});
