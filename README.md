# Redux-adjunct

An opinionated set of utilities to make redux applications easier to maintain. Redux-adjunct reduces the boilerplate
required to write reducers and encourages developers to organize their code around features instead of splitting
code based on technical details.

It encourages functional programming by exporting only pure and curried functions.

## Motivation

Redux is a great tool, too often underestimated. Recently, we've seen many people move away from Redux,
as it has a reputation for being cumberstone and hard to get into. The boilerplate required to create action types,
actions and reducers can be frustrating. This is attempt at reducing this boilerplate by providing a set of simple tools
that make writing Redux apps faster. It also enforces correctness and documentation for actions and action types.

I belive concision is its own reward, so the library is highly motivated by the satisfaction of being able to write
reducers in very few lines.

## Install

``` javacript
npm install redux-adjunct
```

``` javacript
yarn add redux-adjunct
```

## Write action creators and enforce corectness

Redux-adjunct allows you to create namespaced  action types and their associated action creators in a single line.

``` javascript
import { createAction } from 'redux-adjunct';

// All actions related to a single feature are namespaced so they can be eaily debugged using devtools
const action = createActionSpec('user');

const [SET_USERNAME, setUsername] = createAction('SET_USERNAME');
const [SET_EMAIL, setEmail] = createAction('SET_EMAIL');

setUsername('gbogard') // => { type: 'user.SET_USERNAME', payload: 'gbogard' }
```

### Validating the payload of your actions

In a weakly typed language like Javacript, it's common to forget a property or to put a number in place of a string.
Redux-adjunct can enforce payload correctness at runtime to catch most of those errors during development. Note that 
this feature is completely opt-in. 

The `createActionSpec` function works just like `createAction`, except it accepts one more argument in the form of a
predicate. You need to provide a function that given the action's payload will return either true or false to indicate
whether the payload is correct. You can put any validation logic you'd like, put redux-adjunct provides several ready to use
predicates for you.

``` javascript
import { createActionSpec, isNumber, isString } from 'redux-adjunct';

const action = createAction('user');

// Age must be a number
const [SET_AGE, setAge] = createAction('SET_AGE', isNumber);

// Username must be a string
const [SET_USERNAME, setUsername] = createAction('SET_USERNAME', isString);

setUsername('gbogard') // => { type: 'user.SET_USERNAME', payload: 'gbogard' }
setUsername(42) // Throws an exception in development mode
```

Redux-adjunct provides a helpful `hasShape` predicate that can enforce a predicate for each
key of an object.

``` javascript
import { createActionSpec, isNumber, isString, hasShape } from 'redux-adjunct';

const action = createAction('user');
const [SET_USER, setUser] = createAction('SET_USER', hasShape({
  username: isString,
  age: isNumber,
}));
```

#### Combining predicates with logical combinators

Redux-adjunct provide `and` and  `or` functions that allows you to combine predicates into a single one.

``` javascript
import { createActionSpec, hasShape, isNumber, isUndefined, or } from 'redux-adjunct';

const action = createAction('user');
const [SET_USER, setUser] = createAction('SET_USER', hasShape({
  age: or(isNumber, isUndefined), // Age is optional
}));
```

Redux-adjunct comes with various types predicates like `isString`, `isFunction`, `isBoolean` that also
come in the form `isStringOrUndefined`, `isFunctionOrUndefined`, `isBooleanOrUndefined`.

`and` allows you to specify multiple requirements for your payload 

``` javascript
import { createActionSpec, isString, hasMinlength, and } from 'redux-adjunct';

const action = createAction('user');
const [SET_USERNAME, setUserName] = createAction('SET_USERNAME', and(isString, hasMinlength(8)));
```

## Write concise reducers with less effort

A reducer is merely a function that takes an action and the current state and returns a new state. The
logic inside a reducer can be anything as long as the function remains pure. Howevwer, a very common pattern
in Redux is to `switch` over the action's type and return the appropriate state for each action :

``` javascript
const initialState = {
  isOpen: false,
}

function myReducer(state = initialState, { type, payload }) {
  switch (type) {
    case OPEN:
      return { ...state, isOpen: true };
    default:
      return state;
  }
}
```

Redux-adjunct allows you to write reducers as a map from action types to pure functions, elminating the
need for the verbose switch syntax. 

``` javascript
import { createReducer, setter } from 'redux-adjunct';

const initialState = {
  isOpen: false,
}

const myReducer = createReducer(initialstate, {
  [OPEN]: state => ({ ...state, isOpen: true }),
})
```

Functions in reducers receive both the current state and the `payload` of the action as arguments.

Combined with a functional programming library like [Ramda](https://ramdajs.com/), you get the ability to write
powerful transforms in a very clean and concise manner :

``` javascript
import { createReducer, setter } from 'redux-adjunct';
import { evolve, not } from 'ramda';

const initialState = {
  isOpen: false,
}

const myReducer = createReducer(initialstate, {
  [TOGGLE]: evolve({ isOpen: not }),
})
```

In this case, `evolve({ isOpen: not })` is equivalent to `state => ({ ...state, isOpen: !state.isOpen })`.

### Setters

The `setter` method returns a method that, given a state and a payload, will set a single property
of your state to the payload. It's signature allows for direct use in reducers created with `createReducer`.

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
