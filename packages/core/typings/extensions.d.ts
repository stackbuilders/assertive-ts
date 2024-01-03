declare interface ArrayConstructor {
  isArray<T>(arg: T): arg is T[];
}

declare interface ObjectConstructor {
  keys<T>(obj: T): Array<keyof T>;
  values<T>(obj: T): Array<T[keyof T]>;
}
