import dedent from "@cometlib/dedent";
import assert, { AssertionError } from "assert";

import { DateAssertion } from "../../src/lib/DateAssertion";
import { dateOptionsToDate, dayOfWeekAsNumber } from "../../src/lib/helpers/dates";

describe("[Unit] DateAssertion.test.ts", () => {
  describe(".toBeDayOfWeek", () => {
    context("when the day of the actual date matches a passed day", () => {
      it("returns the assertion instance", () => {
        const actualDate = new Date(2021, 0, 4);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeDayOfWeek("monday"), test);
        assert.throws(() => test.not.toBeDayOfWeek("monday"), {
          message: `Expected <${actualDate.getDay()}> NOT to be equal to <${dayOfWeekAsNumber("monday")}>`,
          name: AssertionError.name
        });
      });
    });

    context("when the day of the actual date NOT match a passed day", () => {
      it("throws an assertion error", () => {
        const actualDate = new Date(2021, 0, 3);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeDayOfWeek(1), {
          message: `Expected <${actualDate.getDay()}> to be equal to <${1}>`,
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toBeDayOfWeek(1), test);
      });
    });

    context("when the day of the actual date is Sunday", () => {
      context('when comparing to the "sunday" literal', () => {
        it("does not raise an AssertionError", () => {
          const actualDate = new Date(2022, 9, 2); // October 2nd, 2022
          const test = new DateAssertion(actualDate);

          assert.doesNotThrow(() => {
            test.toBeDayOfWeek("sunday");
          }, AssertionError);
        });
      });
    });
  });

  describe(".toMatchDateParts", () => {
    context("when the actual date matches the passed date", () => {
      it("returns the assertion instance", () => {
        const actualDate = new Date(2021, 1, 1, 12, 10, 15, 25);
        const options = {
          day: 1,
          hours: 12,
          miliseconds: 25,
          minutes: 10,
          month: 1,
          seconds: 15,
          year: 2021
        };
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toMatchDateParts(options), test);
        assert.throws(() => test.not.toMatchDateParts(options), {
          message: `Expected <${actualDate.toISOString()}> NOT to be equal to <${dateOptionsToDate(options).toISOString()}>`,
          name: AssertionError.name
        });
      });

      context("when passing the month as a literal", () => {
        it("does not throw an AssertionError", () => {
          const actualDate = new Date(2021, 1, 1, 12, 10, 15, 25);
          const options = { month: "february" as const };

          const test = new DateAssertion(actualDate);

          assert.doesNotThrow(
            () => test.toMatchDateParts(options),
            AssertionError
          );
        });
      });
    });

    context("when the actual date is NOT equal to the passed date", () => {
      it("throws an assertion error", () => {
        const actualDate = new Date(2021, 1, 1, 12, 10, 15, 25);
        const options = {
          day: 1,
          hours: 12,
          miliseconds: 24,
          minutes: 10,
          month: 1,
          seconds: 15,
          year: 2021
        };
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toMatchDateParts(options), {
          message: dedent`
            Expected <${actualDate.toISOString()}> to be equal to \
            <${dateOptionsToDate(options).toISOString()}>
          `,
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toMatchDateParts(options), test);
      });
    });
  });

  describe(".toBeBefore", () => {
    context("when the actual date is before the passed date", () => {
      it("returns the assertion instance", () => {
        const actualDate = new Date(2021, 1, 1);
        const passedDate = new Date(2021, 2, 1);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeBefore(passedDate), test);
        assert.throws(() => test.not.toBeBefore(passedDate), {
          message: `Expected <${actualDate.toISOString()}> NOT to be before <${passedDate.toISOString()}>`,
          name: AssertionError.name
        });
      });
    });

    context("when the actual date is NOT before the passed date", () => {
      it("throws an assertion error", () => {
        const actualDate = new Date(2021, 2, 1);
        const passedDate = new Date(2021, 1, 1);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeBefore(passedDate), {
          message: `Expected <${actualDate.toISOString()}> to be before <${passedDate.toISOString()}>`,
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toBeBefore(passedDate), test);
      });
    });
  });

  describe(".toBeBeforeOrEqualTo", () => {
    context("when the actual date is before or equal to the passed date", () => {
        it("returns the assertion instance", () => {
          const actualDate = new Date(2021, 1, 1);
          const passedDate = new Date(2021, 1, 1);
          const test = new DateAssertion(actualDate);
          assert.deepStrictEqual(test.toBeBeforeOrEqual(passedDate), test);
          assert.throws(() => test.not.toBeBeforeOrEqual(passedDate), {
            message: dedent`
              Expected <${actualDate.toISOString()}> \
              NOT to be before or equal to <${passedDate.toISOString()}>
            `,
            name: AssertionError.name
          });
        });
      }
    );

    context("when the actual date is NOT before or equal to the passed date", () => {
        it("throws an assertion error", () => {
          const actualDate = new Date(2021, 2, 1);
          const passedDate = new Date(2021, 1, 1);
          const test = new DateAssertion(actualDate);
          assert.throws(() => test.toBeBeforeOrEqual(passedDate), {
            message: `Expected <${actualDate.toISOString()}> to be before or equal to <${passedDate.toISOString()}>`,
            name: AssertionError.name
          });
          assert.deepStrictEqual(
            test.not.toBeBeforeOrEqual(passedDate),
            test
          );
        });
      }
    );
  });

  describe(".toBeAfter", () => {
    context("when the actual date is after the passed date", () => {
      it("returns the assertion instance", () => {
        const actualDate = new Date(2021, 2, 1);
        const passedDate = new Date(2021, 1, 1);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeAfter(passedDate), test);
        assert.throws(() => test.not.toBeAfter(passedDate), {
          message: `Expected <${actualDate.toISOString()}> NOT to be after <${passedDate.toISOString()}>`,
          name: AssertionError.name
        });
      });
    });

    context("when the actual date is NOT after the passed date", () => {
      it("throws an assertion error", () => {
        const actualDate = new Date(2021, 1, 1);
        const passedDate = new Date(2021, 2, 1);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeAfter(passedDate), {
          message: `Expected <${actualDate.toISOString()}> to be after <${passedDate.toISOString()}>`,
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toBeAfter(passedDate), test);
      });
    });
  });

  describe(".toBeAfterOrEqualTo", () => {
    context("when the actual date is after or equal to the passed date", () => {
      it("returns the assertion instance", () => {
        const actualDate = new Date(2021, 1, 1);
        const passedDate = new Date(2021, 1, 1);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeAfterOrEqual(passedDate), test);
        assert.throws(() => test.not.toBeAfterOrEqual(passedDate), {
          message: `Expected <${actualDate.toISOString()}> NOT to be after or equal to <${passedDate.toISOString()}>`,
          name: AssertionError.name
        });
      });
    });

    context("when the actual date is NOT after or equal to the passed date", () => {
        it("throws an assertion error", () => {
          const actualDate = new Date(2021, 1, 1);
          const passedDate = new Date(2021, 2, 1);
          const test = new DateAssertion(actualDate);
          assert.throws(() => test.toBeAfterOrEqual(passedDate), {
            message: `Expected <${actualDate.toISOString()}> to be after or equal to <${passedDate.toISOString()}>`,
            name: AssertionError.name
          });
          assert.deepStrictEqual(test.not.toBeAfterOrEqual(passedDate), test);
        });
      }
    );
  });
});
