/* eslint-disable @typescript-eslint/no-explicit-any */
export function getItem(item: string) {
  return window.localStorage.getItem(item);
}

export function setItem(item: string, value: any) {
  window.localStorage.setItem(item, value);
}

export function removeItem(item: string) {
  window.localStorage.removeItem(item);
}
