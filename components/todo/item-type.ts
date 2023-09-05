
export type ListItemType = {
  id: number,
  text: string,
  checked: boolean
}

// eslint-disable-next-line no-unused-vars
export type ByIdCallback = (id: ListItemType['id']) => void;

export type ListType = ListItemType[];

export function newItem(text: string): ListItemType {
  return { id: Math.random(), text, checked: false };
}