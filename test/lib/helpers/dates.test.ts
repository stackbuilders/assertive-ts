import assert from "assert";
import Sinon from "sinon";

import { dateOptionsToDate } from "../../../src/lib/helpers/dates";

describe("[Unit] dates.test.ts", () => {
  context("when the object has all options", () => {
    it("returns a new date with the given options", () => {
      const options = {
        day: 1,
        hours: 12,
        miliseconds: 25,
        minutes: 10,
        month: 1,
        seconds: 15,
        year: 2021
      };

      assert.deepStrictEqual(
        dateOptionsToDate(options),
        new Date(2021, 1, 1, 12, 10, 15, 25)
      );
    });
  });

  context("when the object has some options", () => {
    it("returns today's date for the missing options", () => {
      const today = new Date();
      const options = {
        day: 2,
        month: 2,
        seconds: 30,
        year: 2021
      };
      const expected = new Date(
        2021,
        2,
        2,
        today.getHours(),
        today.getMinutes(),
        30,
        today.getMilliseconds()
      );
      Sinon.useFakeTimers(today);

      assert.deepStrictEqual(dateOptionsToDate(options), expected);
    });
  });

  context("when the object has no options", () => {
    it("returns today's date", () => {
      const today = new Date();
      Sinon.useFakeTimers(today);

      assert.deepStrictEqual(dateOptionsToDate({ }), today);
    });
  });
});
