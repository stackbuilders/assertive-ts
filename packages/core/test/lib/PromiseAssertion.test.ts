import assert from "assert";
import { AssertionError } from "assert/strict";

import dedent from "dedent";

import { PromiseAssertion } from "../../src/lib/PromiseAssertion";

describe("[Unit] PromiseAssertion.test.ts", () => {
  describe(".toBeResolved", () => {
    context("when the promise is resolved", () => {
      it("returns a promise with the resolved value", () => {
        const test = new PromiseAssertion(Promise.resolve("foo"));

        return Promise.all([
          test.toBeResolved().then(value => assert.deepStrictEqual(value, "foo")),
          assert.rejects(test.not.toBeResolved(), {
            message: "Expected promise NOT to be resolved",
            name: AssertionError.name,
          }),
        ]);
      });
    });

    context("when the promise is rejected", () => {
      it("rejects the promise with an assertion error", () => {
        const test = new PromiseAssertion(Promise.reject("fail"));

        return Promise.all([
          assert.rejects(test.toBeResolved(), {
            message: 'Expected promise to be resolved, but it was rejected with <"fail"> instead',
            name: AssertionError.name,
          }),
          test.not.toBeResolved().then(error => assert.deepStrictEqual(error, "fail")),
        ]);
      });
    });
  });

  describe(".toBeResolvedWith", () => {
    context("when the promise is resolved", () => {
      context("and the expected value is equal to the resolved value", () => {
        it("returns a promise with the resolved value", () => {
          const test = new PromiseAssertion(Promise.resolve("foo"));

          return Promise.all([
            test.toBeResolvedWith("foo").then(value => assert.deepStrictEqual(value, "foo")),
            assert.rejects(test.not.toBeResolvedWith("foo"), {
              message: 'Expected promise NOT to be resolved with <"foo">',
              name: AssertionError.name,
            }),
          ]);
        });
      });

      context("and the expected value is NOT equal to the resolved value", () => {
        it("rejects the promise with an assertion error", () => {
          const test = new PromiseAssertion(Promise.resolve("foo"));

          return Promise.all([
            assert.rejects(test.toBeResolvedWith("bar"), {
              message: 'Expected promise to be resolved with <"bar">, but got <"foo"> instead',
              name: AssertionError.name,
            }),
            test.not.toBeResolvedWith("bar").then(value => assert.deepStrictEqual(value, "foo")),
          ]);
        });
      });
    });

    context("when the promise is rejected", () => {
      it("rejects the promise with an assertion error", () => {
        const test = new PromiseAssertion(Promise.reject<number>(Error("fail")));

        return Promise.all([
          assert.rejects(test.toBeResolvedWith(1), {
            message: "Expected promise to be resolved with <1>, but it was rejected with <Error: fail> instead",
            name: AssertionError.name,
          }),
          assert.rejects(test.not.toBeResolvedWith(1), {
            message: dedent`
              Expected promise to be resolved with anything but <1>, but was \
              rejected with <Error: fail> instead
            `,
            name: AssertionError.name,
          }),
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
            message: 'Expected promise to be rejected, but it was resolved with <"foo"> instead',
            name: AssertionError.name,
          }),
          test.not.toBeRejected().then(value => assert.deepStrictEqual(value, "foo")),
        ]);
      });
    });

    context("when the promise is rejected", () => {
      it("returns a promise with the rejected error", () => {
        const test = new PromiseAssertion(Promise.reject<number>(Error("fail")));

        return Promise.all([
          test.toBeRejected().then(error => assert.deepStrictEqual(error, Error("fail"))),
          assert.rejects(test.not.toBeRejected(), {
            message: "Expected promise NOT to be rejected",
            name: AssertionError.name,
          }),
        ]);
      });
    });
  });

  describe(".toBeRejectedWith", () => {
    context("when the promise is resolved", () => {
      it("rejects the promise with an assertion error", () => {
        const test = new PromiseAssertion(Promise.resolve("foo"));

        return Promise.all([
          assert.rejects(test.toBeRejectedWith(Error("fail")), {
            message: 'Expected promise to be rejected with <Error: fail>, but it was resolved with <"foo"> instead',
            name: AssertionError.name,
          }),
          assert.rejects(test.not.toBeRejectedWith(Error("fail")), {
            message: dedent`
              Expected promise to be rejected with anything but <Error: fail>, \
              but it was resolved with <"foo"> instead
            `,
            name: AssertionError.name,
          }),
        ]);
      });
    });

    context("when the promise is rejected", () => {
      context("and the expected error is equal to the rejected error", () => {
        it("returns the promise with the rejected error", () => {
          const test = new PromiseAssertion(Promise.reject(Error("fail")));

          return Promise.all([
            test.toBeRejectedWith(Error("fail")).then(error => assert.deepStrictEqual(error, Error("fail"))),
            assert.rejects(test.not.toBeRejectedWith(Error("fail")), {
              message: "Expected promise NOT to be rejected with <Error: fail>",
              name: AssertionError.name,
            }),
          ]);
        });
      });

      context("and the expected error is NOT equal to the rejected error", () => {
        it("rejects the promise with an assertion error", () => {
          const test = new PromiseAssertion(Promise.reject<number>("foo"));

          return Promise.all([
            assert.rejects(test.toBeRejectedWith(Error("fail")), {
              message: 'Expected promise to be rejected with <Error: fail>, but got <"foo"> instead',
              name: AssertionError.name,
            }),
            test.not.toBeRejectedWith(Error("fail")).then(error => assert.deepStrictEqual(error, "foo")),
          ]);
        });
      });
    });
  });
});
