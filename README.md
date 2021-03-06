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
// front-end/src/App.js

import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hello
      </header>
    </div>
  );
}

export default App;

```

```css
// front-end/src/App.css

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
yarn add spectre.css @react-spectre/button @react-spectre/form or npm install spectre.css @react-spectre/button @react-spectre/form --save // this should be install inside front-end folder
```
Step 5: Import CSS library into our application on the top 
```css
// front-end/src/App.css

@import '~spectre.css/dist/spectre.min.css';

```
Step 6: Create a new PostCodeSearch component

```
mkdir src/PostCodeSearch && cd src/PostCodeSearch && touch index.js && cd ../../
```
Step 7: Import PostCodeSearch component into Main App

```js
// front-end/src/PostCodeSearch/index.js

import React from 'react';

export default class PostCodeSearch extends React.Component {
  render() {
    return (<h2>Now you can see PostCodeComponent</h2>);
  }
}

// front-end/src/App.js
import PostCodeSearch from './PostCodeSearch';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to Search
        <PostCodeSearch />
      </header>
    </div>
  );
}

export default App;
```
Step 8: Add PostCode fields and button 

```js
// front-end/src/PostCodeSearch/index.js

import { FormGroup, Input } from '@react-spectre/form';
import { Button } from '@react-spectre/button';
import React from 'react';

export default class PostCodeSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postCode: ''
    };
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <FormGroup label="Postcode">
          <Input 
            name="postCode"
            placeholder="Ex: 6000056" 
            value={this.state.postCode} 
            onChange={event => this.handleChange(event)} />
        </FormGroup>

        <Button primary loading={false}>Search</Button>
      </form>
    );
  }
}
```
Step 9: Add Post Code Validation and Submit Validation 

```js
// front-end/src/PostCodeSearch/index.js

  constructor(props) {
    super(props);

    this.state = {
      postCode: '',
      postCodeError: false
    };
  }
  
  isPostCodeValid = postCode => new RegExp('^[1-9][0-9]{5}$').test(postCode);

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
    
    if (name === 'postCode') {
      this.setState({ 
        postCodeError: !this.isPostCodeValid(value)
      });
    }
    
  }
  
  onSubmit(event) {

    if (this.isPostCodeValid(this.state.postCode)) {
      // Code for ajax
    } else {
      this.setState({ 
        postCodeError: true
      });
    }

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={event => this.onSubmit(event)}>
        <FormGroup label="Postcode" className={ this.state.postCodeError ? 'has-error' : '' }>
          <Input 
            name="postCode"
            placeholder="Ex: 6000056" 
            value={this.state.postCode} 
            onChange={event => this.handleChange(event)} />
          { 
            this.state.postCodeError ? 
              <p className='form-input-hint'>Please enter valid post code</p> : 
              '' 
          }
        </FormGroup>

        <Button primary loading={false}>Search</Button>
      </form>
    );
  }
}
```
Step 10: To Fetch the data, we need API's, so please follow Back End below till Step 5 to create a API and come back here.

```js
// front-end/src/PostCodeSearch/index.js

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      postCode: '',
      postCodeError: false
    };
  }
  
  handleChange(event) {
    ....
    if (name === 'postCode') {
      this.setState({
        data: [],
        error: '',
        postCodeError: !this.isPostCodeValid(value)
      });
    }
  }
  
  async getPostCodeDetails(postcode) {
    const host = 'http://localhost:3002',
      url = `${host}/api/postcode?postcode=${postcode}`;
  
    return await (await (fetch(url))).json();
  }

  async onSubmit(event) {
    event.preventDefault();

    const postCode = this.state.postCode;

    if (this.isPostCodeValid(postCode)) {
      try {
        const { error, data = [] } = await this.getPostCodeDetails(postCode);

        this.setState({ data, error });
      } catch (error) {
        console.error('error', error);
        this.setState({ error });
      }
    } else {
      this.setState({ 
        postCodeError: true
      });
    }
  }
  
  render() {
    return (
      <React.Fragment>
        { 
          this.state.error ? 
            <div className='toast toast-error'>{this.state.error.message}</div> : 
            '' 
        }
        <form onSubmit={event => this.onSubmit(event)}>
          <FormGroup label="Postcode" className={ this.state.postCodeError ? 'has-error' : '' }>
            <Input 
              name="postCode"
              placeholder="Ex: 6000056" 
              value={this.state.postCode} 
              onChange={event => this.handleChange(event)} />
            { 
              this.state.postCodeError ? 
                <p className='form-input-hint'>Please enter valid post code</p> : 
                '' 
            }
          </FormGroup>

          <Button primary loading={false}>Search</Button>
        </form>

        {
          this.state.data.map(({ office, type, district, state }, index) => (
            <div key={index.toString()} className="card bg-primary m-1">
              <div className="card-header">
                <div className="card-title h5">{office}</div>
                <div className="card-subtitle">{type}</div>
              </div>
              <div className="card-body">
                {district}, {state}
              </div>
            </div>
          ))
        }
      </React.Fragment>
    );
  }

```



## Back End

We will be using Express library and Node Js

### How to create ?

Step 1: Installation of [Node JS](https://nodejs.org/en/download/) 

Step 2: Install Express JS and open http://localhost:3002/
```
npx express-generator back-end --no-view && cd back-end && npm i or yarn && npm i cors or yarn add cors
```
```js
// back-end/bin/www
// change 3000 to 3002

var port = normalizePort(process.env.PORT || '3002');

// back-end/app.js
const cors = require('cors');
...
var app = express();

app.use(cors());
app.use(logger('dev'));
```
```
npm start or yarn start
```

Step 3: Create a route postcode api
```
mkdir back-end/routes/postcode && cd back-end/routes/postcode && touch index.js
```
Step 4: Code for postcode. After the every change in the code please stop(cntrl + c) and start (npm start or yarn start) server in terminal or command prompt 
```js
// back-end/routes/postcode/index.js

const router = require('express').Router();

router.get('/', function(req, res, next) {
  res.send('Post code value');
});

module.exports = router;

// back-end/app.js
var usersRouter = require('./routes/users');
const postCodeRouter = require('./routes/postcode');

....

app.use('/users', usersRouter);
app.use('/api/postcode', postCodeRouter);

```
Step 5: Adding logic for getting data based on query params
```js 
// back-end/routes/postcode/index.js

router.get('/', function(request, respond) {
  const postcode = request.query.postcode;
  const postOffices = {
    data: [
      {
        office: 'Iyyappanthangal',
        type: 'Sub Office',
        district: 'Kanchipuram',
        state: 'Tamil Nadu'
      },
      {
        office: 'Kattupakkam',
        type: 'Branch Office',
        district: 'Tiruvallur',
        state: 'Tamil Nadu'
      },
      {
        office: 'Poonamallee East',
        type: 'Sub Office',
        district: 'Tiruvallur',
        state: 'Tamil Nadu'
      },
      {
        office: 'Senneerkuppam',
        type: 'Branch Office',
        district: 'Tiruvallur',
        state: 'Tamil Nadu'
      }
    ]
  };

  if (postcode === '600056') {
    return respond.send(postOffices);
  } else {
    return respond.status(404).send({
      error: {
        message: `The ${postcode} not Found..!`
      }
    });    
  }
  
});
```
Step 6: Install mongodb - [Read More](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) Connecting to mongodb 
```
yarn add mongoose or npm i mongoose
```
```js
//back-end/App.js

const mongoose = require('mongoose');
 
mongoose.connect(
  'mongodb://localhost:27017/postcode', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, 
  err => {
    if (!err) {
      console.log('Successfully Established Connection with MongoDB')
    } else {
      console.log(`Failed to Establish Connection with MongoDB with Error: ${err}`)
    }
  }
);
```
Step 7: Create model for postcode 
```
cd back-end/routes/postcode && touch model.js && cd ../../
```
```js 
// back-end/routes/postcode/model.js 

const { model, Schema } = require('mongoose');

export default model('postpin', new Schema({
  code: {
    type: Number,
    required: 'Post code is missing'
  },
  office: {
    type: String, 
    required: 'Post office is missing'
  },
  district: {
    type: String, 
    required: 'Post district is missing'
  },
  state: {
    type: String, 
    required: 'Post state is missing'
  },
  type: {
    type: String, 
    required: 'Type of post office is missing'
  }
}));
```
Step 8: Insert records for post code 

```
// mongo shell
mongo

> use postcode
> db.postpins.insertMany([
    {
        code: 600056,
        office: 'Iyyappanthangal',
        type: 'Sub Office',
        district: 'Kanchipuram',
        state: 'Tamil Nadu'
      },
      {
        code: 600056,
        office: 'Kattupakkam',
        type: 'Branch Office',
        district: 'Tiruvallur',
        state: 'Tamil Nadu'
      },
      {
        code: 600056,
        office: 'Poonamallee East',
        type: 'Sub Office',
        district: 'Tiruvallur',
        state: 'Tamil Nadu'
      },
      {
        code: 600056,
        office: 'Senneerkuppam',
        type: 'Branch Office',
        district: 'Tiruvallur',
        state: 'Tamil Nadu'
      }
])
```
Step 8: Wiring up model and controller 

```js
// back-end/routes/postcode/index.js 

const router = require('express').Router();
const model = require('./model');

router.get('/', async function(request, respond) {
  const postcode = request.query.postcode;

  try {
    const postOffices = await model.find({ code: postcode })

    if (postOffices && postOffices.length) {
      return respond.send({
        data: postOffices
      });
    } else {
      return respond.status(404).send({
        error: {
          message: `The ${postcode} not Found..!`
        }
      });    
    }
  } catch (error) {
    console.error(error)
    return respond.status(500).send({
      error: {
        message: `Server error ${error}`
      }
    }); 
  }
});

module.exports = router;
```


