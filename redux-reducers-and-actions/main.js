const {createStore} = Redux;

const initialState = {
  playerOneScore: 0,
  playerTwoScore: 0
};

const playerOneScoreButton = document.getElementById('add-player-one-point')
const playerTwoScoreButton = document.getElementById('add-player-two-point')

const playerOneScoreSection = document.getElementById('player-one-score')
const playerTwoScoreSection = document.getElementById('player-two-score')

const ADD_PLAYER_ONE_POINT = 'ADD_PLAYER_ONE_POINT'
const ADD_PLAYER_TWO_POINT = 'ADD_PLAYER_TWO_POINT'

playerOneScoreButton.addEventListener('click', ()=> {
  store.dispatch({
    type: ADD_PLAYER_ONE_POINT
  })
})
playerTwoScoreButton.addEventListener('click', ()=> {
  store.dispatch({
    type: ADD_PLAYER_TWO_POINT
  })
})

const scoreReducer = (state = initialState, action) =>{
  switch(action.type) {
    case ADD_PLAYER_ONE_POINT:
      const PlayerOneNewScore = state.playerOneScore + 1;
      return Object.assign({}, state, {
        playerOneScore :PlayerOneNewScore
      });
    case ADD_PLAYER_TWO_POINT:
      const PlayerTwoNewScore  = state.playerTwoScore + 1;
      return Object.assign({}, state, {
        playerTwoScore :PlayerTwoNewScore
      });
      default:
        return state;
  }
}

const store = createStore(scoreReducer);

const render = () =>{
  console.log(store.getState());
  playerOneScoreSection.innerHTML = store.getState().playerOneScore
  playerTwoScoreSection.innerHTML = store.getState().playerTwoScore
}

render();
store.subscribe(render);


// const plusOne = (number) => {
//   return (number+1);
// }

// const addOneToAll = (numbers) => {
//   console.log(numbers);
//   numbers.forEach( (number,index) =>{
//     numbers[index]= number + 1;
//   })
//   console.log(numbers);
// }

