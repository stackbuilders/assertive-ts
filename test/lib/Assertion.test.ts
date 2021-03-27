import assert from "assert";

import { Assertion } from "../../src/lib/Assertion";

const HERO = {
  name: "Batman",
  realName: "Bruce Wayne"
};

const THINGS = [1, "foo", false];

const FALSY_VALUES = [
  null,
  undefined,
  0,
  "",
  false,
  NaN
];

const BASE_EQUALS = [
  ["null", null, null],
  ["undefined", undefined, undefined],
  ["boolean", true, true],
  ["number", 5, 5],
  ["string", "foo", "foo"],
  ["object-ref", HERO, HERO],
  ["array-ref", THINGS, THINGS]
];

const BASE_DIFFS = [
  ["null", null, undefined],
  ["undefined", undefined, null],
  ["boolean", true, false],
  ["number", 5, 3],
  ["string", "foo", "bar"]
];

function falsyAsText(value: typeof FALSY_VALUES[number]): string {
  return value === ""
    ? '""'
    : `${value}`;
}

describe("Lib.Assertion", () => {
  describe(".exists", () => {
    context("when the value is not null or undefined", () => {
      it.only("returns the assertion instance", () => {
        const test = new Assertion(0);

        assert.ok(test.not.exists());
        // assert.deepStrictEqual(test.exists(), test);
      });
    });

    [undefined, null].forEach(value => {
      context(`when the value is ${value}`, () => {
        it("throws an assertion error", () => {
          const test = new Assertion(value);

          assert.throws(() => test.exists(), {
            message: `Expected value to exist, but it was <${value}>`,
            name: "AssertionError"
          });
        });
      });
    });
  });

  describe(".isNull", () => {
    context("when the value is null", () => {
      it("returns the assertion instance", () => {
        const test = new Assertion(null);

        assert.deepStrictEqual(test.isNull(), test);
      });
    });

    context("when the value is NOT null", () => {
      it("throws an assertion error", () => {
        const test = new Assertion("foo");

        assert.throws(() => test.isNull(), {
          message: "Expected <foo> to be null",
          name: "AssertionError"
        });
      });
    });
  });

  describe(".isPresent", () => {
    context("when the value is undefined", () => {
      it("returns the assertion instance", () => {
        const test = new Assertion(false);

        assert.deepStrictEqual(test.isPresent(), test);
      });
    });

    context("when the value is NOT present", () => {
      it("throws an assertion error", () => {
        const test = new Assertion(undefined);

        assert.throws(() => test.isPresent(), {
          message: "Expected the value to be present",
          name: "AssertionError"
        });
      });
    });
  });

  describe(".isTruthy", () => {
    context("when the value is truthy", () => {
      it("returns the assertion instance", () => {
        const test = new Assertion({ });

        assert.deepStrictEqual(test.isTruthy(), test);
      });
    });

    context("when the value is NOT truthy", () => {
      FALSY_VALUES.forEach(value => {
        it(`[${falsyAsText(value)}] throws an assertion error`, () => {
          const test = new Assertion(value);

          assert.throws(() => test.isTruthy(), {
            message: `Expected <${value}> to be a truthy value`,
            name: "AssertionError"
          });
        });
      });
    });
  });

  describe(".isFalsy", () => {
    context("when the value is falsy", () => {
      FALSY_VALUES.forEach(value => {
        it(`[${falsyAsText(value)}] returns the assertion instance`, () => {
          const test = new Assertion(value);

          assert.deepStrictEqual(test.isFalsy(), test);
        });
      });
    });

    context("when the value NOT falsy", () => {
      it("throws an assertion error", () => {
        const test = new Assertion("foo");

        assert.throws(() => test.isFalsy(), {
          message: "Expected <foo> to be a falsy value",
          name: "AssertionError"
        });
      });
    });
  });

  describe(".isEqualTo", () => {
    context("when the value is referentially, shallow, and deep equal", () => {
      [
        ...BASE_EQUALS,
        ["NaN", NaN, NaN], // Strict deep equality has a workaround for `NaN === NaN`
        ["shallow-object", HERO, { name: "Batman", realName: "Bruce Wayne" }],
        ["shallow-array", THINGS, [1, "foo", false]],
        ["deep-object", { ...HERO, opts: THINGS }, { ...HERO, opts: THINGS }],
        ["deep-array", [...THINGS, { x: HERO }], [...THINGS, { x: HERO }]]
      ]
      .forEach(([type, actual, expected]) => {
        it(`[${type}] returns the assertion instance`, () => {
          const test = new Assertion(actual);

          assert.deepStrictEqual(test.isEqualTo(expected), test);
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

          assert.throws(() => test.isEqualTo(expected), {
            message: "Expected both values to be deep equal",
            name: "AssertionError"
          });
        });
      });
    });
  });

  describe(".isSimilarTo", () => {
    context("when the value is referentially and shallow equal", () => {
      [
        ...BASE_EQUALS,
        ["NaN", NaN, NaN], // Shallow equality has a workaround for `NaN === NaN`
        ["shallow-object", HERO, { name: "Batman", realName: "Bruce Wayne" }],
        ["shallow-array", THINGS, [1, "foo", false]]
      ]
      .forEach(([valueType, expected, actual]) => {
        it(`[${valueType}] returns the assertion instance`, () => {
          const test = new Assertion(expected);

          assert.deepStrictEqual(test.isSimilarTo(actual), test);
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

          assert.throws(() => test.isSimilarTo(expected), {
            message: "Expected both values to be similar",
            name: "AssertionError"
          });
        });
      });
    });
  });

  describe(".isSameAs", () => {
    context("when the value is referentially equal", () => {
      BASE_EQUALS.forEach(([type, actual, expected]) => {
        it(`[${type}] returns the assertion instance`, () => {
          const test = new Assertion(actual);

          assert.deepStrictEqual(test.isSameAs(expected), test);
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

          assert.throws(() => test.isSameAs(expected), {
            message: "Expected both values to be the same",
            name: "AssertionError"
          });
        });
      });
    });
  });
});
