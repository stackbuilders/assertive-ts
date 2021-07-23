import assert from "assert";

import { Assertion } from "../../src/lib/Assertion";

const HERO = {
  name: "Batman",
  realName: "Bruce Wayne"
};

const FALSY_VALUES = [
  null,
  undefined,
  0,
  "",
  false,
  NaN
];

function falsyAsText(value: typeof FALSY_VALUES[number]): string {
  return value === ""
    ? '""'
    : `${value}`;
}

describe("Lib.Assertion", () => {
  describe(".exists", () => {
    context("when the value is not null or undefined", () => {
      it("returns the assertion instance", () => {
        const test = new Assertion(0);

        assert.deepStrictEqual(test.exists(), test);
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
    context("when the value is referentially equal", () => {
      it("returns the assertion instance", () => {
        const test = new Assertion(HERO);

        assert.deepStrictEqual(test.isEqualTo(HERO), test);
      });
    });

    context("when the value is shallow equal", () => {
      it("returns the assertion instance", () => {
        const test = new Assertion(HERO);
        const hero2 = {
          name: "Batman",
          realName: "Bruce Wayne"
        };

        assert.deepStrictEqual(test.isEqualTo(hero2), test);
      });
    });

    context("when the value is deep equal", () => {
      it("returns the assertion instance", () => {
        const hero1 = {
          ...HERO,
          city: {
            name: "Gotham City",
            villans: 13
          }
        };
        const hero2 = {
          ...HERO,
          city: {
            name: "Gotham City",
            villans: 13
          }
        };
        const test = new Assertion(hero1);

        assert.deepStrictEqual(test.isEqualTo(hero2), test);
      });
    });

    context("when the value is NOT referentially equal", () => {
      it("throws an assertion error", () => {
        const test = new Assertion(HERO);
        const other = {
          name: "Superman",
          realName: "Clark Kent"
        };

        assert.throws(() => test.isEqualTo(other), {
          message: "Expected both values to be deep equal",
          name: "AssertionError"
        });
      });
    });

    context("when the value is NOT shallow equal", () => {
      it("throws an assertion error", () => {
        const test = new Assertion(HERO);
        const other = {
          ...HERO,
          cape: true
        };

        assert.throws(() => test.isEqualTo(other), {
          message: "Expected both values to be deep equal",
          name: "AssertionError"
        });
      });
    });

    context("when the value is NOT deep equal", () => {
      it("throws an assertion error", () => {
        const hero1 = {
          ...HERO,
          city: {
            name: "Gotham City"
          }
        };
        const hero2 = {
          ...HERO,
          city: {
            name: "Gotham City",
            villans: 13
          }
        };
        const test = new Assertion(hero1);

        assert.throws(() => test.isEqualTo(hero2), {
          message: "Expected both values to be deep equal",
          name: "AssertionError"
        });
      });
    });
  });

  describe(".isSimilarTo", () => {
    context("when the value is referentially equal", () => {
      it("returns the assertion instance", () => {
        const test = new Assertion(HERO);

        assert.deepStrictEqual(test.isSimilarTo(HERO), test);
      });
    });

    context("when the value is shallow equal", () => {
      [
        ["object", HERO, { name: "Batman", realName: "Bruce Wayne" }],
        ["array", [1, 2, 3], [1, 2, 3]],
        ["primitive", 5, 5],
        ["NaN", NaN, NaN],
        ["null", null, null],
        ["undefined", undefined, undefined]
      ]
      .forEach(([valueType, expected, actual]) => {
        it(`[${valueType}] returns the assertion instance`, () => {
          const test = new Assertion(expected);

          assert.deepStrictEqual(test.isSimilarTo(actual), test);
        });
      });
    });

    context("when the value is NOT referentially equal", () => {
      it("throws an assertion error", () => {
        const test = new Assertion(HERO);
        const other = {
          name: "Superman",
          realName: "Clark Kent"
        };

        assert.throws(() => test.isSimilarTo(other), {
          message: "Expected both values to be similar",
          name: "AssertionError"
        });
      });
    });

    context("when the value is NOT shallow equal", () => {
      [
        ["object", HERO, { ...HERO, cape: true }],
        ["array", [1, 2, { hero: HERO }], [1, 2, { hero: HERO }]]
      ]
      .forEach(([valueType, expected, actual]) => {
        it(`[${valueType}] throws an assertion error`, () => {
          const test = new Assertion(expected);

          assert.throws(() => test.isSimilarTo(actual), {
            message: "Expected both values to be similar",
            name: "AssertionError"
          });
        });
      });
    });
  });

  describe(".isSameAs", () => {
    context("when the value is referentially equal", () => {
      it("returns the assertion instance", () => {
        const test = new Assertion(HERO);

        assert.deepStrictEqual(test.isSameAs(HERO), test);
      });
    });

    context("when the value is NOT referentially equal", () => {
      it("throws an assertion error", () => {
        const test = new Assertion(HERO);

        assert.throws(() => test.isSameAs({ ...HERO }), {
          message: "Expected both values to be the same",
          name: "AssertionError"
        });
      });
    });
  });
});
