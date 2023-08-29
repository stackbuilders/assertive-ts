import { AssertionError, expect } from "@assertive-ts/core";
import Sinon from "sinon";

import { SinonSpyAssertion } from "../../../src/lib/SinonSpyAssertion";
import { SinonSpyCallAssertion } from "../../../src/lib/SinonSpyCallAssertion";
import { sneakyCall } from "../../helpers/common";

function sayHello(to: string): string {
  if (to === "") {
    throw Error("Impossible greet!");
  }

  return `Hello ${to}`;
}

describe("[Unit] SinonSpyAssertion.test.ts", () => {
  describe(".toBeCalled", () => {
    context("when the times arg is less than zero", () => {
      it("throws an assertion error", () => {
        const spy = Sinon.spy(sayHello);
        const test = new SinonSpyAssertion(spy);

        expect(() => test.toBeCalled(-1))
          .toThrowError()
          .toHaveMessage("Spy cannot be called less tha zero times!");
      });
    });

    context("when the times arg is greater or equal to zero", () => {
      context("and the spy is called the same times as the arg", () => {
        it("returns the assertion instance", () => {
          const spy = Sinon.spy(sayHello);
          const test = new SinonSpyAssertion(spy);

          spy("world!");

          expect(test.toBeCalled(1)).toBeEqual(test);
          expect(() => test.not.toBeCalled(1))
            .toThrowError(AssertionError)
            .toHaveMessage("Expected <sayHello> NOT to be called once, but it was called 1 time");
        });
      });

      context("and the spy is not called the same times as the argument", () => {
        it("throws an assertion error", () => {
          const spy = Sinon.spy(sayHello);
          const test = new SinonSpyAssertion(spy);

          spy("world!");

          expect(() => test.toBeCalled(2))
            .toThrowError(AssertionError)
            .toHaveMessage("Expected <sayHello> to be called twice, but it was called 1 time");
          expect(test.not.toBeCalled(2)).toBeEqual(test);
        });
      });
    });
  });

  describe(".toBeCalledOnce", () => {
    it("calls toBeCalled(1)", () => {
      const spy = Sinon.spy(sayHello);
      const test = new SinonSpyAssertion(spy);
      const methodSpy = Sinon.spy(test, "toBeCalled");

      spy("world!");
      test.toBeCalledOnce();

      Sinon.assert.calledOnceWithExactly(methodSpy, 1);
    });

    it("returns the a SpyCallAssertion instance of the call", () => {
      const spy = Sinon.spy(sayHello);
      const test = new SinonSpyAssertion(spy);

      spy("world!");

      // Cycles are not supported by fast-deep-equal:
      // https://github.com/epoberezkin/fast-deep-equal/issues/17
      const { not, ...testCall } = test.toBeCalledOnce();
      const { not: expectedNot, ...expected } = new SinonSpyCallAssertion(spy.firstCall);

      expect(testCall).toBeEqual(expected);
    });
  });

  describe(".toBeCalledTwice", () => {
    it("calls toBeCalled(2)", () => {
      const spy = Sinon.spy(sayHello);
      const test = new SinonSpyAssertion(spy);
      const methodSpy = Sinon.spy(test, "toBeCalled");

      spy("world 1");
      spy("world 2");
      test.toBeCalledTwice();

      Sinon.assert.calledOnceWithExactly(methodSpy, 2);
    });
  });

  describe(".toBeCalledThrice", () => {
    it("calls toBeCalled(2)", () => {
      const spy = Sinon.spy(sayHello);
      const test = new SinonSpyAssertion(spy);
      const methodSpy = Sinon.spy(test, "toBeCalled");

      spy("world 1");
      spy("world 2");
      spy("world 3");
      test.toBeCalledThrice();

      Sinon.assert.calledOnceWithExactly(methodSpy, 3);
    });
  });

  describe(".toBeCalledAtLeast", () => {
    context("when the times arg is less than zero", () => {
      it("throws an assertion error", () => {
        const spy = Sinon.spy(sayHello);
        const test = new SinonSpyAssertion(spy);

        expect(() => test.toBeCalledAtLeast(-1))
          .toThrowError()
          .toHaveMessage("Spy cannot be called less tha zero times!");
      });
    });

    context("when the times arg is greater or equal to zero", () => {
      context("and the spy is called more times than the arg", () => {
        it("returns the assertion instance", () => {
          const spy = Sinon.spy(sayHello);
          const test = new SinonSpyAssertion(spy);

          spy("world!");
          spy("someone");
          spy("everyone");

          expect(test.toBeCalledAtLeast(2)).toBeEqual(test);
          expect(() => test.not.toBeCalledAtLeast(2))
            .toThrowError(AssertionError)
            .toHaveMessage("Expeceted <sayHello> NOT to be called at least twice, but it was called 3 times");
        });
      });

      context("and the spy is called the same times as the arg", () => {
        it("returns the assertion instance", () => {
          const spy = Sinon.spy(sayHello);
          const test = new SinonSpyAssertion(spy);

          spy("world!");
          spy("someone");

          expect(test.toBeCalledAtLeast(2)).toBeEqual(test);
          expect(() => test.not.toBeCalledAtLeast(2))
            .toThrowError(AssertionError)
            .toHaveMessage("Expeceted <sayHello> NOT to be called at least twice, but it was called 2 times");
        });
      });

      context("and the spy is called less times than the arg", () => {
        it("throws an assertion error", () => {
          const spy = Sinon.spy(sayHello);
          const test = new SinonSpyAssertion(spy);

          spy("world!");

          expect(() => test.toBeCalledAtLeast(2))
            .toThrowError(AssertionError)
            .toHaveMessage("Expeceted <sayHello> to be called at least twice, but it was called 1 time");
          expect(test.not.toBeCalledAtLeast(2)).toBeEqual(test);
        });
      });
    });
  });

  describe(".toBeCalledAtMost", () => {
    context("when the times arg is less than zero", () => {
      it("throws an assertion error", () => {
        const spy = Sinon.spy(sayHello);
        const test = new SinonSpyAssertion(spy);

        expect(() => test.toBeCalledAtMost(-1))
          .toThrowError()
          .toHaveMessage("Spy cannot be called less tha zero times!");
      });
    });

    context("when the times arg is greater or equal to zero", () => {
      context("and the spy is called less times than the arg", () => {
        it("returns the assertion instance", () => {
          const spy = Sinon.spy(sayHello);
          const test = new SinonSpyAssertion(spy);

          spy("world!");
          spy("someone");

          expect(test.toBeCalledAtMost(3)).toBeEqual(test);
          expect(() => test.not.toBeCalledAtMost(3))
            .toThrowError(AssertionError)
            .toHaveMessage("Expeceted <sayHello> NOT to be called at most thrice, but it was called 2 times");
        });
      });

      context("and the spy is called the same times as the arg", () => {
        it("returns the assertion instance", () => {
          const spy = Sinon.spy(sayHello);
          const test = new SinonSpyAssertion(spy);

          spy("world!");
          spy("someone");

          expect(test.toBeCalledAtMost(2)).toBeEqual(test);
          expect(() => test.not.toBeCalledAtMost(2))
            .toThrowError(AssertionError)
            .toHaveMessage("Expeceted <sayHello> NOT to be called at most twice, but it was called 2 times");
        });
      });

      context("and the spy is called more times than the arg", () => {
        it("throws an assertion error", () => {
          const spy = Sinon.spy(sayHello);
          const test = new SinonSpyAssertion(spy);

          spy("world 1");
          spy("world 2");
          spy("world 3");

          expect(() => test.toBeCalledAtMost(2))
            .toThrowError(AssertionError)
            .toHaveMessage("Expeceted <sayHello> to be called at most twice, but it was called 3 times");
          expect(test.not.toBeCalledAtMost(2)).toBeEqual(test);
        });
      });
    });
  });

  describe(".toBeNeverCalled", () => {
    context("when the spy is not called", () => {
      it("returns the assertion instance", () => {
        const spy = Sinon.spy(sayHello);
        const test = new SinonSpyAssertion(spy);

        expect(test.toBeNeverCalled()).toBeEqual(test);
        expect(() => test.not.toBeNeverCalled())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected <sayHello> NOT to be never called, but it was never called");
      });
    });

    context("when the spy is called", () => {
      it("throws an assertion error", () => {
        const spy = Sinon.spy(sayHello);
        const test = new SinonSpyAssertion(spy);

        spy("world!");

        expect(() => test.toBeNeverCalled())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected <sayHello> to be never called, but it was called 1 time");
        expect(test.not.toBeNeverCalled()).toBeEqual(test);
      });
    });
  });

  describe(".toHaveArgs", () => {
    context("when the spy is never called", () => {
      it("throws an assertion error", () => {
        const spy = Sinon.spy(sayHello);
        const test = new SinonSpyAssertion(spy);

        expect(() => test.toHaveArgs("world!"))
          .toThrowError(AssertionError)
          .toHaveMessage('Expected <sayHello> to be called with <"world!">');
        expect(test.not.toHaveArgs("world!")).toBeEqual(test);
      });
    });

    context("when the spy is called", () => {
      context("and the args are equal to the expected", () => {
        it("returns the assertion instance", () => {
          const spy = Sinon.spy(sayHello);
          const test = new SinonSpyAssertion(spy);

          spy("other");
          spy("another");
          spy("world!");

          expect(test.toHaveArgs("world!")).toBeEqual(test);
          expect(() => test.not.toHaveArgs("world!"))
            .toThrowError(AssertionError)
            .toHaveMessage('Expected <sayHello> NOT to be called with <"world!">');
        });
      });

      context("when the args are not equal to the expected", () => {
        it("throws an assertion error", () => {
          const spy = Sinon.spy(sayHello);
          const test = new SinonSpyAssertion(spy);

          spy("other");
          spy("another");
          spy("John!");

          expect(() => test.toHaveArgs("world!"))
            .toThrowError(AssertionError)
            .toHaveMessage('Expected <sayHello> to be called with <"world!">');
          expect(test.not.toHaveArgs("world!")).toBeEqual(test);
        });
      });
    });
  });

  describe(".toReturn", () => {
    context("when the spy returns the expected value", () => {
      it("returns the assertion instance", () => {
        const spy = Sinon.spy(sayHello);
        const test = new SinonSpyAssertion(spy);

        spy("foo");
        spy("world!");
        spy("bar");

        expect(test.toReturn("Hello world!")).toBeEqual(test);
        expect(() => test.not.toReturn("Hello world!"))
          .toThrowError(AssertionError)
          .toHaveMessage('Expected <sayHello> NOT to return <"Hello world!"> when called');
      });
    });

    context("when the spy does not return the expected value", () => {
      it("throws an assertion error", () => {
        const spy = Sinon.spy(sayHello);
        const test = new SinonSpyAssertion(spy);

        spy("foo");
        spy("bar");
        spy("baz");

        expect(() => test.toReturn("Hello world!"))
          .toThrowError(AssertionError)
          .toHaveMessage('Expected <sayHello> to return <"Hello world!"> when called');
        expect(test.not.toReturn("Hello world!")).toBeEqual(test);
      });
    });
  });

  describe(".toThrow", () => {
    context("when the spy throws an exception", () => {
      context("and the expected value is present", () => {
        context("and the exception is equal to the expected value", () => {
          it("returns the assertion instance", () => {
            const spy = Sinon.spy(sayHello);
            const test = new SinonSpyAssertion(spy);

            sneakyCall(() => {
              spy("world!");
              spy("other");
              spy("");
            });

            expect(test.toThrow(Error("Impossible greet!"))).toBeEqual(test);
            expect(() => test.not.toThrow(Error("Impossible greet!")))
              .toThrowError(AssertionError)
              .toHaveMessage("Expected <sayHello> NOT to throw <Error: Impossible greet!>");
          });
        });

        context("and the exception is not equal to the expected value", () => {
          it("throws an assertion error", () => {
            const spy = Sinon.spy(sayHello);
            const test = new SinonSpyAssertion(spy);

            sneakyCall(() => {
              spy("world!");
              spy("other");
              spy("");
            });

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
          const test = new SinonSpyAssertion(spy);

          sneakyCall(() => {
            spy("world!");
            spy("other");
            spy("");
          });

          expect(test.toThrow()).toBeEqual(test);
          expect(() => test.not.toThrow())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected <sayHello> NOT to throw when called");
        });
      });
    });

    context("when the spy does not throws an exception", () => {
      context("and the expected value is present", () => {
        it("throws an assertion error", () => {
          const spy = Sinon.spy(sayHello);
          const test = new SinonSpyAssertion(spy);

          spy("world!");

          expect(() => test.toThrow("foo"))
            .toThrowError(AssertionError)
            .toHaveMessage('Expected <sayHello> to throw <"foo">');
          expect(test.not.toThrow("foo")).toBeEqual(test);
        });
      });

      context("and the expected value is not present", () => {
        it("throws an assertion error", () => {
          const spy = Sinon.spy(sayHello);
          const test = new SinonSpyAssertion(spy);

          expect(() => test.toThrow())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected <sayHello> to throw when called");
          expect(test.not.toThrow("foo")).toBeEqual(test);
        });
      });
    });
  });

  describe(".call", () => {
    context("when the index is less than zero", () => {
      it("throws an assertion error", () => {
        const spy = Sinon.spy(sayHello);
        const test = new SinonSpyAssertion(spy);

        expect(() => test.call(-1))
          .toThrowError()
          .toHaveMessage("Spy cannot be called less tha zero times!");
      });
    });

    context("when the index is equal to zero", () => {
      it("throws an assertion error", () => {
        const spy = Sinon.spy(sayHello);
        const test = new SinonSpyAssertion(spy);

        expect(() => test.call(0))
          .toThrowError()
          .toHaveMessage("It's not possible to access no call at all!");
      });
    });

    context("when the index is greater or equal to zero", () => {
      context("and the spy call index exists", () => {
        it("returns a SpyCallAssertion instance of the call", () => {
          const spy = Sinon.spy(sayHello);
          const test = new SinonSpyAssertion(spy);

          spy("1");
          spy("2");
          spy("3");

          // Cycles are not supported by fast-deep-equal:
          // https://github.com/epoberezkin/fast-deep-equal/issues/17
          const { not, ...testCall } = test.call(3);
          const { not: expectedNot, ...expected } = new SinonSpyCallAssertion(spy.getCall(2));

          expect(testCall).toBeEqual(expected);
        });
      });
    });
  });
});
