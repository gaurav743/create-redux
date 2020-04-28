///////////////////////////REDUX Library Code - Start ////////////////////////////////////

/*   
    Function to emulate Redux store. A Redux store has following feature
    1) state tree that stores complete state of store.
    2) return current state.
    3) Allow subscribing to changes in state.
    4) Update state
*/

function createStore(reducer){
    //state tree.
    let state

    //There can be multiple events/clients that want to be notified every time state of store changes. We store them in an array here. In this case this will be 
    //an array of listener functions.
    let listeners = []

    //Return current state.
    const getState = () => state
    
    const subscribe = (listener) => {
        listeners.push(listener) //All listeners added to listeners[] array will be notified when state changes.

        //This returns an anonymous function that on invoking will remove current listener from listeners array.
        return () => listeners = listeners.filter( l => l != listener )
    }

    const dispatch = (action) => { //dispatch function is responsible for updating the state of the store. It takes action as the argument.
        state = reducer(state, action)
        listeners.forEach((listener) => listener()) //Once, state is updated all listeners must be notified. In this case we are invoking
                                                    //all listeners as they are functions.
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

///////////////////////////REDUX Library Code - End ////////////////////////////////////

/////////////////////////User Invoked Code /////////////////////////////////////////////

//Instantiate store
const store = createStore(app)

//Listner 1
store.subscribe( () => {
    console.log("The new state is", store.getState())
})

//Listener 2. unsubscribe will store function to unsubscribe as variable.
const unsubscribe = store.subscribe( setTimeout (() => {
    console.log("The state is updated.....")
}, 100))


//This will invoke the anonymous function and will remove listener 2 from the array of listeners from store.
unsubscribe()


//Reducer TODOS function. A reducer function takes a state and action that will modify the state and return modified state.
//A reducer must be a pure function.
function todos(state = [], action){
    switch(action.type){
        case 'ADD_TODO':
            return state.concat(action.todo)
        case 'REMOVE_TODO':
            return state.filter( todo => todo.id != action.id)
        case 'TOGGLE_TODO':
            return state.map( todo => todo.id != action.id ? todo : Object.assign({}, todo, { completed: !todo.completed }))
        default:
            return state
    }
}

function goals(state = [], action){
    switch(action.type){
        case 'ADD_GOAL':
            return state.concat(action.goal)
        case 'REMOVE_TODO':
            return state.filter( goal => goal.id !== action.id)
        default:
            return state
    }
}

function app(state = {}, action){ //We need to pass default empty object so that when we are calling this for the first time.
                                  // state.todos and state.goals will be undefined and will be assigned empty array as []
                                  //If we do not assign empty object here the code will break.
    return{
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}


//////////////////////Test with dispatches///////////////////////////////////////
store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 1,
        name: 'Learn React',
        completed: false
    }
})


store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 2,
        name: 'Learn Redux',
        completed: false
    }
})


store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 3,
        name: 'Learn React Native',
        completed: false
    }
})

store.dispatch({
    type: 'ADD_GOAL',
    goal: {
        id: 1,
        name: 'Learn Technical Analysis'
    }
})

store.dispatch({
    type: 'ADD_GOAL',
    goal: {
        id: 2,
        name: 'Get a stellar job'
    }
})

store.dispatch({
    type: 'REMOVE_TODO',
    id: 2
})

store.dispatch({
    type: 'TOGGLE_TODO',
    id: 3
})

store.dispatch({
    type: 'REMOVE_GOAL',
    id: 2
})


////////////////////////////////////////////////////////////////////////////////

/////////////////////////User Invoked Code /////////////////////////////////////////////

