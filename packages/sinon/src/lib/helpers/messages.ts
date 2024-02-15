export { prettify } from "@assertive-ts/core/dist/lib/helpers/messages";

export function pluralize(text: string, count: number): string {
  return `${text}${count !== 1 ? "s" : ""}`;
}

export function numeral(num: number): string {
  switch (num) {
    case 1: return "once";
    case 2: return "twice";
    case 3: return "thrice";
    default: return `${num} times`;
  }
}

export function callTimes(times: number): string {
  return times > 0
    ? `called ${times} ${pluralize("time", times)}`
    : "never called";
}
