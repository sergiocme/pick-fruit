export default function createGame(socket) {
  const state = {
    players: {},
    fruits: {},
    fieldLimit: {
      topEdge: 0,
      rightEdge: 9,
      bottomEdge: 9,
      leftEdge: 0,
    },
  };

  const observers = [];

  function subcribe(observerFunction) {
    observers.push(observerFunction);
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command);
    }
  }

  function setState(newState) {
    Object.assign(state, newState);
  }

  function addPlayer({ id, positionX, positionY }) {
    state.players[id] = {
      positionX: positionX ? positionX : Math.floor(Math.random() * (state.fieldLimit.rightEdge + 1)),
      positionY: positionY ? positionY : Math.floor(Math.random() * (state.fieldLimit.bottomEdge + 1)),
    };

    notifyAll({
      type: 'add-player',
      updatedState: state.players,
    });
  }

  function removePlayer({ id }) {
    delete state.players[id];
  }

  function addFruit({ id, positionX, positionY }) {
    state.fruits[id] = {
      positionX: positionX ? positionX : Math.floor(Math.random() * (state.fieldLimit.rightEdge + 1)),
      positionY: positionY ? positionY : Math.floor(Math.random() * (state.fieldLimit.bottomEdge + 1)),
    };
  }

  function removeFruit({ id }) {
    delete state.fruits[id];
  }

  function checkFruitCollision({ id }) {
    const player = state.players[id];

    for (const fruitKey in state.fruits) {
      const fruit = state.fruits[fruitKey];

      if (fruit.positionX === player.positionX && fruit.positionY === player.positionY) {
        removeFruit({ id: fruitKey });
        notifyAll({
          type: 'remove-fruit',
          updatedState: state.fruits,
        });
      }
    }
  }

  function movementValidator(updatedPlayer) {
    let validX = false;
    let validY = false;
    for (const limit in state.fieldLimit) {
      validX = updatedPlayer.positionX > -1 && updatedPlayer.positionX < 10 ? true : false;
      validY = updatedPlayer.positionY > -1 && updatedPlayer.positionY < 10 ? true : false;
    }

    return (validX && validY);
  }

  function movePlayer({ pressedKey, currentPlayerId }) {
    const player = state.players[currentPlayerId];
    const moves = {
      ArrowUp: {
        movement(player) {
          const updatedPlayer = {
            ...player,
            positionY: player.positionY - 1,
          };

          const validMove = movementValidator(updatedPlayer)
          if (validMove) {
            state.players[currentPlayerId] = updatedPlayer;
          }
        },
      },
      ArrowRight: {
        movement(player) {
          const updatedPlayer = {
            ...player,
            positionX: player.positionX + 1,
          };

          const validMove = movementValidator(updatedPlayer)
          if (validMove) {
            state.players[currentPlayerId] = updatedPlayer;
          }
        },
      },
      ArrowDown: {
        movement(player) {
          const updatedPlayer = {
            ...player,
            positionY: player.positionY + 1,
          };

          const validMove = movementValidator(updatedPlayer)
          if (validMove) {
            state.players[currentPlayerId] = updatedPlayer;
          }
        },
      },
      ArrowLeft: {
        movement(player) {
          const updatedPlayer = {
            ...player,
            positionX: player.positionX - 1,
          };

          const validMove = movementValidator(updatedPlayer)
          if (validMove) {
            state.players[currentPlayerId] = updatedPlayer;
          }
        },
      },
    };

    if (player && moves[pressedKey]) {
      moves[pressedKey].movement(player);
      checkFruitCollision({ id: currentPlayerId });

      if (socket) {
        socket.emit('move-player', { pressedKey, currentPlayerId });
      } else {
        notifyAll({
          type: 'add-player',
          updatedState: state.players,
        });
      }
    }
  }

  return {
    state,
    setState,
    subcribe,
    movePlayer,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
  };
}
