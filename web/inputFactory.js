export default function createInput(document, currentPlayerId) {
  const state = {
    observers: [],
  };

  function subcribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function notifyAll(command) {
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  document.addEventListener('keydown', handleKeydown);
  function handleKeydown(event) {
    notifyAll({
      pressedKey: event.key,
      currentPlayerId,
    });
  }

  return {
    subcribe,
  };
}
