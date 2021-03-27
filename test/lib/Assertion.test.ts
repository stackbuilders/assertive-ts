import assert, { AssertionError } from "assert";

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
    [undefined, null].forEach(value => {
      context(`when the value is ${value}`, () => {
        it("throws an assertion error", () => {
          const test = new Assertion(value);

          assert.throws(() => test.exists(), {
            message: `Expected <${value}> to exist`,
            name: "AssertionError"
          });
        });
      });
    });

    context("when the value is not null or undefined", () => {
      it("does NOT throw an assertion error", () => {
        const test = new Assertion(0);

        assert.doesNotThrow(() => test.exists(), AssertionError);
      });
    });
  });

  describe(".isNull", () => {
    context("when the value is NOT null", () => {
      it("throws an assertion error", () => {
        const test = new Assertion("foo");

        assert.throws(() => test.isNull(), {
          message: "Expected <foo> to be null",
          name: "AssertionError"
        });
      });
    });

    context("when the value is null", () => {
      it("does NOT throw an assertion error", () => {
        const test = new Assertion(null);

        assert.doesNotThrow(() => test.isNull(), AssertionError);
      });
    });
  });

  describe(".isPresent", () => {
    context("when the value is NOT present", () => {
      it("throws an assertion error", () => {
        const test = new Assertion(undefined);

        assert.throws(() => test.isPresent(), {
          message: "Expected the value to be present",
          name: "AssertionError"
        });
      });
    });

    context("when the value is undefined", () => {
      it("does NOT throw an assertion error", () => {
        const test = new Assertion(false);

        assert.doesNotThrow(() => test.isPresent(), AssertionError);
      });
    });
  });

  describe(".isTruthy", () => {
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

    context("when the value is truthy", () => {
      it("does NOT throw an assertion error", () => {
        const test = new Assertion({ });

        assert.doesNotThrow(() => test.isTruthy(), AssertionError);
      });
    });
  });

  describe(".isFalsy", () => {
    context("when the value NOT falsy", () => {
      it("throws an assertion error", () => {
        const test = new Assertion("foo");

        assert.throws(() => test.isFalsy(), {
          message: "Expected <foo> to be a falsy value",
          name: "AssertionError"
        });
      });
    });

    context("when the value is falsy", () => {
      FALSY_VALUES.forEach(value => {
        it(`[${falsyAsText(value)}] does NOT throw an assertion error`, () => {
          const test = new Assertion(value);

          assert.doesNotThrow(() => test.isFalsy(), AssertionError);
        });
      });
    });
  });

  describe(".isEqualTo", () => {
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

    context("when the value is referentially equal", () => {
      it("does NOT throw an assertion error", () => {
        const test = new Assertion(HERO);

        assert.doesNotThrow(() => test.isEqualTo(HERO), AssertionError);
      });
    });

    context("when the value is shallow equal", () => {
      it("does NOT throw an assertion error", () => {
        const test = new Assertion(HERO);
        const hero2 = {
          name: "Batman",
          realName: "Bruce Wayne"
        };

        assert.doesNotThrow(() => test.isEqualTo(hero2), AssertionError);
      });
    });

    context("when the value is deep equal", () => {
      it("does NOT throw an assertion error", () => {
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

        assert.doesNotThrow(() => test.isEqualTo(hero2), AssertionError);
      });
    });
  });

  describe(".isSimilarTo", () => {
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
      it("throws an assertion error", () => {
        const test = new Assertion(HERO);
        const other = {
          ...HERO,
          cape: true
        };

        assert.throws(() => test.isSimilarTo(other), {
          message: "Expected both values to be similar",
          name: "AssertionError"
        });
      });
    });

    context("when the value is referentially equal", () => {
      it("does NOT throw an assertion error", () => {
        const test = new Assertion(HERO);

        assert.doesNotThrow(() => test.isEqualTo(HERO), AssertionError);
      });
    });

    context("when the value is shallow equal", () => {
      it("does NOT throw an assertion error", () => {
        const test = new Assertion(HERO);
        const hero2 = {
          name: "Batman",
          realName: "Bruce Wayne"
        };

        assert.doesNotThrow(() => test.isEqualTo(hero2), AssertionError);
      });
    });
  });

  describe(".isSameAs", () => {
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

    context("when the value is referentially equal", () => {
      it("does NOT throw an assertion error", () => {
        const test = new Assertion(HERO);

        assert.doesNotThrow(() => test.isEqualTo(HERO), AssertionError);
      });
    });
  });
});
