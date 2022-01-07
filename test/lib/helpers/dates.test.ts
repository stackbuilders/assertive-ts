import assert from "assert";

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
      assert.equal(
        dateOptionsToDate(options).toISOString(),
        new Date(2021, 1, 1, 12, 10, 15, 25).toISOString()
      );
    });
  });

  context("when the object has some options", () => {
    it("returns today's date for the missing options", () => {
      const options = {
        day: 2,
        month: 2,
        seconds: 30,
        year: 2021
      };
      const today = new Date();
      const expected = new Date(
        2021,
        2,
        2,
        today.getHours(),
        today.getMinutes(),
        30,
        today.getMilliseconds()
      );
      assert.equal(
        dateOptionsToDate(options).toISOString(),
        expected.toISOString()
      );
    });
  });

  context("when the object has no options", () => {
    it("returns today's date", () => {
      const today = new Date();
      const expected = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        today.getHours(),
        today.getMinutes(),
        today.getSeconds(),
        today.getMilliseconds()
      );
      assert.equal(
        dateOptionsToDate({ }).toISOString(),
        expected.toISOString()
      );
    });
  });
});
