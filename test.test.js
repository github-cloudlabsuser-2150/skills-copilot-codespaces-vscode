const { jest } = require('@jest/globals');
const { calculator } = require('./test.js');

// test.test.js

describe('Calculator Tests', () => {
    let promptMock, alertMock;

    beforeEach(() => {
        // Mock prompt and alert
        promptMock = jest.spyOn(global, 'prompt').mockImplementation();
        alertMock = jest.spyOn(global, 'alert').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Addition operation', () => {
        promptMock
            .mockReturnValueOnce('1') // Select addition
            .mockReturnValueOnce('5') // Exit
            .mockReturnValueOnce('3') // First number
            .mockReturnValueOnce('7'); // Second number

        calculator();

        expect(alertMock).toHaveBeenCalledWith('Result: 3 + 7 = 10');
    });

    test('Subtraction operation', () => {
        promptMock
            .mockReturnValueOnce('2') // Select subtraction
            .mockReturnValueOnce('5') // Exit
            .mockReturnValueOnce('10') // First number
            .mockReturnValueOnce('4'); // Second number

        calculator();

        expect(alertMock).toHaveBeenCalledWith('Result: 10 - 4 = 6');
    });

    test('Multiplication operation', () => {
        promptMock
            .mockReturnValueOnce('3') // Select multiplication
            .mockReturnValueOnce('5') // Exit
            .mockReturnValueOnce('6') // First number
            .mockReturnValueOnce('7'); // Second number

        calculator();

        expect(alertMock).toHaveBeenCalledWith('Result: 6 * 7 = 42');
    });

    test('Division operation', () => {
        promptMock
            .mockReturnValueOnce('4') // Select division
            .mockReturnValueOnce('5') // Exit
            .mockReturnValueOnce('8') // First number
            .mockReturnValueOnce('2'); // Second number

        calculator();

        expect(alertMock).toHaveBeenCalledWith('Result: 8 / 2 = 4');
    });

    test('Division by zero', () => {
        promptMock
            .mockReturnValueOnce('4') // Select division
            .mockReturnValueOnce('5') // Exit
            .mockReturnValueOnce('8') // First number
            .mockReturnValueOnce('0'); // Second number

        calculator();

        expect(alertMock).toHaveBeenCalledWith('Error: Division by zero is not allowed.');
    });

    test('Invalid operation input', () => {
        promptMock
            .mockReturnValueOnce('invalid') // Invalid operation
            .mockReturnValueOnce('5'); // Exit

        calculator();

        expect(alertMock).toHaveBeenCalledWith('Invalid choice. Please select a valid operation.');
    });

    test('Invalid number input', () => {
        promptMock
            .mockReturnValueOnce('1') // Select addition
            .mockReturnValueOnce('5') // Exit
            .mockReturnValueOnce('invalid') // First number
            .mockReturnValueOnce('7'); // Second number

        calculator();

        expect(alertMock).toHaveBeenCalledWith('Invalid input. Please enter valid numbers.');
    });

    test('Exit functionality', () => {
        promptMock.mockReturnValueOnce('5'); // Exit

        calculator();

        expect(alertMock).toHaveBeenCalledWith('Thank you for using the calculator. Goodbye!');
    });
});