export function newItem(text) {
  return { id: Math.random(), text, checked: false };
}