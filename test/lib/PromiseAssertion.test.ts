import assert from "assert";
import { AssertionError } from "assert/strict";

import { PromiseAssertion } from "../../src/lib/PromiseAssertion";

describe("[Unit] PromiseAssertion.test.ts", () => {
  describe(".toBeResolved", () => {
    context("when the promise is resolved", () => {
      context("and the expected value is NOT present", () => {
        it("returns a promise with the resolved value", () => {
          const test = new PromiseAssertion(Promise.resolve("foo"));

          return Promise.all([
            test.toBeResolved().then(value => assert.deepStrictEqual(value, "foo")),
            assert.rejects(test.not.toBeResolved(), {
              message: "Expected promise NOT to be resolved",
              name: AssertionError.name
            })
          ]);
        });
      });

      context("and the expected value is present", () => {
        context("and the expected value is equal to the resolved value", () => {
          it("returns a promise with the resolved value", () => {
            const test = new PromiseAssertion(Promise.resolve("foo"));

            return Promise.all([
              test.toBeResolved("foo").then(value => assert.deepStrictEqual(value, "foo")),
              assert.rejects(test.not.toBeResolved("foo"), {
                message: "Expected promise NOT to be resolved with [foo]",
                name: AssertionError.name
              })
            ]);
          });
        });

        context("and the expected value is NOT equal to the resolved value", () => {
          it("rejects the promise with an assertion error", () => {
            const test = new PromiseAssertion(Promise.resolve("foo"));

            return Promise.all([
              assert.rejects(test.toBeResolved("bar"), {
                message: "Expected promise to be resolved with [bar], but got [foo] instead",
                name: AssertionError.name
              }),
              test.not.toBeResolved("bar").then(value => assert.deepStrictEqual(value, "foo"))
            ]);
          });
        });
      });
    });

    context("when the promise is rejected", () => {
      it("rejects the promise with an assertion error", () => {
        const test = new PromiseAssertion(Promise.reject("fail"));

        return Promise.all([
          assert.rejects(test.toBeResolved(), {
            message: "Expected promise to be resolved, but it was rejected with [fail] instead",
            name: AssertionError.name
          }),
          test.not.toBeResolved().then(error => assert.deepStrictEqual(error, "fail"))
        ]);
      });
    });
  });

  describe(".toBeRejected", () => {
    context("when the promise is resolved", () => {
      it("rejects the promise with an assertion error", () => {
        const test = new PromiseAssertion(Promise.resolve("foo"));

        return Promise.all([
          assert.rejects(test.toBeRejected(), {
            message: "Expected promise to be rejected, but it was resolved with [foo] instead",
            name: AssertionError.name
          }),
          test.not.toBeRejected().then(value => assert.deepStrictEqual(value, "foo"))
        ]);
      });
    });

    context("when the promise is rejected", () => {
      context("and the expected value is NOT passed", () => {
        it("returns a promise with the rejected value", () => {
          const test = new PromiseAssertion(Promise.reject(Error("fail")));

          return Promise.all([
            test.toBeRejected().then(error => assert.deepStrictEqual(error, Error("fail"))),
            assert.rejects(test.not.toBeRejected(), {
              message: "Expeted promise NOT to be rejected",
              name: AssertionError.name
            })
          ]);
        });
      });

      context("and the expected value is passed", () => {
        context("and the expected value is equal to the rejected value", () => {
          it("return the promise with the rejected value", () => {
            const test = new PromiseAssertion(Promise.reject(Error("fail")));

            return Promise.all([
              test.toBeRejected(Error("fail")).then(error => assert.deepStrictEqual(error, Error("fail"))),
              assert.rejects(test.not.toBeRejected(Error("fail")), {
                message: "Expected promise NOT to be rejected with [Error: fail]",
                name: AssertionError.name
              })
            ]);
          });
        });

        context("and the expected value is NOT equal to the rejecetd value", () => {
          it("rejectes the promise with an assertion error", () => {
            const test = new PromiseAssertion(Promise.reject("fail"));

            return Promise.all([
              assert.rejects(test.toBeRejected("something"), {
                message: "Expected promise to be rejected with [something], but got [fail] instead",
                name: AssertionError.name
              }),
              test.not.toBeRejected("something").then(error => assert.deepStrictEqual(error, "fail"))
            ]);
          });
        });
      });
    });
  });
});
