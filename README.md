# Redux-adjunct

An opinionated set of utilities to make redux applications easier to maintain. Redux-adjunct reduces the boilerplate
required to write reducers and encourages developers to organize their code around features instead of splitting
code based on technical details.

It encourages functional programming by exporting only pure and curried functions.

## Motivation

Redux is a great tool, too often underestimated. Recently, we've seen many people move away from Redux,
as it has a reputation for being cumberstone and hard to get into. The boilerplate required to create action types,
actions and reducers can be frustrating. This is an attempt at reducing this boilerplate by providing a set of simple tools
that make writing Redux apps faster.

Concision is its own reward.

## Install

``` javacript
npm install redux-adjunct
```

``` javacript
yarn add redux-adjunct
```

## Write concise reducers with less effort

Redux-adjunct allows you to create namespaced action types and their associated action creators in a single line.

``` javascript
import { createAction } from 'redux-adjunct';

// All actions related to a single feature are namespaced so they can be eaily debugged using devtools
const action = createAction('user');

const [SET_USERNAME, setUsername] = createAction('SET_USERNAME');
const [SET_EMAIL, setEmail] = createAction('SET_EMAIL');

setUsername('gbogard') // => { type: 'user.SET_USERNAME', payload: 'gbogard' }
```

Reducers are also cleaner. You can turn this :

``` javascript
const initialState = {
  username: '',
  email: '',
}

function myReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USERNAME:
      return { ...state, username: payload };
    default:
      return state;
  }
}

```

Into this

``` javascript
import { createReducer, setter } from 'redux-adjunct';

const initialState = {
  username: '',
  email: '',
}

const myReducer = createReducer(initialstate, {
  [SET_USERNAME]: setter('username')
})
```

### Setters

The `setter` method returns a method that, given a state and a payload, will set a single property
of your state to the payload. Its signature allows for direct use in reducers created with `createReducer`.

You can use it on a top-level property :

``` javascript
createReducer(initialstate, {
  [SET_PROFILE]: setter('profile')
})
```

Or you can update a path :

``` javascript
createReducer(initialstate, {
  [SET_USERNAME]: setter('profile', 'details', 'username')
})
```

Note that when dealing with arrays you can also use the index of the element you wish to update.

## Focus on features

Through concision, redux-adjunct enables to put action types, action creators and reducers together in a single file
based on the feature they relate to. This allows to think in a _feature-centric_ way, where instead of having a hierarchy
that looks like this :

```
- actionCreators
--- users
--- pictures
--- videos
- actionTypes
--- users
--- pictures
--- videos
- reducers
--- users
--- pictures
--- videos
```

You can make your file structure look like this :

```
- users
- pictures
- videos
```

No more folding and unfolding to see all your files when your application grows. Everything is at the write place. This
encourages developers to think of features as self-sufficient _modules_ that can be taken in or out at any given time.

## Running tests

`npm run test`
