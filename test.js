// A simple calculator program in JavaScript
function calculator() {
    while (true) {
        // Display options to the user
        const operation = prompt(
            "Calculator Menu:\n" +
            "1. Addition (+)\n" +
            "2. Subtraction (-)\n" +
            "3. Multiplication (*)\n" +
            "4. Division (/)\n" +
            "5. Exit\n" +
            "Enter the number corresponding to the operation:"
        );

        // Exit the program if the user chooses option 5
        if (operation === "5") {
            alert("Thank you for using the calculator. Goodbye!");
            break;
        }

        // Validate the operation input
        if (!["1", "2", "3", "4"].includes(operation)) {
            alert("Invalid choice. Please select a valid operation.");
            continue;
        }

        // Get the two numbers from the user
        const num1 = parseFloat(prompt("Enter the first number:"));
        const num2 = parseFloat(prompt("Enter the second number:"));

        // Validate the numbers
        if (isNaN(num1) || isNaN(num2)) {
            alert("Invalid input. Please enter valid numbers.");
            continue;
        }

        // Perform the selected operation
        let result;
        switch (operation) {
            case "1":
                result = num1 + num2;
                alert(`Result: ${num1} + ${num2} = ${result}`);
                break;
            case "2":
                result = num1 - num2;
                alert(`Result: ${num1} - ${num2} = ${result}`);
                break;
            case "3":
                result = num1 * num2;
                alert(`Result: ${num1} * ${num2} = ${result}`);
                break;
            case "4":
                if (num2 === 0) {
                    alert("Error: Division by zero is not allowed.");
                } else {
                    result = num1 / num2;
                    alert(`Result: ${num1} / ${num2} = ${result}`);
                }
                break;
        }
    }
}

// Run the calculator
calculator();