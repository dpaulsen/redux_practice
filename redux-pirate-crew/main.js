const { createStore } = Redux;

// Your initial state, reducer, constants, action creators, and JS code should go here!

const initialState = {
  crew: [
    {
      id: 1,
      name: "Long John Silver"
    }
  ],
  drowned: [
    {
      id: -1,
      name: "Davy Jones"
    }
  ]
}

const sailorReducer = (state = initialState , action) =>{
  switch(action.type) {
    case ADD_SAILOR:
      const newCrewArray = state.crew.concat(action.newSailor)
      return Object.assign({}, state, {
        crew: newCrewArray
      })
    case DELETE_SAILOR:
      let updateCrewArray = state.crew; 
      let updateDrownedArray = state.drowned;
      const index = updateCrewArray.findIndex((element) => {return element.id == action.id})
      let walker = []
      if (index !== -1) {
        walker = updateCrewArray.splice(index, 1);
      }
      if (walker !== []) {
        updateDrownedArray.push(walker.pop())
      }
      return Object.assign( {}, state, {
        crew: updateCrewArray,
        drowned: updateDrownedArray
      })
      
    default:
      return state;
  }
}

const newPirateForm = document.getElementById('new-pirate-form')

const createNextId = () => {
  const currentCrew = store.getState().crew
  const crewIds = []
  currentCrew.forEach(function(sailor) {crewIds.push(sailor.id)})
  return Math.max(...crewIds) + 1
}

const ADD_SAILOR = 'ADD_SAILOR';

const addSailorToCrew = (newSailor) => {
  return {
    type: ADD_SAILOR,
    newSailor: newSailor
  }
}

newPirateForm.addEventListener('submit', ()=>{
  event.preventDefault();
  const pirateName = document.getElementById('name').value;
  document.getElementById('name').value = '';
  const newPirate = { id: createNextId(), name: pirateName};
  store.dispatch(addSailorToCrew(newPirate));
})

const walkThePlankButton = document.getElementById('walk-the-plank')

const DELETE_SAILOR = 'DELETE_SAILOR';

const getOldestId = () => {
  const currentCrew = store.getState().crew
  const crewIds = []
  currentCrew.forEach(function(sailor) {crewIds.push(sailor.id)})
  return Math.min(...crewIds)
}

walkThePlankButton.addEventListener( 'click', ()=>{
  const id = getOldestId();
  store.dispatch({
    type:DELETE_SAILOR,
    id: id
  })
})


const store = createStore(sailorReducer);

const crewList = document.getElementById('current-crew');
const drownedList = document.getElementById('walked-crew');
const drownedCount = document.getElementById('plank-walkers');

const render = () => {
  let newCrewList = ''
  console.log(store.getState().crew);
  store.getState().crew.forEach(function(sailor) {
    newCrewList += `<li>${sailor.name}</li>`
  })
  crewList.innerHTML = newCrewList

  let newDrownedList = ''
  console.log(store.getState().drowned);
  store.getState().drowned.forEach(function(sailor) {
    newDrownedList += `<li>${sailor.name}</li>`
  })
  drownedList.innerHTML = newDrownedList

  drownedCount.innerHTML = store.getState().drowned.length

}

render();
store.subscribe(render);

