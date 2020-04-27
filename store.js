/*   
    Function to emulate Redux store. A Redux store has following feature
    1) state tree that stores complete state of store.
    2) return current state.
    3) Allow subscribing to changes in state.
    4) Update state
*/

function createStore {
    //state tree.
    const state

    //There can be multiple events/clients that want to be notified every time state of store changes. We store them in an array here. In this case this will be 
    //an array of listener functions.
    const listeners = []

    //Return current state.
    const getState = () => state
    
    const subscribe = (listener) => {
        listeners.push(listener) //All listeners added to listeners[] array will be notified when state changes.

        //This returns an anonymous function that on invoking will remove current listener from listeners array.
        return () => listeners = listeners.filter( l => l != listener )
    }

    return {
        getState,
        subscribe
    }
}

//Instantiate store
const store = createStore()

//Listner 1
store.subscribe( () => {
    console.log("The new state is", store.getState())
})

//Listener 2. unsubscribe will store function to unsubscribe as variable.
const unsubscribe = store.subscribe( () => {
    console.log("The state is updated.....")
}) 

//This will invoke the anonymous function and will remove listener 2 from the array of listeners from store.
unsubscribe()