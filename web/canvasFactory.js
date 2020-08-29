export default function createCanvas(document, gameState) {
  const canvasElement = document.getElementById('screen');
  const context = canvasElement.getContext('2d');

  function startRender() {
    context.clearRect(0, 0, 10, 10);

    for (const playerKey in gameState.players) {
      const player = gameState.players[playerKey];
      context.fillStyle = 'black';
      context.fillRect(player.positionX, player.positionY, 1, 1);
    }

    for (const fruitKey in gameState.fruits) {
      const fruit = gameState.fruits[fruitKey];
      context.fillStyle = 'green';
      context.fillRect(fruit.positionX, fruit.positionY, 1, 1);
    }

    requestAnimationFrame(startRender);
  }

  return { startRender };
}
