///////////////////////////REDUX Library Code - Start ////////////////////////////////////

/*   
    Function to emulate Redux store. A Redux store has following feature
    1) state tree that stores complete state of store.
    2) return current state.
    3) Allow subscribing to changes in state.
    4) Update state
*/

function createStore(todos){
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
        state = todos(state, action)
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
const store = createStore(todos)

//Listner 1
store.subscribe( () => {
    console.log("The new state is", store.getState())
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 1,
        name: 'Learn React',
        completed: false
    }
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
    if(action.type === 'ADD_TODO'){
        return state.concat(action.todo)
    }

    return state
}

/////////////////////////User Invoked Code /////////////////////////////////////////////

