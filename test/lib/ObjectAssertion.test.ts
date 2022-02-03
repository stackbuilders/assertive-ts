import assert from "assert";

import { ObjectAssertion } from "../../src/lib/ObjectAssertion";

const ASSERTION_ERROR: string = "AssertionError";

type Entry = [string | number | symbol, number | object | string];

const TEST_OBJ = {
  myKey: 0,
  2: {
    innerObjKey: 1,
    message: "inner value"
  }
};

const ENTRIES: Entry[] = [
  ["myKey", 0],
  [2, { innerObjKey: 1, message: "inner value" }]
];

const WRONG_ENTRIES: Entry[] = [
  ["myKey", 4],
  [3, { innerObjKey: 4, message: "inner wrong value" }]
];

const SOME_ENTRIES: Entry[] = [
  ["myKey", 0],
  [3, { innerObjKey: 4, message: "inner wrong value" }]
];

function makeObject(): object {
  return {
    myKey: 0,
    2: {
      innerObjKey: 1,
      message: "inner value"
    },
    otherKey: "other value"
  };
}

describe("[Unit] ObjectAssertion.test.ts", () => {
  describe(".toBeEmpty", () => {
    context("when the object is an empty object", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({ });

        assert.deepStrictEqual(test.toBeEmpty(), test);
        assert.throws(() => test.not.toBeEmpty(), {
          message: "Expected the value NOT to be an empty object",
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the object is NOT an empty object", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("throws an assertion error", () => {
          const test = new ObjectAssertion(obj);

          assert.throws(() => test.toBeEmpty(), {
            message: "Expected the value to be an empty object",
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toBeEmpty(), test);
        });
      });
    });
  });

  describe(".toContainKey", () => {
    context("when the object contains the provided key", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("returns the assertion instance", () => {
          const myKey = "myKey";
          const test = new ObjectAssertion(obj);

          assert.deepStrictEqual(test.toContainKey(myKey), test);
          assert.throws(() => test.not.toContainKey(myKey), {
            message: `Expected the object NOT to contain the provided key <${myKey}>`,
            name: ASSERTION_ERROR
          });
        });
      });
    });

    context("when the object does NOT contain the provided key", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("throws an assertion error", () => {
          const wrongKey = "wrongKey";
          const test = new ObjectAssertion(obj);

          assert.throws(() => test.toContainKey(wrongKey), {
            message: `Expected the object to contain the provided key <${wrongKey}>`,
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toContainKey(wrongKey), test);
        });
      });
    });
  });

  describe(".toContainAllKeys", () => {
    context("when the object contains all the provided keys", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("returns the assertion instance", () => {
          const myKeys = ["myKey", 2];
          const test = new ObjectAssertion(obj);

          assert.deepStrictEqual(test.toContainAllKeys(myKeys), test);
          assert.throws(() => test.not.toContainAllKeys(myKeys), {
            message: `Expected the object NOT to contain all the provided keys <${myKeys}>`,
            name: ASSERTION_ERROR
          });
        });
      });
    });

    context("when the object does NOT contain all the provided keys", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("throws an assertion error", () => {
          const someKeys = ["myKey", 3];
          const test = new ObjectAssertion(obj);

          assert.throws(() => test.toContainAllKeys(someKeys), {
            message: `Expected the object to contain all the provided keys <${someKeys}>`,
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(
            test.not.toContainAllKeys(someKeys),
            test
          );
        });
      });
    });
  });

  describe(".toContainAnyKeys", () => {
    context("when the object contains at least one of the the provided keys", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("returns the assertion instance", () => {
          const someKeys = ["myKey", "objKey", 4, "randomKey"];
          const test = new ObjectAssertion(obj);

          assert.deepStrictEqual(test.toContainAnyKeys(someKeys), test);
          assert.throws(() => test.not.toContainAnyKeys(someKeys), {
            message: `Expected the object NOT to contain any of the provided keys <${someKeys}>`,
            name: ASSERTION_ERROR
          });
        });
      });
    });

    context("when the object does NOT contain any of the provided keys", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("throws an assertion error", () => {
          const wrongKeys = ["notMyKey", 3, "randomKey"];
          const test = new ObjectAssertion(obj);

          assert.throws(() => test.toContainAnyKeys(wrongKeys), {
            message: `Expected the object to contain at least one of the provided keys <${wrongKeys}>`,
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toContainAnyKeys(wrongKeys), test);
        });
      });
    });
  });

  describe(".toContainValue", () => {
    context("when the object contains the provided value", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        [
          0,
          { innerObjKey: 1, message: "inner value"}
        ]
        .forEach(value => {
          it("returns the assertion instance", () => {
            const test = new ObjectAssertion(obj);

            assert.deepStrictEqual(test.toContainValue(value), test);
            assert.throws(() => test.not.toContainValue(value), {
              message: `Expected the object NOT to contain the provided value <${value}>`,
              name: ASSERTION_ERROR
            });
          });
        });
      });
    });

    context("when the object does NOT contain the provided value", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        [
          1,
          "wrong value",
          { innerObjKey: 1, message: "inner wrong value"}
        ]
        .forEach(value => {
          it("throws an assertion error", () => {
            const test = new ObjectAssertion(obj);

            assert.throws(() => test.toContainValue(value), {
              message: `Expected the object to contain the provided value <${value}>`,
              name: ASSERTION_ERROR
            });
            assert.deepStrictEqual(test.not.toContainValue(value), test);
          });
        });
      });
    });
  });

  describe(".toContainAllValues", () => {
    context("when the object contains all the provided values", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("returns the assertion instance", () => {
          const myValues = [0, { innerObjKey: 1, message: "inner value" }];
          const test = new ObjectAssertion(obj);

          assert.deepStrictEqual(test.toContainAllValues(myValues), test);
          assert.throws(() => test.not.toContainAllValues(myValues), {
            message: `Expected the object NOT to contain all the provided values <${myValues}>`,
            name: ASSERTION_ERROR
          });
        });
      });
    });

    context("when the object does NOT contain all the provided values", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("throws an assertion error", () => {
          const someValues = [0, "my value", { innerObjKey: 0 }];
          const test = new ObjectAssertion(obj);

          assert.throws(() => test.toContainAllValues(someValues), {
            message: `Expected the object to contain all the provided values <${someValues}>`,
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toContainAllValues(someValues), test);
        });
      });
    });
  });

  describe(".toContainAnyValues", () => {
    context("when the object contains at least one of the provided values", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("returns the assertion instance", () => {
          const someValues = [0, "my value", { innerObjKey: 0 }];
          const test = new ObjectAssertion(obj);

          assert.deepStrictEqual(test.toContainAnyValues(someValues), test);
          assert.throws(() => test.not.toContainAnyValues(someValues), {
            message: `Expected the object NOT to contain any of the provided values <${someValues}>`,
            name: ASSERTION_ERROR
          });
        });
      });
    });

    context("when the object does NOT contain any of the provided values", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("throws an assertion error", () => {
          const wrongValues = [10, "wrong value", { innerObjKey: 0 }];
          const test = new ObjectAssertion(obj);

          assert.throws(() => test.toContainAnyValues(wrongValues), {
            message: `Expected the object to contain at least one of the provided values <${wrongValues}>`,
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toContainAnyValues(wrongValues), test);
        });
      });
    });
  });

  describe(".toContainEntry", () => {
    context("when the object contains the provided entry", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        ENTRIES
        .forEach(entry => {
          it("returns the assertion instance", () => {
            const test = new ObjectAssertion(obj);

            assert.deepStrictEqual(test.toContainEntry(entry), test);
            assert.throws(() => test.not.toContainEntry(entry), {
              message: `Expected the object NOT to contain the provided entry <${JSON.stringify(entry)}>`,
              name: ASSERTION_ERROR
            });
          });
        });
      });
    });

    context("when the object does NOT contain the provided entry", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        WRONG_ENTRIES.forEach( wrongEntry => {
          it("throws an assertion error", () => {
            const test = new ObjectAssertion(obj);

            assert.throws(() => test.toContainEntry(wrongEntry), {
              message: `Expected the object to contain the provided entry <${JSON.stringify(wrongEntry)}>`,
              name: ASSERTION_ERROR
            });
            assert.deepStrictEqual(test.not.toContainEntry(wrongEntry), test);
          });
        });
      });
    });
  });

  describe(".toContainAllEntries", () => {
    context("when the object contains all the provided entries", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("returns the assertion instance", () => {
          const test = new ObjectAssertion(obj);

          assert.deepStrictEqual(test.toContainAllEntries(ENTRIES), test);
          assert.throws(() => test.not.toContainAllEntries(ENTRIES), {
            message: `Expected the object NOT to contain all the provided entries <${JSON.stringify(ENTRIES)}>`,
            name: ASSERTION_ERROR
          });
        });
      });
    });

    context("when the object does NOT contain all the provided entries", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("throws an assertion error", () => {
          const test = new ObjectAssertion(obj);

          assert.throws(() => test.toContainAllEntries(SOME_ENTRIES), {
            message: `Expected the object to contain all the provided entries <${JSON.stringify(SOME_ENTRIES)}>`,
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toContainAllEntries(SOME_ENTRIES), test);
        });
      });
    });
  });

  describe(".toContainAnyEntries", () => {
    context("when the object contains at least one of the provided entries", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("returns the assertion instance", () => {
          const test = new ObjectAssertion(obj);

          assert.deepStrictEqual(test.toContainAnyEntries(SOME_ENTRIES), test);
          assert.throws(() => test.not.toContainAnyEntries(SOME_ENTRIES), {
              message: `Expected the object NOT to contain any of the provided entries <${JSON.stringify(SOME_ENTRIES)}>`,
              name: ASSERTION_ERROR
          });
        });
      });
    });

    context("when the object does NOT contain any of the provided entries", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("throws an assertion error", () => {
          const test = new ObjectAssertion(obj);

          assert.throws(() => test.toContainAnyEntries(WRONG_ENTRIES), {
            message: `Expected the object to contain at least one of the provided entries <${JSON.stringify(WRONG_ENTRIES)}>`,
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toContainAnyEntries(WRONG_ENTRIES), test);
        });
      });
    });
  });

  describe(".toPartiallyMatch", () => {
    context("when the object matches the provided object", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("returns the assertion instance", () => {
          const provObj = {
            myKey: 0,
            2: {
              innerObjKey: 1,
              message: "inner value"
            }
          };
          const test = new ObjectAssertion(obj);

          assert.deepStrictEqual(test.toPartiallyMatch(provObj), test);
          assert.throws(() => test.not.toPartiallyMatch(provObj), {
            message: "Expected the object NOT to be a partial match",
            name: ASSERTION_ERROR
          });
        });
      });
    });

    context("when the object does NOT match the provided object", () => {
      [TEST_OBJ, makeObject()].forEach(obj => {
        it("throws an assertion error", () => {
          const provObj = {
            myKey: 0,
            wrongKey: "wrong value"
          };
          const test = new ObjectAssertion(obj);

          assert.throws(() => test.toPartiallyMatch(provObj), {
            message: "Expected the object to be a partial match",
            name: ASSERTION_ERROR
          });
          assert.deepStrictEqual(test.not.toPartiallyMatch(provObj), test);
        });
      });
    });
  });
});
