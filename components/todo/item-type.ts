

export function newItem(text:string) {
  return { id: Math.random(), text, checked: false };
}