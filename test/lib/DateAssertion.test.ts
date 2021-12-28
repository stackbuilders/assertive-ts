import assert from "assert";

import { DateAssertion } from "../../src/lib/DateAssertion";
import { dateOptionsToDate, dayOfWeekAsNumber } from "../../src/lib/helpers/dates";

const ASSERTION_ERROR: string = "AssertionError";

describe("[Unit] DateAssertion.test.ts", () => {
  describe(".toBeDayOfWeek", () => {
    context("when the day of the actual date matches a passed day", () => {
      it("returns the assertion instance", () => {
        const actualDate = new Date(2021, 0, 4);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeDayOfWeek("monday"), test);
        assert.throws(() => test.not.toBeDayOfWeek("monday"), {
          message: `Expected <${actualDate.getDay()}> NOT to be equal to <${dayOfWeekAsNumber("monday")}>`,
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the day of the actual date NOT match a passed day", () => {
      it("throws an assertion error", () => {
        const actualDate = new Date(2021, 0, 3);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeDayOfWeek(1), {
          message: `Expected <${actualDate.getDay()}> to be equal to <${1}>`,
          name: ASSERTION_ERROR
        });
        assert.deepStrictEqual(test.not.toBeDayOfWeek(1), test);
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
          message: `Expected <${actualDate}> NOT to be equal to <${dateOptionsToDate(options)}>`,
          name: ASSERTION_ERROR
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
          message: `Expected <${actualDate}> to be equal to <${dateOptionsToDate(options)}>`,
          name: ASSERTION_ERROR
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
          message: `Expected <${actualDate}> NOT to be before <${passedDate}>`,
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the actual date is NOT before the passed date", () => {
      it("throws an assertion error", () => {
        const actualDate = new Date(2021, 2, 1);
        const passedDate = new Date(2021, 1, 1);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeBefore(passedDate), {
          message: `Expected <${actualDate}> to be before <${passedDate}>`,
          name: ASSERTION_ERROR
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
            message: `Expected <${actualDate}> NOT to be before or equal to <${passedDate}>`,
            name: ASSERTION_ERROR
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
            message: `Expected <${actualDate}> to be before or equal to <${passedDate}>`,
            name: ASSERTION_ERROR
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
          message: `Expected <${actualDate}> NOT to be after <${passedDate}>`,
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the actual date is NOT after the passed date", () => {
      it("throws an assertion error", () => {
        const actualDate = new Date(2021, 1, 1);
        const passedDate = new Date(2021, 2, 1);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeAfter(passedDate), {
          message: `Expected <${actualDate}> to be after <${passedDate}>`,
          name: ASSERTION_ERROR
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
          message: `Expected <${actualDate}> NOT to be after or equal to <${passedDate}>`,
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the actual date is NOT after or equal to the passed date", () => {
        it("throws an assertion error", () => {
          const actualDate = new Date(2021, 1, 1);
          const passedDate = new Date(2021, 2, 1);
          const test = new DateAssertion(actualDate);
          assert.throws(() => test.toBeAfterOrEqual(passedDate), {
            message: `Expected <${actualDate}> to be after or equal to <${passedDate}>`,
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toBeAfterOrEqual(passedDate), test);
        });
      }
    );
  });
});
