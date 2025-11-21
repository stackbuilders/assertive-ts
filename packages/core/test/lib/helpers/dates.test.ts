import assert from "assert";

import { dateToOptions, dayOfWeekAsNumber, monthOfYear, optionsToDate } from "../../../src/lib/helpers/dates";

import type { DateOptions } from "../../../src/lib/DateAssertion.types";

describe("[Unit] dates.test.ts", () => {
  describe(".dayOfWeekAsNumber", () => {
    it("returns the numeric representation of a day of the week string", () => {
      const day = dayOfWeekAsNumber("wednesday");

      assert.deepStrictEqual(day, 3);
    });
  });

  describe(".monthOfYear", () => {
    it("returns the numeric representation of a month string", () => {
      const month = monthOfYear("march");

      assert.deepStrictEqual(month, 2);
    });
  });

  describe(".optionsToDate", () => {
    context("when the object has all options", () => {
      it("returns a new date with the given options", () => {
        const options: DateOptions = {
          day: 1,
          hours: 12,
          milliseconds: 25,
          minutes: 10,
          month: 1,
          seconds: 15,
          year: 2021,
        };
        const expected = new Date(2021, 1, 1, 12, 10, 15, 25);

        assert.deepStrictEqual(optionsToDate(options), expected);
      });
    });

    context("when the object has some options", () => {
      it("returns zero on the missing options", () => {
        const options = {
          day: 2,
          month: 2,
          seconds: 30,
          year: 2021,
        };
        const expected = new Date(2021, 2, 2, 0, 0, 30, 0);

        assert.deepStrictEqual(optionsToDate(options), expected);
      });
    });
  });

  context("when the object has no options", () => {
    it("returns an all zeros date", () => {
      const expected = new Date(0, 0, 0, 0, 0, 0, 0);

      assert.deepStrictEqual(optionsToDate({ }), expected);
    });
  });

  describe(".dateToOptions", () => {
    context("when a sample is not provided", () => {
      it("transforms all the values of the date all as numbers", () => {
        const date = new Date("2023-06-29T14:30:15.125Z");
        const expected: DateOptions = {
          day: 29,
          hours: 14 - (date.getTimezoneOffset() / 60),
          milliseconds: 125,
          minutes: 30,
          month: 5,
          seconds: 15,
          year: 2023,
        };

        assert.deepStrictEqual(dateToOptions(date), expected);
      });
    });

    context("when a sample is provided", () => {
      context("and not all values are present in the sample", () => {
        it("transforms only the values present in the sample", () => {
          const date = new Date("2023-06-29T14:30:15.125Z");
          const sample: DateOptions = { day: 5, minutes: 0 };
          const expected: DateOptions = { day: 29, minutes: 30 };

          assert.deepStrictEqual(dateToOptions(date, sample), expected);
        });
      });

      context("and the month and the day of the week in the sample are strings", () => {
        it("transforms the month and the day of the week as strings as well", () => {
          const date = new Date("2023-06-29T14:30:15.125Z");
          const sample: DateOptions = { day: "saturday", month: "august", year: 2020 };
          const expected: DateOptions = { day: "thursday", month: "june", year: 2023 };

          assert.deepStrictEqual(dateToOptions(date, sample), expected);
        });
      });
    });
  });
});
