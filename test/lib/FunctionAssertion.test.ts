import assert, { AssertionError } from "assert";

import { Assertion } from "../../src/lib/Assertion";
import { ErrorAssertion } from "../../src/lib/ErrorAssertion";
import { FunctionAssertion } from "../../src/lib/FunctionAssertion";
import { TypeFactories } from "../../src/lib/helpers/TypeFactories";
import { NumberAssertion } from "../../src/lib/NumberAssertion";

class CustomError extends Error {

  public constructor(message?: string) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

describe("[Unit] FunctionAssertion.test.ts", () => {
  describe(".toThrow", () => {
    context("when the function throws", () => {
      const variants = [
        -1,
        "foo",
        true,
        null,
        Error(),
        new CustomError("bar")
      ] as const;

      variants.forEach(error => {
        it(`[${error}] returns the assertion instance`, () => {
          const test = new FunctionAssertion(() => {
            throw error;
          });

          assert.deepStrictEqual(test.toThrow(), test);
          assert.throws(() => test.not.toThrow(), {
            message: "Expected the function NOT to throw when called",
            name: AssertionError.name
          });
        });
      });
    });

    context("when the function does not throw", () => {
      it("throws an assertion error", () => {
        const test = new FunctionAssertion(() => undefined);

        assert.throws(() => test.toThrow(), {
          message: "Expected the function to throw when called",
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toThrow(), test);
      });
    });
  });

  describe(".toThrowError", () => {
    context("when the function throws", () => {
      context("and the error is an instance of the expected type", () => {
        context("and the expected type is provided", () => {
          const message = "Something went wrong...";
          const variants = [
            [Error, new Error(message)],
            [TypeError, new TypeError(message)],
            [CustomError, new CustomError(message)]
          ] as const;

          variants.forEach(([ErrorType, error]) => {
            it(`[${ErrorType.name}] returns an ErrorAssertion instance`, () => {
              const test = new FunctionAssertion(() => {
                throw error;
              });

              assert.deepStrictEqual(test.toThrowError(ErrorType), new ErrorAssertion(error));
              assert.throws(() => test.not.toThrowError(ErrorType), {
                message: `Expected the function NOT to throw an error instance of <${ErrorType.name}>`,
                name: AssertionError.name
              });
            });
          });
        });

        context("and the expected type is not provided", () => {
          it("defaults to Error and returns an ErrorAssertion instance", () => {
            const error = Error("Something went wrong...");
            const test = new FunctionAssertion(() => {
              throw error;
            });

            assert.deepStrictEqual(test.toThrowError(), new ErrorAssertion(error));
            assert.throws(() => test.not.toThrowError(), {
              message: "Expected the function NOT to throw an error instance of <Error>",
              name: AssertionError.name
            });
          });
        });
      });

      context("and the error is not an instance of the expected type", () => {
        context("and the expected type is provided", () => {
          it("throws an assertion error", () => {
            const error = new CustomError("foo");
            const test = new FunctionAssertion(() => {
              throw error;
            });

            assert.throws(() => test.toThrowError(RangeError), {
              message: "Expected the function to throw an error instance of <RangeError>",
              name: AssertionError.name
            });
            assert.deepStrictEqual(test.not.toThrowError(RangeError), new ErrorAssertion(error));
          });
        });

        context("and the expected type is not provided", () => {
          it("defaults to Error and throws an assertion error", () => {
            const error = new TypeError("foo");
            const test = new FunctionAssertion(() => {
              // tslint:disable-next-line: no-string-throw
              throw "somthing";
            });
            const test2 = new FunctionAssertion(() => {
              throw error;
            });

            assert.throws(() => test.toThrowError(), {
              message: "Expected the function to throw an error instance of <Error>",
              name: AssertionError.name
            });
            assert.deepStrictEqual(test2.not.toThrowError(RangeError), new ErrorAssertion(error));
          });
        });
      });
    });

    context("when the function does not throw", () => {
      it("throws an assertion error", () => {
        const assertionError = {
          message: "Expected the function to throw when called",
          name: AssertionError.name
        };
        const test = new FunctionAssertion(() => undefined);

        assert.throws(() => test.toThrowError(), assertionError);
        assert.throws(() => test.toThrowError(CustomError), assertionError);
        assert.throws(() => test.not.toThrowError(), assertionError);
        assert.throws(() => test.not.toThrowError(CustomError), assertionError);
      });
    });
  });

  describe(".toThrowValue", () => {
    context("when the function throws", () => {
      context("and the type factory is provided", () => {
        context("and the type matches the factory predicate", () => {
          it("returns the factory assertion instance", () => {
            const test = new FunctionAssertion(() => {
              throw 5;
            });

            assert.deepStrictEqual(test.toThrowValue(TypeFactories.Number), new NumberAssertion(5));
            assert.throws(() => test.not.toThrowValue(TypeFactories.Number), {
              message: `Expected the function NOT to throw a value of type "${TypeFactories.Number.typeName}"`,
              name: AssertionError.name
            });
          });
        });

        context("and the type does not match the factory predicate", () => {
          it("throws and assertion error", () => {
            const test = new FunctionAssertion(() => {
              throw 5;
            });

            assert.throws(() => test.toThrowValue(TypeFactories.String), {
              message: `Expected the function to throw a value of type "${TypeFactories.String.typeName}"`,
              name: AssertionError.name
            });
            assert.deepStrictEqual(test.not.toThrowValue(TypeFactories.String), new Assertion(5));
          });
        });
      });

      context("and the type factory is not provided", () => {
        it("returns a basic assertion of the value", () => {
          const test = new FunctionAssertion(() => {
            throw 5;
          });

          assert.deepStrictEqual(test.toThrowValue(), new Assertion(5));
          assert.throws(() => test.not.toThrowValue(), {
            message: "Expected the function NOT to throw a value",
            name: AssertionError.name
          });
        });
      });
    });

    context("when the function does not throw", () => {
      context("and the type factory is provided", () => {
        it("throws an assertion error", () => {
          const test = new FunctionAssertion(() => 0);

          assert.throws(() => test.toThrowValue(TypeFactories.Number), {
            message: "Expected the function to throw a value",
            name: AssertionError.name
          });
          assert.throws(() => test.not.toThrowValue(TypeFactories.Number), {
            message: "Expected the function to throw a value",
            name: AssertionError.name
          });
        });
      });

      context("and the type factory is not provided", () => {
        it("throws an assertion error", () => {
          const test = new FunctionAssertion(() => 0);

          assert.throws(() => test.toThrowValue(), {
            message: "Expected the function to throw a value",
            name: AssertionError.name
          });
          assert.throws(() => test.not.toThrowValue(), {
            message: "Expected the function to throw a value",
            name: AssertionError.name
          });
        });
      });
    });
  });
});
