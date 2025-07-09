# MapDemo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.13.

## How to Install Dependencies

Make sure you have Node.js (v16 or higher) and npm installed.

In your project directory, run:
```bash
npm install
```

## How to Run the Project

To start the development server, run:
```bash
ng serve
```
Then open your browser at [http://localhost:4200/](http://localhost:4200/).

## How to Run Unit Tests

To run unit tests, use:
```bash
npm test
```

## Additional Setup Instructions

- If you are running the project for the first time on Windows and get a script execution error, open PowerShell as Administrator and run:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```
- Make sure you are connected to the internet to load map tiles from OpenStreetMap.
- For any code changes, the app will reload automatically (Hot Reload).


Note: If this were a real-world project, I would replace the use of localStorage with a proper backend service to manage feature persistence. On the client side, I would use HttpClient along with RxJS for handling data flows - or integrate NgRx for more robust state management if the app scales further.


Good luck!