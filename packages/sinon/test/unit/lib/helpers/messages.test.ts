import { expect } from "@assertive-ts/core";

import { callTimes, numeral, pluralize } from "../../../../src/lib/helpers/messages";

describe("[Unit] messages.test.ts", () => {
  describe(".pluralize", () => {
    context("when the count arg is equal to one", () => {
      it("returns the same text", () => {
        const result = pluralize("apple", 1);

        expect(result).toBeEqual("apple");
      });
    });

    context("when the count is not equal to one", () => {
      [-1, 0, 2, 3, 4].forEach(count => {
        it(`[count: ${count}] returns the text with an 's' appended`, () => {
          const result = pluralize("apple", count);

          expect(result).toBeEqual("apples");
        });
      });
    });
  });

  describe(".numeral", () => {
    context("when the numeral exists", () => {
      const variants = [
        [1, "once"],
        [2, "twice"],
        [3, "thrice"],
      ] as const;

      variants.forEach(([num, text]) => {
        it(`[Num: ${num}] returns the '${text}' numeral`, () => {
          const result = numeral(num);

          expect(result).toBeEqual(text);
        });
      });
    });

    context("when the numeral does not exist", () => {
      [-1, 0, 4, 5].forEach(num => {
        it(`[Num: ${num}] returns '${num} times' instead`, () => {
          const result = numeral(num);

          expect(result).toBeEqual(`${num} times`);
        });
      });
    });
  });

  describe(".callTimes", () => {
    context("when the times is greater than zero", () => {
      const variants = [
        [1, "time"],
        [2, "times"],
        [3, "times"],
      ] as const;

      variants.forEach(([times, text]) => {
        it(`[Times: ${times}] returns the called times text`, () => {
          const result = callTimes(times);

          expect(result).toBeEqual(`called ${times} ${text}`);
        });
      });
    });

    context("when the times is zero", () => {
      it("returs the never called text", () => {
        const result = callTimes(0);

        expect(result).toBeEqual("never called");
      });
    });
  });
});
