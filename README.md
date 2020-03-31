# MERN Stack 

Mongo Express React Node (MERN) is web stack we will be using there

## Objective 

Create a simple post code search, which will have two screen.

Screen 1 for fetching post detail from the data base. Input will be post code. Output will be details
Screen 2 for adding postcode and detail into the data base. Input will be post code and details. Output will be Successfull message.

## Despcrition 

| Technologies  | Type          |
| ------------- |:-------------:|
| Mongo         | Database      |
| Express       | Back End      |
| React         | Front End     |
| Node          | Back End      |

## Front End 

We are using react JavaScript libary as a front end.


### How to create ?

Step 1: Create React project. Below code will install all dependencies
```
npx create-react-app front-end
```
Step 2: To Start the application. (this will automatically opens React app on the browsers in new window) 
```
cd front-end && npm start or yarn start
```
Step 3: Remove unwanted code, after removing  
```js
// App.js

import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;

```

```css
// App.css

.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
```
Step 4: Install CSS library we are going to use spectre here 
```
yarn add spectre.css @react-spectre/button or npm install spectre.css @react-spectre/button --save // this should be install inside front-end folder
```
Step 5: Import CSS library into our application on the top 
```css
// App.css

@import '~spectre.css/dist/spectre.min.css';

```





