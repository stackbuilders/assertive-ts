declare interface ObjectConstructor {
  keys<T>(obj: T): Array<keyof T>;

  values<T>(obj: T): Array<T[keyof T]>;
}
