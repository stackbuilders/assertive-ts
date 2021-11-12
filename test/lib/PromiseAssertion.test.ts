import assert from "assert";
import { AssertionError } from "assert/strict";

import { PromiseAssertion } from "../../src/lib/PromiseAssertion";

const ASSERTION_ERROR: string = "AssertionError";

describe("[Unit] PromiseAssertion.test.ts", () => {
  describe(".toBeResolved", () => {
    context("when the promise is resolved", () => {
      context("and the expected value is NOT passed", () => {
        it("returns a promise with the resolved value", () => {
          const test = new PromiseAssertion(Promise.resolve("foo"));

          return test.toBeResolved()
            .then(value => assert.deepStrictEqual(value, "foo"));
        });
      });

      context("and the expected value is passed", () => {
        context("and the expected value is equal to the resolved value", () => {
          it("returns a promise with the resolved value", () => {
            const test = new PromiseAssertion(Promise.resolve("foo"));

            return test.toBeResolved("foo")
              .then(value => assert.deepStrictEqual(value, "foo"));
          });
        });

        context("and the expected value is NOT equal to the resolved value", () => {
          it("rejects the promise with an assertion error", () => {
            const test = new PromiseAssertion(Promise.resolve("foo"));

            return test.toBeResolved("bar")
              .then(() => assert.fail("The promise should not be resolved"))
              .catch(error => {
                assert.ok(error instanceof AssertionError);
                assert.deepStrictEqual(
                  error.message,
                  "Expected promise to be resolved with <bar>, but got <foo> instead"
                );
              });
          });
        });
      });
    });

    context("when the promise is rejected", () => {
      it("rejects the promise with an assertion error", () => {
        const test = new PromiseAssertion(Promise.reject("fail"));

        return test.toBeResolved()
          .catch((error: Error) => {
            assert.ok(error instanceof AssertionError);
            assert.deepStrictEqual(
              error.message,
              "Expected promise to be resolved, but it was rejected with <fail> instead"
            );
          });
      });
    });
  });

  describe(".toBeRejected", () => {
    context("when the promise is resolved", () => {
      it("rejects the project with an assertion error", () => {
        const test = new PromiseAssertion(Promise.resolve("foo"));

        return test.toBeRejected()
          .catch((error: Error) => {
            assert.ok(error instanceof AssertionError);
            assert.deepStrictEqual(
              error.message,
              "Expected promise to be rejected, but it was resolved with <foo> instead"
            );
          });
      });
    });

    context("when the promise is rejected", () => {
      context("and the expected value is NOT passed", () => {
        it("returns a promise with the rejected value", () => {
          const test = new PromiseAssertion(Promise.reject(new Error("fail")));

          return test.toBeRejected()
            .then(error => {
              assert.deepStrictEqual(error, new Error("fail"));
            });
        });
      });

      context("and the expected value is passed", () => {
        context("and the expected value is equal to the rejected value", () => {
          it("return the promise with the rejected value", () => {
            const test = new PromiseAssertion(Promise.reject(new Error("fail")));

            return test.toBeRejected(new Error("fail"))
              .then(error => {
                assert.deepStrictEqual(error, new Error("fail"));
              });
          });
        });

        context("and the expected value is NOT equal to the rejecetd value", () => {
          it("rejectes the promise with an assertion error", () => {
            const test = new PromiseAssertion(Promise.reject("fail"));

            return test.toBeRejected("something")
              .then(() => assert.fail("The promise should not be resolved"))
              .catch((error: Error) => {
                assert.ok(error instanceof AssertionError);
                assert.deepEqual(
                  error.message,
                  "Expected promise to be rejected with <something>, but got <fail> instead"
                );
              });
          });
        });
      });
    });
  });

  describe(".toBeSameAs", () => {
    context("when both promises are referentially equal", () => {
      it("returns the assertion instance", () => {
        const somePromise = Promise.resolve("foo");
        const test = new PromiseAssertion(somePromise);

        assert.deepStrictEqual(test.toBeSameAs(somePromise), test);
      });
    });

    context("when both promises are NOT referentially equal", () => {
      it("throws an assertion error", () => {
        const test = new PromiseAssertion(Promise.resolve("foo"));

        assert.throws(() => test.toBeSameAs(Promise.resolve("foo")), {
          message: "Expected both promises to be the same",
          name: ASSERTION_ERROR
        });
      });
    });
  });
});
