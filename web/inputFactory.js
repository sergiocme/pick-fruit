export default function createInput(document) {
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
    });
  }

  return {
    subcribe,
  };
}
