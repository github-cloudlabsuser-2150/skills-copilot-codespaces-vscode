// function to covert Frahrenheit 
// to Celsius
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

// Driver code
const fahrenheit = 200;
const celsius = fahrenheitToCelsius(fahrenheit);
console.log(`${fahrenheit}°F is equal to ${celsius.toFixed(2)}°C`);