import assert from 'assert';

import { DateAssertion } from '../../src/lib/DateAssertion';

const ASSERTION_ERROR: string = 'AssertionError';

describe('[Unit] DateAssertion.test.ts', () => {
  describe('.toBeBefore', () => {
    context('when the actual date is before the passed date', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 1, 1);
        const passedDate = new Date(2021, 2, 1);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeBefore(passedDate), test);
        assert.throws(() => test.not.toBeBefore(passedDate), {
          message: `Expected <${actualDate}> NOT to be before <${passedDate}>`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context('when the actual date is NOT before the passed date', () => {
      it('throws an assertion error', () => {
        const actualDate = new Date(2021, 2, 1);
        const passedDate = new Date(2021, 1, 1);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeBefore(passedDate), {
          message: `Expected <${actualDate}> to be before <${passedDate}>`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toBeBefore(passedDate), test);
      });
    });
  });

  describe('.toBeBeforeOrEqualTo', () => {
    context(
      'when the actual date is before or equal to the passed date',
      () => {
        it('returns the assertion instance ', () => {
          const actualDate = new Date(2021, 1, 1);
          const passedDate = new Date(2021, 1, 1);
          const test = new DateAssertion(actualDate);
          assert.deepStrictEqual(test.toBeBeforeOrEqualTo(passedDate), test);
          assert.throws(() => test.not.toBeBeforeOrEqualTo(passedDate), {
            message: `Expected <${actualDate}> NOT to be before or equal to <${passedDate}>`,
            name: ASSERTION_ERROR,
          });
        });
      }
    );

    context(
      'when the actual date is NOT before or equal to the passed date',
      () => {
        it('throws an assertion error', () => {
          const actualDate = new Date(2021, 2, 1);
          const passedDate = new Date(2021, 1, 1);
          const test = new DateAssertion(actualDate);
          assert.throws(() => test.toBeBeforeOrEqualTo(passedDate), {
            message: `Expected <${actualDate}> to be before or equal to <${passedDate}>`,
            name: ASSERTION_ERROR,
          });
          assert.deepStrictEqual(
            test.not.toBeBeforeOrEqualTo(passedDate),
            test
          );
        });
      }
    );
  });

  describe('.toBeAfter', () => {
    context('when the actual date is before the passed date', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 2, 1);
        const passedDate = new Date(2021, 1, 1);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeAfter(passedDate), test);
        assert.throws(() => test.not.toBeAfter(passedDate), {
          message: `Expected <${actualDate}> NOT to be after <${passedDate}>`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context('when the actual date is NOT before the passed date', () => {
      it('throws an assertion error', () => {
        const actualDate = new Date(2021, 1, 1);
        const passedDate = new Date(2021, 2, 1);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeAfter(passedDate), {
          message: `Expected <${actualDate}> to be after <${passedDate}>`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toBeAfter(passedDate), test);
      });
    });
  });

  describe('.toBeAfterOrEqualTo', () => {
    context('when the actual date is after or equal to the passed date', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 1, 1);
        const passedDate = new Date(2021, 1, 1);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeAfterOrEqualTo(passedDate), test);
        assert.throws(() => test.not.toBeAfterOrEqualTo(passedDate), {
          message: `Expected <${actualDate}> NOT to be after or equal to <${passedDate}>`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context(
      'when the actual date is NOT after or equal to the passed date',
      () => {
        it('throws an assertion error', () => {
          const actualDate = new Date(2021, 1, 1);
          const passedDate = new Date(2021, 2, 1);
          const test = new DateAssertion(actualDate);
          assert.throws(() => test.toBeAfterOrEqualTo(passedDate), {
            message: `Expected <${actualDate}> to be after or equal to <${passedDate}>`,
            name: ASSERTION_ERROR,
          });
          assert.deepStrictEqual(test.not.toBeAfterOrEqualTo(passedDate), test);
        });
      }
    );
  });

  describe('.toHaveSameMilisecondsAs', () => {
    context(
      'when the actual has the same amount of miliseconds as the passed value',
      () => {
        it('returns the assertion instance ', () => {
          const actualDate = new Date(2021, 2, 1, 1, 1, 1, 100);
          const test = new DateAssertion(actualDate);
          assert.deepStrictEqual(test.toHaveSameMilisecondsAs(100), test);
          assert.throws(() => test.not.toHaveSameMilisecondsAs(100), {
            message: `Expected <${actualDate}> NOT to have same miliseconds as <${100}>`,
            name: ASSERTION_ERROR,
          });
        });
      }
    );

    context(
      'when the actual NOT has the same amount of miliseconds as the passed value',
      () => {
        it('throws an assertion error', () => {
          const actualDate = new Date(2021, 1, 1, 1, 1, 1, 100);
          const test = new DateAssertion(actualDate);
          assert.throws(() => test.toHaveSameMilisecondsAs(101), {
            message: `Expected <${actualDate}> to have same miliseconds as <${101}>`,
            name: ASSERTION_ERROR,
          });
          assert.deepStrictEqual(test.not.toHaveSameMilisecondsAs(101), test);
        });
      }
    );
  });

  describe('.toHaveSameSecondsAs', () => {
    context(
      'when the actual has the same amount of seconds as the passed value',
      () => {
        it('returns the assertion instance ', () => {
          const actualDate = new Date(2021, 2, 1, 1, 1, 10, 100);
          const test = new DateAssertion(actualDate);
          assert.deepStrictEqual(test.toHaveSameSecondsAs(10), test);
          assert.throws(() => test.not.toHaveSameSecondsAs(10), {
            message: `Expected <${actualDate}> NOT to have same seconds as <${10}>`,
            name: ASSERTION_ERROR,
          });
        });
      }
    );

    context(
      'when the actual NOT has the same amount of miliseconds as the passed value',
      () => {
        it('throws an assertion error', () => {
          const actualDate = new Date(2021, 1, 1, 1, 1, 11, 100);
          const test = new DateAssertion(actualDate);
          assert.throws(() => test.toHaveSameSecondsAs(10), {
            message: `Expected <${actualDate}> to have same seconds as <${10}>`,
            name: ASSERTION_ERROR,
          });
          assert.deepStrictEqual(test.not.toHaveSameSecondsAs(101), test);
        });
      }
    );
  });

  describe('.toHaveSameMinutesAs', () => {
    context(
      'when the actual has the same amount of minutes as the passed value',
      () => {
        it('returns the assertion instance ', () => {
          const actualDate = new Date(2021, 2, 1, 1, 10, 10, 100);
          const test = new DateAssertion(actualDate);
          assert.deepStrictEqual(test.toHaveSameMinutesAs(10), test);
          assert.throws(() => test.not.toHaveSameMinutesAs(10), {
            message: `Expected <${actualDate}> NOT to have same minutes as <${10}>`,
            name: ASSERTION_ERROR,
          });
        });
      }
    );

    context(
      'when the actual NOT has the same amount of minutes as the passed value',
      () => {
        it('throws an assertion error', () => {
          const actualDate = new Date(2021, 1, 1, 1, 11, 11, 100);
          const test = new DateAssertion(actualDate);
          assert.throws(() => test.toHaveSameMinutesAs(10), {
            message: `Expected <${actualDate}> to have same minutes as <${10}>`,
            name: ASSERTION_ERROR,
          });
          assert.deepStrictEqual(test.not.toHaveSameMinutesAs(101), test);
        });
      }
    );
  });

  describe('.toHaveSameHourAs', () => {
    context(
      'when the actual has the same amount of hours as the passed value',
      () => {
        it('returns the assertion instance ', () => {
          const actualDate = new Date(2021, 2, 1, 10, 10, 10, 100);
          const test = new DateAssertion(actualDate);
          assert.deepStrictEqual(test.toHaveSameHourAs(10), test);
          assert.throws(() => test.not.toHaveSameHourAs(10), {
            message: `Expected <${actualDate}> NOT to have same hours as <${10}>`,
            name: ASSERTION_ERROR,
          });
        });
      }
    );

    context(
      'when the actual NOT has the same amount of hours as the passed value',
      () => {
        it('throws an assertion error', () => {
          const actualDate = new Date(2021, 1, 1, 11, 11, 11, 100);
          const test = new DateAssertion(actualDate);
          assert.throws(() => test.toHaveSameHourAs(10), {
            message: `Expected <${actualDate}> to have same hours as <${10}>`,
            name: ASSERTION_ERROR,
          });
          assert.deepStrictEqual(test.not.toHaveSameHourAs(101), test);
        });
      }
    );
  });

  describe('.toHaveSameDayAs', () => {
    context('when the actual has the same day as the passed value', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 2, 1, 10, 10, 10, 100);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toHaveSameDayAs(1), test);
        assert.throws(() => test.not.toHaveSameDayAs(1), {
          message: `Expected <${actualDate}> NOT to have same day as <${1}>`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context('when the actual NOT has the same day as the passed value', () => {
      it('throws an assertion error', () => {
        const actualDate = new Date(2021, 1, 1, 11, 11, 11, 100);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toHaveSameDayAs(2), {
          message: `Expected <${actualDate}> to have same day as <${2}>`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toHaveSameDayAs(101), test);
      });
    });
  });

  describe('.toHaveSameMonthAs', () => {
    context('when the actual has the same month as the passed value', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 2, 1, 10, 10, 10, 100);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toHaveSameMonthAs(2), test);
        assert.throws(() => test.not.toHaveSameMonthAs(2), {
          message: `Expected <${actualDate}> NOT to have same month as <${2}>`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context(
      'when the actual NOT has the same month as the passed value',
      () => {
        it('throws an assertion error', () => {
          const actualDate = new Date(2021, 1, 1, 11, 11, 11, 100);
          const test = new DateAssertion(actualDate);
          assert.throws(() => test.toHaveSameMonthAs(2), {
            message: `Expected <${actualDate}> to have same month as <${2}>`,
            name: ASSERTION_ERROR,
          });
          assert.deepStrictEqual(test.not.toHaveSameMonthAs(101), test);
        });
      }
    );
  });

  describe('.toHaveSameYearAs', () => {
    context('when the actual has the same year as the passed value', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 2, 1, 10, 10, 10, 100);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toHaveSameYearAs(2021), test);
        assert.throws(() => test.not.toHaveSameYearAs(2021), {
          message: `Expected <${actualDate}> NOT to have same year as <${2021}>`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context('when the actual NOT has the same year as the passed value', () => {
      it('throws an assertion error', () => {
        const actualDate = new Date(2020, 1, 1, 11, 11, 11, 100);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toHaveSameYearAs(2021), {
          message: `Expected <${actualDate}> to have same year as <${2021}>`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toHaveSameYearAs(101), test);
      });
    });
  });

  describe('.toBeMonday', () => {
    context('when the actual day is monday', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 9, 18);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeMonday(), test);
        assert.throws(() => test.not.toBeMonday(), {
          message: `Expected <${actualDate}> NOT to be monday`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context('when the actual NOT has the same year as the passed value', () => {
      it('throws an assertion error', () => {
        const actualDate = new Date(2021, 9, 19);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeMonday(), {
          message: `Expected <${actualDate}> to be monday`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toBeMonday(), test);
      });
    });
  });

  describe('.toBeTuesday', () => {
    context('when the actual day is tuesday', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 9, 19);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeTuesday(), test);
        assert.throws(() => test.not.toBeTuesday(), {
          message: `Expected <${actualDate}> NOT to be tuesday`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context('when the actual NOT has the same year as the passed value', () => {
      it('throws an assertion error', () => {
        const actualDate = new Date(2021, 9, 20);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeTuesday(), {
          message: `Expected <${actualDate}> to be tuesday`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toBeTuesday(), test);
      });
    });
  });

  describe('.toBeWednesday', () => {
    context('when the actual day is wednesday', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 9, 20);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeWednesday(), test);
        assert.throws(() => test.not.toBeWednesday(), {
          message: `Expected <${actualDate}> NOT to be wednesday`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context('when the actual NOT has the same year as the passed value', () => {
      it('throws an assertion error', () => {
        const actualDate = new Date(2021, 9, 21);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeWednesday(), {
          message: `Expected <${actualDate}> to be wednesday`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toBeWednesday(), test);
      });
    });
  });

  describe('.toBeThursday', () => {
    context('when the actual day is thursday', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 9, 21);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeThursday(), test);
        assert.throws(() => test.not.toBeThursday(), {
          message: `Expected <${actualDate}> NOT to be thursday`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context('when the actual NOT has the same year as the passed value', () => {
      it('throws an assertion error', () => {
        const actualDate = new Date(2021, 9, 22);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeThursday(), {
          message: `Expected <${actualDate}> to be thursday`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toBeThursday(), test);
      });
    });
  });

  describe('.toBeThursday', () => {
    context('when the actual day is thursday', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 9, 21);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeThursday(), test);
        assert.throws(() => test.not.toBeThursday(), {
          message: `Expected <${actualDate}> NOT to be thursday`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context('when the actual NOT has the same year as the passed value', () => {
      it('throws an assertion error', () => {
        const actualDate = new Date(2021, 9, 22);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeThursday(), {
          message: `Expected <${actualDate}> to be thursday`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toBeThursday(), test);
      });
    });
  });
  describe('.toBeFriday', () => {
    context('when the actual day is friday', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 9, 22);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeFriday(), test);
        assert.throws(() => test.not.toBeFriday(), {
          message: `Expected <${actualDate}> NOT to be friday`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context('when the actual NOT has the same year as the passed value', () => {
      it('throws an assertion error', () => {
        const actualDate = new Date(2021, 9, 23);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeFriday(), {
          message: `Expected <${actualDate}> to be friday`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toBeFriday(), test);
      });
    });
  });

  describe('.toBeSaturday', () => {
    context('when the actual day is saturday', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 9, 23);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeSaturday(), test);
        assert.throws(() => test.not.toBeSaturday(), {
          message: `Expected <${actualDate}> NOT to be saturday`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context('when the actual NOT has the same year as the passed value', () => {
      it('throws an assertion error', () => {
        const actualDate = new Date(2021, 9, 24);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeSaturday(), {
          message: `Expected <${actualDate}> to be saturday`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toBeSaturday(), test);
      });
    });
  });

  describe('.toBeSunday', () => {
    context('when the actual day is sunday', () => {
      it('returns the assertion instance ', () => {
        const actualDate = new Date(2021, 9, 24);
        const test = new DateAssertion(actualDate);
        assert.deepStrictEqual(test.toBeSunday(), test);
        assert.throws(() => test.not.toBeSunday(), {
          message: `Expected <${actualDate}> NOT to be sunday`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context('when the actual NOT has the same year as the passed value', () => {
      it('throws an assertion error', () => {
        const actualDate = new Date(2021, 9, 25);
        const test = new DateAssertion(actualDate);
        assert.throws(() => test.toBeSunday(), {
          message: `Expected <${actualDate}> to be sunday`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toBeSunday(), test);
      });
    });
  });
});
