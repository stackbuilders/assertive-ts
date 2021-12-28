import assert from "assert";

import { Assertion } from "../../src/lib/Assertion";

const ASSERTION_ERROR: string = "AssertionError";

const HERO = {
  name: "Batman",
  realName: "Bruce Wayne"
};

const THINGS = [1, "foo", false];

const TRUTHY_VALUES = [
  true,
  1,
  "foo",
  { },
  [],
  new Date()
];

const FALSY_VALUES = [
  null,
  undefined,
  0,
  "",
  false,
  NaN
];

const TODAY = new Date("2021-12-10T00:00:00.000Z");

const BASE_EQUALS = [
  ["null", null, null],
  ["undefined", undefined, undefined],
  ["boolean", true, true],
  ["number", 5, 5],
  ["string", "foo", "foo"],
  ["object-ref", HERO, HERO],
  ["array-ref", THINGS, THINGS],
  ["date", TODAY, TODAY]
];

const BASE_DIFFS = [
  ["null", null, undefined],
  ["undefined", undefined, null],
  ["boolean", true, false],
  ["number", 5, 3],
  ["string", "foo", "bar"],
  ["date", TODAY, new Date("2021-12-10T00:00:00.001Z")]
];

function truthyAsText(value: typeof TRUTHY_VALUES[number]): string {
  if (Array.isArray(value) && value.length === 0) {
    return "Empty array";
  }

  if (value instanceof Date) {
    return "Date";
  }

  if (typeof value === "object" && Object.keys(value).length === 0) {
    return "{ }";
  }

  return String(value);
}

function falsyAsText(value: typeof FALSY_VALUES[number]): string {
  return value === ""
    ? '""'
    : `${value}`;
}

describe("[Unit] Assertion.test.ts", () => {
  describe(".not", () => {
    context("when .not is used before the assertion", () => {
      context("and another assertion is append without a .not", () => {
        it("does not negate the next assertion", () => {
          const test = new Assertion(null);

          assert.deepStrictEqual(test.not.toBeTruthy().toBeNull(), test);
        });
      });

      context("and another assertion is append with a .not", () => {
        it("negates the next assertion", () => {
          const test = new Assertion("foo");

          assert.deepStrictEqual(test.not.toBeFalsy().not.toBeEqual(""), test);
        });
      });
    });
  });

  describe(".toMatch", () => {
    const matcher = (actual: string): boolean => actual.startsWith("h");

    context("when the matcher function returns true", () => {
      it("returns the assertion instance", () => {
        const test = new Assertion("hello");

        assert.deepStrictEqual(test.toMatch(matcher), test);
        assert.throws(() => test.not.toMatch(matcher), {
          message: "Expected matcher function NOT to return true",
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the matcher function returns false", () => {
      it("throws an assertion error", () => {
        const test = new Assertion("bye");

        assert.throws(() => test.toMatch(matcher), {
          message: "Expected matcher function to return true",
          name: ASSERTION_ERROR
        });
        assert.deepStrictEqual(test.not.toMatch(matcher), test);
      });
    });
  });

  describe(".toExist", () => {
    context("when the value is not null or undefined", () => {
      it("returns the assertion instance", () => {
        const test = new Assertion(0);

        assert.deepStrictEqual(test.toExist(), test);
        assert.throws(() => test.not.toExist(), {
          message: "Expected value to NOT exist, but it was <0>",
          name: ASSERTION_ERROR
        });
      });
    });

    [undefined, null].forEach(value => {
      context(`when the value is ${value}`, () => {
        it("throws an assertion error", () => {
          const test = new Assertion(value);

          assert.throws(() => test.toExist(), {
            message: `Expected value to exist, but it was <${value}>`,
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toExist(), test);
        });
      });
    });
  });

  describe(".toBeNull", () => {
    context("when the value is null", () => {
      it("returns the assertion instance", () => {
        const test = new Assertion(null);

        assert.deepStrictEqual(test.toBeNull(), test);
        assert.throws(() => test.not.toBeNull(), {
          message: "Expected the value NOT to be null",
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the value is NOT null", () => {
      it("throws an assertion error", () => {
        const test = new Assertion("foo");

        assert.throws(() => test.toBeNull(), {
          message: "Expected <foo> to be null",
          name: ASSERTION_ERROR
        });
        assert.deepStrictEqual(test.not.toBeNull(), test);
      });
    });
  });

  describe(".toBePresent", () => {
    context("when the value is undefined", () => {
      it("returns the assertion instance", () => {
        const test = new Assertion(false);

        assert.deepStrictEqual(test.toBePresent(), test);
        assert.throws(() => test.not.toBePresent(), {
          message: "Expected the value NOT to be present",
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the value is NOT present", () => {
      it("throws an assertion error", () => {
        const test = new Assertion(undefined);

        assert.throws(() => test.toBePresent(), {
          message: "Expected the value to be present",
          name: ASSERTION_ERROR
        });
        assert.deepStrictEqual(test.not.toBePresent(), test);
      });
    });
  });

  describe(".toBeTruthy", () => {
    context("when the value is truthy", () => {
      TRUTHY_VALUES.forEach(value => {
        it(`[${truthyAsText(value)}] returns the assertion instance`, () => {
          const test = new Assertion(value);

          assert.deepStrictEqual(test.toBeTruthy(), test);
          assert.throws(() => test.not.toBeTruthy(), {
            message: `Expected <${value}> NOT to be a truthy value`,
            name: ASSERTION_ERROR
          });
        });
      });
    });

    context("when the value is NOT truthy", () => {
      FALSY_VALUES.forEach(value => {
        it(`[${falsyAsText(value)}] throws an assertion error`, () => {
          const test = new Assertion(value);

          assert.throws(() => test.toBeTruthy(), {
            message: `Expected <${value}> to be a truthy value`,
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toBeTruthy(), test);
        });
      });
    });
  });

  describe(".toBeFalsy", () => {
    context("when the value is falsy", () => {
      FALSY_VALUES.forEach(value => {
        it(`[${falsyAsText(value)}] returns the assertion instance`, () => {
          const test = new Assertion(value);

          assert.deepStrictEqual(test.toBeFalsy(), test);
          assert.throws(() => test.not.toBeFalsy(), {
            message: `Expected <${value}> NOT to be a falsy value`,
            name: ASSERTION_ERROR
          });
        });
      });
    });

    context("when the value NOT falsy", () => {
      TRUTHY_VALUES.forEach(value => {
        it(`[${truthyAsText(value)}] throws an assertion error`, () => {
          const test = new Assertion(value);

          assert.throws(() => test.toBeFalsy(), {
            message: `Expected <${value}> to be a falsy value`,
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toBeFalsy(), test);
        });
      });
    });
  });

  describe(".toBeEqual", () => {
    context("when the value is referentially, shallow, and deep equal", () => {
      [
        ...BASE_EQUALS,
        ["NaN", NaN, NaN], // Strict deep equality has a workaround for `NaN === NaN`
        ["shallow-object", HERO, { name: "Batman", realName: "Bruce Wayne" }],
        ["shallow-array", THINGS, [1, "foo", false]],
        ["deep-object", { ...HERO, opts: THINGS }, { ...HERO, opts: THINGS }],
        ["deep-array", [...THINGS, { x: HERO }], [...THINGS, { x: HERO }]],
        ["date", TODAY, new Date(TODAY.toISOString())]
      ]
      .forEach(([type, actual, expected]) => {
        it(`[${type}] returns the assertion instance`, () => {
          const test = new Assertion(actual);

          assert.deepStrictEqual(test.toBeEqual(expected), test);
          assert.throws(() => test.not.toBeEqual(expected), {
            message: "Expected both values to NOT be deep equal",
            name: ASSERTION_ERROR
          });
        });
      });
    });

    context("when the value is NOT referentially, NOR shallow, NOR deep equal", () => {
      [
        ...BASE_DIFFS,
        ["NaN", NaN, 5],
        ["object-ref", HERO, { ...HERO, x: 1 }],
        ["array-ref", THINGS, [...THINGS, "banana"]],
        ["shallow-object", { ...HERO }, { ...HERO, foo: { x: 1 } }],
        ["shallow-array", [1, 2, 3], [1, 2, 3, { x: 4 }]],
        ["deep-object", { ...HERO, opts: { x: 1 } }, { ...HERO, opts: { x: 2 } }],
        ["deep-array", [...THINGS, { x: 1 }], [...THINGS, { x: 2 }]]
      ]
      .forEach(([type, actual, expected]) => {
        it(`[${type}] throws an assertion error`, () => {
          const test = new Assertion(actual);

          assert.throws(() => test.toBeEqual(expected), {
            message: "Expected both values to be deep equal",
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toBeEqual(expected), test);
        });
      });
    });
  });

  describe(".toBeSimilar", () => {
    context("when the value is referentially and shallow equal", () => {
      [
        ...BASE_EQUALS,
        ["NaN", NaN, NaN], // Shallow equality has a workaround for `NaN === NaN`
        ["shallow-object", HERO, { name: "Batman", realName: "Bruce Wayne" }],
        ["shallow-array", THINGS, [1, "foo", false]]
      ]
      .forEach(([valueType, expected, actual]) => {
        it(`[${valueType}] returns the assertion instance`, () => {
          const test = new Assertion(actual);

          assert.deepStrictEqual(test.toBeSimilar(expected), test);
          assert.throws(() => test.not.toBeSimilar(expected), {
            message: "Expected both values to NOT be similar",
            name: ASSERTION_ERROR
          });
        });
      });
    });

    context("when the value is NOT referentially, NOR shallow equal", () => {
      [
        ...BASE_DIFFS,
        ["NaN", NaN, 5],
        ["object-ref", HERO, { ...HERO, x: 1 }],
        ["array-ref", THINGS, [...THINGS, "banana"]],
        ["shallow-object", { ...HERO, opt: [...THINGS] }, { ...HERO, opt: [...THINGS] }],
        ["shallow-array", [1, 2, { hero: HERO }], [1, 2, { hero: HERO }]],
        ["deep-object", { ...HERO, opts: { x: THINGS } }, { ...HERO, opts: { x: THINGS } }],
        ["deep-array", [...THINGS, { x: 1 }], [...THINGS, { x: 1 }]]
      ]
      .forEach(([type, actual, expected]) => {
        it(`[${type}] throws an assertion error`, () => {
          const test = new Assertion(actual);

          assert.throws(() => test.toBeSimilar(expected), {
            message: "Expected both values to be similar",
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toBeSimilar(expected), test);
        });
      });
    });
  });

  describe(".toBeSame", () => {
    context("when the value is referentially equal", () => {
      BASE_EQUALS.forEach(([type, actual, expected]) => {
        it(`[${type}] returns the assertion instance`, () => {
          const test = new Assertion(actual);

          assert.deepStrictEqual(test.toBeSame(expected), test);
          assert.throws(() => test.not.toBeSame(expected), {
            message: "Expected both values to NOT be the same",
            name: ASSERTION_ERROR
          });
        });
      });
    });

    context("when the value is NOT referentially equal", () => {
      [
        ...BASE_DIFFS,
        ["NaN", NaN, NaN], // In JavaScript `NaN === NaN` will always be `false`
        ["object-ref", { ...HERO }, { ...HERO }],
        ["array-ref", [...THINGS], [...THINGS]],
        ["shallow-object", HERO, { name: "Batman", realName: "Bruce Wayne" }],
        ["shallow-array", THINGS, [1, "foo", false]],
        ["deep-object", { ...HERO, opts: { x: THINGS } }, { ...HERO, opts: { x: THINGS } }],
        ["deep-array", [...THINGS, { x: 1 }], [...THINGS, { x: 1 }]]
      ]
      .forEach(([type, actual, expected]) => {
        it(`[${type}] throws an assertion error`, () => {
          const test = new Assertion(actual);

          assert.throws(() => test.toBeSame(expected), {
            message: "Expected both values to be the same",
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toBeSame(expected), test);
        });
      });
    });
  });
});
