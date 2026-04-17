import assert, { AssertionError } from "assert";

import { ArrayAssertion } from "../../src/lib/ArrayAssertion";
import { NumberAssertion } from "../../src/lib/NumberAssertion";
import { UnsupportedOperationError } from "../../src/lib/errors/UnsupportedOperationError";
import { TypeFactories } from "../../src/lib/helpers/TypeFactories";
import { expect } from "../../src/main";

describe("[Unit] ArrayAssertion.test.ts", () => {
  describe(".toMatchAll", () => {
    const isPositive = (actual: number): boolean => actual > 0;

    context("when all values matches the predicate", () => {
      it("returns the assertion instance", () => {
        const test = new ArrayAssertion([1, 2, 3]);

        assert.deepStrictEqual(test.toMatchAll(isPositive), test);
        assert.throws(() => test.not.toMatchAll(isPositive), {
          message: "Expected not every value of the array to return true on the matcher predicate",
          name: AssertionError.name,
        });
      });
    });

    context("when not all the values matches the prediction", () => {
      it("throws an assertion error", () => {
        const test = new ArrayAssertion([1, 2, -3]);

        assert.throws(() => test.toMatchAll(isPositive), {
          message: "Expected all values of the array to return true on the matcher predicate",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toMatchAll(isPositive), test);
      });
    });
  });

  describe(".toMatchAny", () => {
    context("when any of the values matches the predicate", () => {
      it("returns the assertion instance", () => {
        const test = new ArrayAssertion([1, 2, 3]);
        const isTwo = (value: number): boolean => value === 2;

        assert.deepStrictEqual(test.toMatchAny(isTwo), test);
        assert.throws(() => test.not.toMatchAny(isTwo), {
          message: "Expected no value of the array to return true on the matcher predicate",
          name: AssertionError.name,
        });
      });
    });

    context("when none of the values matches the predicate", () => {
      it("throws an assertion error", () => {
        const test = new ArrayAssertion([1, 2, 3]);
        const isFour = (value: number): boolean => value === 4;

        assert.throws(() => test.toMatchAny(isFour), {
          message: "Expected any value of the array to return true on the matcher predicate",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toMatchAny(isFour), test);
      });
    });
  });

  describe(".toSatisfyAll", () => {
    const checkPositive = (num: number): void => {
      expect(num).toBePositive();
    };

    context("when all values pass the consumer's assertion", () => {
      it("returns the assertion instance", () => {
        const test = new ArrayAssertion([1, 2, 3]);

        assert.deepStrictEqual(test.toSatisfyAll(checkPositive), test);
        assert.throws(() => test.not.toSatisfyAll(checkPositive), {
          message: "Expected not all values of the array to satisfy the given assertion",
          name: AssertionError.name,
        });
      });
    });

    context("when not all values pass the consumer's assertion", () => {
      it("throws an assertion error", () => {
        const test = new ArrayAssertion([1, 2, -3]);

        assert.throws(() => test.toSatisfyAll(checkPositive), {
          message: "Expected <-3> to be positive",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toSatisfyAll(checkPositive), test);
      });
    });
  });

  describe(".toSatisfyAny", () => {
    context("when any of the values pass the consumer's assertion", () => {
      it("returns the assertion instance", () => {
        const test = new ArrayAssertion([1, 2, 3]);
        const checkEven = (value: number): void => {
          expect(value).toBeEven();
        };

        assert.deepStrictEqual(test.toSatisfyAny(checkEven), test);
        assert.throws(() => test.not.toSatisfyAny(checkEven), {
          message: "Expected no value of the array to satisfy the given assertion",
          name: AssertionError.name,
        });
      });
    });

    context("when none of the values pass the consumer's assertion", () => {
      it("throws an assertion error", () => {
        const test = new ArrayAssertion([1, 2, 3]);
        const checkNegative = (value: number): void => {
          expect(value).toBeNegative();
        };

        assert.throws(() => test.toSatisfyAny(checkNegative), {
          message: "Expected any value of the array to satisfy the given assertion",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toSatisfyAny(checkNegative), test);
      });
    });
  });

  describe(".toBeEmpty", () => {
    context("when the array is empty", () => {
      it("returns the assertion instance", () => {
        const test = new ArrayAssertion([]);

        assert.deepStrictEqual(test.toBeEmpty(), test);
        assert.throws(() => test.not.toBeEmpty(), {
          message: "Expected array NOT to be empty",
          name: AssertionError.name,
        });
      });
    });

    context("when the array is not empty", () => {
      it("throws an assertion error", () => {
        const test = new ArrayAssertion([1]);

        assert.throws(() => test.toBeEmpty(), {
          message: "Expected array to be empty",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeEmpty(), test);
      });
    });
  });

  describe(".toHaveSize", () => {
    context("when the array has the expected size", () => {
      it("returns the assertion instance", () => {
        const test = new ArrayAssertion([1, 2, 3]);

        assert.deepStrictEqual(test.toHaveSize(3), test);
        assert.throws(() => test.not.toHaveSize(3), {
          message: "Expected array NOT to contain 3 elements, but it does",
          name: AssertionError.name,
        });
      });
    });

    context("when the array does not have the expected size", () => {
      it("throws an assertion error", () => {
        const test = new ArrayAssertion([1, 2, 3]);

        assert.throws(() => test.toHaveSize(5), {
          message: "Expected array to contain 5 elements, but it has 3",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toHaveSize(5), test);
      });
    });
  });

  describe(".toHaveSameMembers", () => {
    context("when the array has the same members as the passed array", () => {
      it("returns the assertion instance", () => {
        const test = new ArrayAssertion([1, 2, 3]);

        assert.deepStrictEqual(test.toHaveSameMembers([2, 3, 1]), test);
        assert.throws(() => test.not.toHaveSameMembers([2, 3, 1]), {
          message: "Expected array NOT to have the same members as <[2,3,1]>",
          name: AssertionError.name,
        });
      });
    });

    context("when the array does not have the same members as the passed array", () => {
      const variants: Array<[string, number[]]> = [
        ["[1,2]", [1, 2]],
        ["[1,2,4]", [1, 2, 4]],
        ["[5,6,7]", [5, 6, 7]],
        ["[1,2,3,4]", [1, 2, 3, 4]],
      ];

      variants.forEach(([desc, expected]) => {
        it(`[${desc}] throws an assertion error`, () => {
          const test = new ArrayAssertion([1, 2, 3]);

          assert.throws(() => test.toHaveSameMembers(expected), {
            message: `Expected array to have the same members as <${desc}>`,
            name: AssertionError.name,
          });
          assert.deepStrictEqual(test.not.toHaveSameMembers(expected), test);
        });
      });
    });
  });

  describe(".toContainAll", () => {
    context("when the array contains the expected values", () => {
      it("returns the assertion instance", () => {
        const test = new ArrayAssertion([1, 2, 3, 4, 5]);

        assert.deepStrictEqual(test.toContainAll(1, 3, 5), test);
        assert.throws(() => test.not.toContainAll(1, 3, 5), {
          message: "Expected array NOT to contain all the values <1, 3, 5>",
          name: AssertionError.name,
        });
      });
    });

    context("when the array does not contain the expected values", () => {
      it("throws an assertion error", () => {
        const test = new ArrayAssertion([1, 2, 3, { x: "foo" }]);

        assert.throws(() => test.toContainAll(1, { x: "bar" }), {
          message: 'Expected array to contain all the values <1, {"x":"bar"}>',
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toContainAll(1, { x: "bar" }), test);
      });
    });
  });

  describe(".toContainAny", () => {
    context("when the array contains one of the expected values", () => {
      it("returns the assertion instance", () => {
        const test = new ArrayAssertion([1, 2, 3, 4, 5]);

        assert.deepStrictEqual(test.toContainAny(7, 3, 8), test);
        assert.throws(() => test.not.toContainAny(7, 3, 8), {
          message: "Expected array NOT to contain any of the values <7, 3, 8>",
          name: AssertionError.name,
        });
      });
    });

    context("when the array does not contain any of the expected values", () => {
      it("throws an assertion error", () => {
        const test = new ArrayAssertion([1, 2, 3, { x: "foo" }]);

        assert.throws(() => test.toContainAny(7, { x: "bar" }), {
          message: 'Expected array to contain any of the values <7, {"x":"bar"}>',
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toContainAny(7, { x: "bar" }), test);
      });
    });
  });

  describe(".toContainAt", () => {
    context("when the array contains the value at the index", () => {
      it("returns the assertion instance", () => {
        const test = new ArrayAssertion(["foo", "bar", "baz"]);

        assert.deepStrictEqual(test.toContainAt(1, "bar"), test);
        assert.throws(() => test.not.toContainAt(1, "bar"), {
          message: 'Expected value at index <1> NOT to be <"bar">',
          name: AssertionError.name,
        });
      });
    });

    context("when the array does not contain the value at the index", () => {
      const variants = [
        ["Invalid index", -2],
        ["Out of bounds", 5],
        ["Normal index", 2],
      ] as const;

      variants.forEach(([desc, index]) => {
        it(`[${desc}] throws an assertion error`, () => {
          const test = new ArrayAssertion(["foo", "bar", "baz"]);

          assert.throws(() => test.toContainAt(index, "bar"), {
            message: `Expected value at index <${index}> to be <"bar">`,
            name: AssertionError.name,
          });
          assert.deepStrictEqual(test.not.toContainAt(index, "bar"), test);
        });
      });
    });
  });

  describe(".extracting", () => {
    context("when the extracting index is within the array's bounds", () => {
      context("and the type factory predicate matches the extracted value", () => {
        const array = [1, 2, 3];

        array.forEach((value, index) => {
          it(`[${index}] returns the type factory assertion instance`, () => {
            const test = new ArrayAssertion(array);

            assert.deepStrictEqual(test.extracting(index, TypeFactories.Number), new NumberAssertion(value));
          });
        });
      });

      context("and the type factory predicate does not match the extracted value", () => {
        it("throws the type factory assertion error", () => {
          const test = new ArrayAssertion(["foo", 2, true]);

          assert.throws(() => test.extracting(1, TypeFactories.String), {
            message: 'Expected <2> to be of type "string"',
            name: AssertionError.name,
          });
        });
      });
    });

    context("when the extracting index is outside the array's bounds", () => {
      it("throws an assertion error", () => {
        const test = new ArrayAssertion([1, 2, 3]);

        assert.throws(() => test.extracting(3, TypeFactories.Number), {
          message: "Out of bounds! Cannot extract index 3 from an array of 3 elements",
          name: AssertionError.name,
        });
      });
    });

    context("when the .not modifier is used", () => {
      it("throws an UnsupportedOperationError", () => {
        const test = new ArrayAssertion([1, 2, 3]);

        assert.throws(() => test.not.extracting(1, TypeFactories.Number), {
          message: "Unsupported operation. The `.not` modifier is not allowed on `.extracting(..)` method",
          name: UnsupportedOperationError.name,
        });
      });
    });
  });
});
