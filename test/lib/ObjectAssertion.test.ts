import assert from "assert";

import { ObjectAssertion } from "../../src/lib/ObjectAssertion";

const ASSERTION_ERROR: string = "AssertionError";

describe("[Unit] ObjectAssertion.test.ts", () => {
  describe(".toBeEmpty", () => {
    context("when the object is an empty object", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({});

        assert.deepStrictEqual(test.toBeEmpty(), test);
        assert.throws(() => test.not.toBeEmpty(), {
          message: "Expected the value NOT to be an empty object",
          name: ASSERTION_ERROR,
        });
      });
    });

    context("when the object is NOT an empty object", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion({ myKey: "myValue" });

        assert.throws(() => test.toBeEmpty(), {
          message: "Expected the value to be an empty object",
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toBeEmpty(), test);
      });
    });
  });

  describe(".toContainKey", () => {
    context("when the object contains the provided key", () => {
      it("returns the assertion instance", () => {
        const a: object = { myKey: 0, 2: "myValue" };
        const test = new ObjectAssertion(a);

        assert.deepStrictEqual(test.toContainKey("myKey"), test);
        assert.throws(() => test.not.toContainKey("myKey"), {
          message: `Expected the object NOT to contain the provided key <myKey>`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context("when the object does NOT contain the provided key", () => {
      it("throws an assertion error", () => {
        const a: object = { myKey: 0, 2: "myValue" };
        const test = new ObjectAssertion(a);

        assert.throws(() => test.toContainKey(4), {
          message: `Expected the object to contain the provided key <4>`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toContainKey(4), test);
      });
    });
  });

  describe(".toContainAllKeys", () => {
    context("when the object contains all the provided keys", () => {
      it("returns the assertion instance", () => {
        const a: object = { myKey: 0, 2: "myValue" };
        const test = new ObjectAssertion(a);

        assert.deepStrictEqual(test.toContainAllKeys(["myKey", 2]), test);
        assert.throws(() => test.not.toContainAllKeys(["myKey", 2]), {
          message: `Expected the object NOT to contain all the provided keys <myKey,2>`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context("when the object does NOT contain all the provided keys", () => {
      it("throws an assertion error", () => {
        const a: object = { myKey: 0, 2: "myValue" };
        const test = new ObjectAssertion(a);

        assert.throws(() => test.toContainAllKeys(["wronKey", 2]), {
          message: `Expected the object to contain all the provided keys <wronKey,2>`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toContainAllKeys(["wronKey", 2]), test);
      });
    });
  });

  describe(".toContainAnyKeys", () => {
    context(
      "when the object contains at least one of the the provided keys",
      () => {
        it("returns the assertion instance", () => {
          const a: object = { myKey: 0, 2: "myValue" };
          const test = new ObjectAssertion(a);

          assert.deepStrictEqual(test.toContainAnyKeys(["myKey", 1]), test);
          assert.throws(() => test.not.toContainAnyKeys(["myKey", 1]), {
            message: `Expected the object NOT to contain any of the provided keys <myKey,1>`,
            name: ASSERTION_ERROR,
          });
        });
      }
    );

    context("when the object does NOT contain any of the provided keys", () => {
      it("throws an assertion error", () => {
        const a: object = { myKey: 0, 2: "myValue" };
        const test = new ObjectAssertion(a);

        assert.throws(() => test.toContainAnyKeys(["wronKey", 4]), {
          message: `Expected the object to contain at least one of the provided keys <wronKey,4>`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toContainAnyKeys(["wronKey", 4]), test);
      });
    });
  });

  describe(".toContainValue", () => {
    context("when the object contains the provided value", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({ myKey: 0, 2: "myValue" });

        assert.deepStrictEqual(test.toContainValue("myValue"), test);
        assert.throws(() => test.not.toContainValue("myValue"), {
          message: `Expected the object NOT to contain the provided value <myValue>`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context("when the object does NOT contain the provided value", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion({ myKey: 0, 2: "myValue" });

        assert.throws(() => test.toContainValue("wrongValue"), {
          message: `Expected the object to contain the provided value <wrongValue>`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toContainValue("wrongValue"), test);
      });
    });
  });

  describe(".toContainAllValues", () => {
    context("when the object contains all the provided values", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({ myKey: 0, 2: "myValue" });

        assert.deepStrictEqual(test.toContainAllValues(["myValue", 0]), test);
        assert.throws(() => test.not.toContainAllValues(["myValue", 0]), {
          message: `Expected the object NOT to contain all the provided values <myValue,0>`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context("when the object does NOT contain all the provided values", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion({ myKey: 0, 2: "myValue" });

        assert.throws(() => test.toContainAllValues(["myValue", 4]), {
          message: `Expected the object to contain all the provided values <myValue,4>`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(
          test.not.toContainAllValues(["myValue", 4]),
          test
        );
      });
    });
  });

  describe(".toContainAnyValues", () => {
    context(
      "when the object contains at least one of the provided values",
      () => {
        it("returns the assertion instance", () => {
          const test = new ObjectAssertion({ myKey: 0, 2: "myValue" });

          assert.deepStrictEqual(
            test.toContainAnyValues(["myValue", "random"]),
            test
          );
          assert.throws(
            () => test.not.toContainAnyValues(["myValue", "random"]),
            {
              message: `Expected the object NOT to contain any of the provided values <myValue,random>`,
              name: ASSERTION_ERROR,
            }
          );
        });
      }
    );

    context(
      "when the object does NOT contain any of the provided values",
      () => {
        it("throws an assertion error", () => {
          const test = new ObjectAssertion({ myKey: 0, 2: "myValue" });

          assert.throws(() => test.toContainAnyValues(["wrongValue"]), {
            message: `Expected the object to contain at least one of the provided values <wrongValue>`,
            name: ASSERTION_ERROR,
          });
          assert.deepStrictEqual(
            test.not.toContainAnyValues(["wrongValue"]),
            test
          );
        });
      }
    );
  });

  describe(".toContainEntry", () => {
    context("when the object contains the provided entry", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({
          foo: "someValue",
          bar: "barValue",
        });

        assert.deepStrictEqual(test.toContainEntry(["foo", "someValue"]), test);
        assert.throws(() => test.not.toContainEntry(["foo", "someValue"]), {
          message: `Expected the object NOT to contain the provided entry <["foo","someValue"]>`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context("when the object does NOT contain the provided entry", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion({
          foo: "someValue",
          1: "barValue",
        });

        assert.throws(() => test.toContainEntry([1, "wrongValue"]), {
          message: `Expected the object to contain the provided entry <[1,"wrongValue"]>`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(
          test.not.toContainEntry([1, "wrongValue"]),
          test
        );
      });
    });
  });

  describe(".toContainAllEntries", () => {
    context("when the object contains all the provided entries", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({
          foo: "someValue",
          bar: "someValue",
        });

        assert.deepStrictEqual(
          test.toContainAllEntries([
            ["foo", "someValue"],
            ["bar", "someValue"],
          ]),
          test
        );
        assert.throws(
          () =>
            test.not.toContainAllEntries([
              ["foo", "someValue"],
              ["bar", "someValue"],
            ]),
          {
            message: `Expected the object NOT to contain all the provided entries <[["foo","someValue"],["bar","someValue"]]>`,
            name: ASSERTION_ERROR,
          }
        );
      });
    });

    context("when the object does NOT contain all the provided entries", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion({ foo: "someValue", 1: 2 });

        assert.throws(
          () =>
            test.toContainAllEntries([
              [1, 2],
              ["foo", "wrongValue"],
            ]),
          {
            message: `Expected the object to contain all the provided entries <[[1,2],["foo","wrongValue"]]>`,
            name: ASSERTION_ERROR,
          }
        );
        assert.deepStrictEqual(
          test.not.toContainAllEntries([
            [1, 2],
            ["foo", "wrongValue"],
          ]),
          test
        );
      });
    });
  });

  describe(".toMatchObject", () => {
    context("when the object matches the provided object", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({
          foo: "someValue",
          bar: "someValue",
        });

        assert.deepStrictEqual(
          test.toMatchObject({ foo: "someValue", bar: "someValue" }),
          test
        );
        assert.throws(
          () => test.not.toMatchObject({ foo: "someValue", bar: "someValue" }),
          {
            message: `Expected the object NOT to match the provided object <{"foo":"someValue","bar":"someValue"}>`,
            name: ASSERTION_ERROR,
          }
        );
      });
    });

    context("when the object does NOT match the provided object", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion({ foo: "someValue", 1: 2 });

        assert.throws(
          () => test.toMatchObject({ foo: "someValue", bar: "someValue" }),
          {
            message: `Expected the object to match the provided object <{"foo":"someValue","bar":"someValue"}>`,
            name: ASSERTION_ERROR,
          }
        );
        assert.deepStrictEqual(
          test.not.toMatchObject({ foo: "someValue", bar: "someValue" }),
          test
        );
      });
    });
  });
});
