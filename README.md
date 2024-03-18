# ETH To Do List

## Description

ETH To Do List is a simple web application that leverages the Ethereum blockchain to create, manage, and track tasks. This project serves as a practical exploration of how blockchain technology can be integrated into everyday applications, providing a foundation for understanding and experimenting with decentralized applications (DApps).

## Table of Contents

- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Testing](#testing)

## Installation and Setup

1. **Download Necessary Tools**: Ensure you have Node.js, Ganache, and the Metamask extension installed on your machine.
2. **Clone the Project**: Use the command `git clone https://github.com/lingloktin/eth-todo-list.git` to clone the repository to your local machine.
3. **Install Dependencies**: Navigate to the project directory and run `npm install` to install all required dependencies.
4. **Compile and Migrate**:
   - Compile the smart contracts with `truffle compile`.
   - Migrate the contracts to your local blockchain using `truffle migrate`.
5. **Run the Web Server**: Start the development server with `npm run dev`.
6. **Browse the App**: Open your web browser and navigate to `http://localhost:3000` (or the port specified in your development server configuration) to interact with the application.

## Usage

- **Adding Tasks**: Enter a task description in the input field and click the "Add" button to create a new task.
- **Viewing Tasks**: Tasks will be displayed in the main list. You can mark tasks as completed by clicking the checkbox next to each task.

## Testing

To run tests for the smart contracts, use the command `truffle test`. This will execute all test cases defined in the `test` directory.
