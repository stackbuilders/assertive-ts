/* eslint-disable max-classes-per-file */
import { AssertionError, expect } from "@assertive-ts/core";
import { ErrorAssertion } from "@assertive-ts/core/dist/lib/ErrorAssertion";
import Sinon from "sinon";

import { SinonSpyCallAssertion } from "../../../src/lib/SinonSpyCallAssertion";
import { sneakyCall } from "../../helpers/common";

class InvariantError extends Error {
  public constructor(message: string) {
    super(`Invariant: ${message}`);
    this.name = InvariantError.name;
  }
}

class OtherError extends Error {

}

function sayHello(to: string): string {
  if (to === "") {
    throw Error("Impossible greet!");
  }

  if (to === "invariant") {
    throw new InvariantError("That was unexpected!");
  }

  return `Hello ${to}`;
}

describe("[Unit] SinonSpyCallAssertion.test.ts", () => {
  describe(".toHaveArgs", () => {
    context("when the args are equal to the expected", () => {
      it("returns the assertion instance", () => {
        const spy = Sinon.spy(sayHello);
        spy("world!");

        const test = new SinonSpyCallAssertion(spy.firstCall);

        expect(test.toHaveArgs("world!")).toBeEqual(test);
        expect(() => test.not.toHaveArgs("world!"))
          .toThrowError(AssertionError)
          .toHaveMessage('Expected <sayHello> NOT to be called with <"world!">');
      });
    });

    context("when the args are not equal to the expected", () => {
      it("throws an assertion error", () => {
        const spy = Sinon.spy(sayHello);
        spy("world!");

        const test = new SinonSpyCallAssertion(spy.firstCall);

        expect(() => test.toHaveArgs("other"))
          .toThrowError(AssertionError)
          .toHaveMessage('Expected <sayHello> to be called with <"other">');
        expect(test.not.toHaveArgs("other")).toBeEqual(test);
      });
    });
  });

  describe(".toReturn", () => {
    context("when the spy returns the expected value", () => {
      it("returns the assertion instance", () => {
        const spy = Sinon.spy(sayHello);
        spy("world!");

        const test = new SinonSpyCallAssertion(spy.firstCall);

        expect(test.toReturn("Hello world!")).toBeEqual(test);
        expect(() => test.not.toReturn("Hello world!"))
          .toThrowError(AssertionError)
          .toHaveMessage('Expected <sayHello> NOT to return <"Hello world!"> when called');
      });
    });

    context("when the spy does not return the expected value", () => {
      it("throws an assertion error", () => {
        const spy = Sinon.spy(sayHello);
        spy("world!");

        const test = new SinonSpyCallAssertion(spy.firstCall);

        expect(() => test.toReturn("Hello everyone!"))
          .toThrowError(AssertionError)
          .toHaveMessage('Expected <sayHello> to return <"Hello everyone!"> when called');
        expect(test.not.toReturn("Hello everyone!")).toBeEqual(test);
      });
    });
  });

  describe(".toThrow", () => {
    context("when the call throws an exception", () => {
      context("and the expected value is present", () => {
        context("and the exception is equal to the expected value", () => {
          it("returns the assertion instance", () => {
            const spy = Sinon.spy(sayHello);

            sneakyCall(() => spy(""));

            const test = new SinonSpyCallAssertion(spy.firstCall);

            expect(test.toThrow(Error("Impossible greet!"))).toBeEqual(test);
            expect(() => test.not.toThrow(Error("Impossible greet!")))
              .toThrowError(AssertionError)
              .toHaveMessage("Expected <sayHello> NOT to throw <Error: Impossible greet!>");
          });
        });

        context("and the exception is not equal to the expected value", () => {
          it("throws an assertion error", () => {
            const spy = Sinon.spy(sayHello);

            sneakyCall(() => spy(""));

            const test = new SinonSpyCallAssertion(spy.firstCall);

            expect(() => test.toThrow("foo"))
              .toThrowError(AssertionError)
              .toHaveMessage('Expected <sayHello> to throw <"foo">');
            expect(test.not.toThrow("foo")).toBeEqual(test);
          });
        });
      });

      context("and the expected value is not present", () => {
        it("returns the assertion instance", () => {
          const spy = Sinon.spy(sayHello);

          sneakyCall(() => spy(""));

          const test = new SinonSpyCallAssertion(spy.firstCall);

          expect(test.toThrow()).toBeEqual(test);
          expect(() => test.not.toThrow())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected <sayHello> NOT to throw when called");
        });
      });
    });

    context("when the call does not throw an exception", () => {
      context("and the expected value is present", () => {
        it("throws an assertion error", () => {
          const spy = Sinon.spy(sayHello);
          spy("world!");

          const test = new SinonSpyCallAssertion(spy.firstCall);

          expect(() => test.toThrow("foo"))
            .toThrowError(AssertionError)
            .toHaveMessage('Expected <sayHello> to throw <"foo">');
          expect(test.not.toThrow("foo")).toBeEqual(test);
        });
      });

      context("and the expected value is not present", () => {
        it("throws an assertion error", () => {
          const spy = Sinon.spy(sayHello);
          spy("world!");

          const test = new SinonSpyCallAssertion(spy.firstCall);

          expect(() => test.toThrow())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected <sayHello> to throw when called");
          expect(test.not.toThrow()).toBeEqual(test);
        });
      });
    });
  });

  describe(".toThrowError", () => {
    context("when the expected constructor is passed", () => {
      context("and the spy throws an error", () => {
        context("and the error is instance of the constructor", () => {
          it("returns an ErrorAssertion instance", () => {
            const spy = Sinon.spy(sayHello);

            sneakyCall(() => spy("invariant"));

            const test = new SinonSpyCallAssertion(spy.firstCall);
            const { not, ...errorAssertion } = test.toThrowError(InvariantError);
            const { not: expectedNot, ...expected } = new ErrorAssertion(new InvariantError("That was unexpected!"));

            expect(errorAssertion).toBeEqual(expected);
            expect(() => test.not.toThrowError(InvariantError))
              .toThrowError(AssertionError)
              .toHaveMessage("Expected <sayHello> NOT to throw an <InvariantError> instance");
          });
        });

        context("and the error is not instance of the constructor", () => {
          it("throws an assertion error", () => {
            const spy = Sinon.spy(sayHello);

            sneakyCall(() => spy("invariant"));

            const test = new SinonSpyCallAssertion(spy.firstCall);

            expect(() => test.toThrowError(OtherError))
              .toThrowError(AssertionError)
              .toHaveMessage("Expected <sayHello> to throw an <OtherError> instance");
            expect(test.not.toThrowError(OtherError)).toBeInstanceOf(ErrorAssertion);
          });
        });
      });

      context("and the spy does not throw an error", () => {
        it("throws an assertion error", () => {
          const spy = Sinon.spy(sayHello);
          spy("world!");

          const test = new SinonSpyCallAssertion(spy.firstCall);

          expect(() => test.toThrowError(InvariantError))
            .toThrowError(AssertionError)
            .toHaveMessage("Expected <sayHello> to throw an <InvariantError> instance");
          expect(test.not.toThrowError(InvariantError)).toBeInstanceOf(ErrorAssertion);
        });
      });
    });

    context("when the expected constructor is not passed", () => {
      context("and the spy throws an error", () => {
        const variants = [
          ["invariant", new InvariantError("That was unexpected!")],
          ["", Error("Impossible greet!")],
        ] as const;

        variants.forEach(([arg, error]) => {
          it(`[error: ${error.name}] returns an ErrorAssertion instance`, () => {
            const spy = Sinon.spy(sayHello);

            sneakyCall(() => spy(arg));

            const test = new SinonSpyCallAssertion(spy.firstCall);
            const { not, ...errorAssertion } = test.toThrowError();
            const { not: expectedNot, ...expected } = new ErrorAssertion(error);

            expect(errorAssertion).toBeEqual(expected);
            expect(() => test.not.toThrowError())
              .toThrowError(AssertionError)
              .toHaveMessage("Expected <sayHello> NOT to throw an <Error> instance");
          });
        });
      });

      context("and the spy does not throw an error", () => {
        it("throws an assertion error", () => {
          const spy = Sinon.spy(sayHello);
          spy("world!");

          const test = new SinonSpyCallAssertion(spy.firstCall);

          expect(() => test.toThrowError())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected <sayHello> to throw an <Error> instance");
          expect(test.not.toThrowError()).toBeInstanceOf(ErrorAssertion);
        });
      });
    });
  });
});
