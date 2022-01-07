export type KeyOf<T extends object> = keyof T extends never
  ? string | number | symbol
  : keyof T;
export type ValueOf<T extends object> = keyof T extends never
  ? any
  : T[keyof T];
