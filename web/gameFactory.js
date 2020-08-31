export default function createGame() {
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

  function addPlayer({ id, positionX, positionY }) {
    state.players[id] = {
      positionX,
      positionY,
    };
  }

  function removePlayer({ id }) {
    delete state.players[id];
  }

  function addFruit({ id, positionX, positionY }) {
    state.fruits[id] = {
      positionX,
      positionY,
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

  function movePlayer({ pressedKey }) {
    const player = state.players['player1'];
    const moves = {
      ArrowUp: {
        movement(player) {
          const updatedPlayer = {
            ...player,
            positionY: player.positionY - 1,
          };

          const validMove = movementValidator(updatedPlayer)
          if (validMove) {
            state.players['player1'] = updatedPlayer;
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
            state.players['player1'] = updatedPlayer;
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
            state.players['player1'] = updatedPlayer;
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
            state.players['player1'] = updatedPlayer;
          }
        },
      },
    };

    if (player && moves[pressedKey]) {
      moves[pressedKey].movement(player);
      checkFruitCollision({ id: 'player1' });
    }
  }

  return {
    state,
    movePlayer,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
  };
}