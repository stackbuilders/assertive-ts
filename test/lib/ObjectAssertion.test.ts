import assert, { AssertionError } from "assert";

import { ObjectAssertion } from "../../src/lib/ObjectAssertion";

type Entry = ["myKey", number] | [2, { innerObjKey: number; message: string; }] | [string, boolean];

const RECORD: Record<string, boolean> = {
  "falsy": false,
  "truthy": true
};

const TEST_OBJ = {
  myKey: 0,
  2: {
    innerObjKey: 1,
    message: "inner value"
  }
};

describe("[Unit] ObjectAssertion.test.ts", () => {
  describe(".toBeEmpty", () => {
    context("when the object is an empty object", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({ });

        assert.deepStrictEqual(test.toBeEmpty(), test);
        assert.throws(() => test.not.toBeEmpty(), {
          message: "Expected the value NOT to be an empty object",
          name: AssertionError.name
        });
      });
    });

    context("when the object is NOT an empty object", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion(TEST_OBJ);

        assert.throws(() => test.toBeEmpty(), {
          message: "Expected the value to be an empty object",
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toBeEmpty(), test);
      });
    });
  });

  describe(".toContainKey", () => {
    context("when the object contains the provided key", () => {
      it("returns the assertion instance", () => {
        const key = "myKey";
        const test = new ObjectAssertion(TEST_OBJ);

        assert.deepStrictEqual(test.toContainKey(key), test);
        assert.throws(() => test.not.toContainKey(key), {
          message: `Expected the object NOT to contain the provided key <${key}>`,
          name: AssertionError.name
        });
      });
    });

    context("when the object does NOT contain the provided key", () => {
      it("throws an assertion error", () => {
        const wrongKey = "wrongKey";
        const test = new ObjectAssertion(RECORD);

        assert.throws(() => test.toContainKey(wrongKey), {
          message: `Expected the object to contain the provided key <${wrongKey}>`,
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toContainKey(wrongKey), test);
      });
    });
  });

  describe(".toContainAllKeys", () => {
    context("when the object contains all the provided keys", () => {
      it("returns the assertion instance", () => {
        const keys: Array<"myKey" | 2> = ["myKey", 2];
        const test = new ObjectAssertion(TEST_OBJ);

        assert.deepStrictEqual(test.toContainAllKeys(["myKey", 2]), test);
        assert.throws(() => test.not.toContainAllKeys(keys), {
          message: `Expected the object NOT to contain all the provided keys <${keys}>`,
          name: AssertionError.name
        });
      });
    });

    context("when the object does NOT contain all the provided keys", () => {
      it("throws an assertion error", () => {
        const someKeys = ["truthy", "wrongKey"];
        const test = new ObjectAssertion(RECORD);

        assert.throws(() => test.toContainAllKeys(someKeys), {
          message: `Expected the object to contain all the provided keys <${someKeys}>`,
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toContainAllKeys(someKeys), test);
      });
    });
  });

  describe(".toContainAnyKeys", () => {
    context("when the object contains at least one of the the provided keys", () => {
      it("returns the assertion instance", () => {
        const someKeys = ["truthy", "wrongKey"];
        const test = new ObjectAssertion(RECORD);

        assert.deepStrictEqual(test.toContainAnyKeys(someKeys), test);
        assert.throws(() => test.not.toContainAnyKeys(someKeys), {
          message: `Expected the object NOT to contain any of the provided keys <${someKeys}>`,
          name: AssertionError.name
        });
      });
    });

    context("when the object does NOT contain any of the provided keys", () => {
      it("throws an assertion error", () => {
        const wrongKeys = ["wrongKey", "randomKey"];
        const test = new ObjectAssertion(RECORD);

        assert.throws(() => test.toContainAnyKeys(wrongKeys), {
          message: `Expected the object to contain at least one of the provided keys <${wrongKeys}>`,
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toContainAnyKeys(wrongKeys), test);
      });
    });
  });

  describe(".toContainValue", () => {
    context("when the object contains the provided value", () => {
      it("returns the assertion instance", () => {
        const value = { innerObjKey: 1, message: "inner value" };
        const test = new ObjectAssertion(TEST_OBJ);

        assert.deepStrictEqual(test.toContainValue(value), test);
        assert.throws(() => test.not.toContainValue(value), {
          message: `Expected the object NOT to contain the provided value <${value}>`,
          name: AssertionError.name
        });
      });
    });

    context("when the object does NOT contain the provided value", () => {
      it("throws an assertion error", () => {
        const wrongValue = 4;
        const test = new ObjectAssertion(TEST_OBJ);

        assert.throws(() => test.toContainValue(wrongValue), {
          message: `Expected the object to contain the provided value <${wrongValue}>`,
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toContainValue(wrongValue), test);
      });
    });
  });

  describe(".toContainAllValues", () => {
    context("when the object contains all the provided values", () => {
      it("returns the assertion instance", () => {
        const allValues = [0, { innerObjKey: 1, message: "inner value" }];
        const test = new ObjectAssertion(TEST_OBJ);

        assert.deepStrictEqual(test.toContainAllValues(allValues), test);
        assert.throws(() => test.not.toContainAllValues(allValues), {
          message: `Expected the object NOT to contain all the provided values <${allValues}>`,
          name: AssertionError.name
        });
      });
    });

    context("when the object does NOT contain all the provided values", () => {
      it("throws an assertion error", () => {
        const someValues = [0, { innerObjKey: 1, message: "wrong inner value" }];
        const test = new ObjectAssertion(TEST_OBJ);

        assert.throws(() => test.toContainAllValues(someValues), {
          message: `Expected the object to contain all the provided values <${someValues}>`,
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toContainAllValues(someValues), test);
      });
    });
  });

  describe(".toContainAnyValues", () => {
    context("when the object contains at least one of the provided values", () => {
      it("returns the assertion instance", () => {
        const someValues = [0, { innerObjKey: 1, message: "wrong inner value" }];
        const test = new ObjectAssertion(TEST_OBJ);

        assert.deepStrictEqual(test.toContainAnyValues(someValues), test);
        assert.throws(() => test.not.toContainAnyValues(someValues), {
          message: `Expected the object NOT to contain any of the provided values <${someValues}>`,
          name: AssertionError.name
        });
      });
    });

    context("when the object does NOT contain any of the provided values", () => {
      it("throws an assertion error", () => {
        const wrongValues = [10, { innerObjKey: 1, message: "wrong inner value" }];
        const test = new ObjectAssertion(TEST_OBJ);

        assert.throws(() => test.toContainAnyValues(wrongValues), {
          message: `Expected the object to contain at least one of the provided values <${wrongValues}>`,
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toContainAnyValues(wrongValues), test);
      });
    });
  });

  describe(".toContainEntry", () => {
    context("when the object contains the provided entry", () => {
      it("returns the assertion instance", () => {
        const entry: Entry = ["myKey", 0];
        const test = new ObjectAssertion(TEST_OBJ);

        assert.deepStrictEqual(test.toContainEntry(entry), test);
        assert.throws(() => test.not.toContainEntry(entry), {
          message: `Expected the object NOT to contain the provided entry <${JSON.stringify(entry)}>`,
          name: AssertionError.name
        });
      });
    });

    context("when the object does NOT contain the provided entry", () => {
      it("throws an assertion error", () => {
        const wrongEntry: Entry = ["myKey", 2];
        const test = new ObjectAssertion(TEST_OBJ);

        assert.throws(() => test.toContainEntry(wrongEntry), {
          message: `Expected the object to contain the provided entry <${JSON.stringify(wrongEntry)}>`,
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toContainEntry(wrongEntry), test);
      });
    });
  });

  describe(".toContainAllEntries", () => {
    context("when the object contains all the provided entries", () => {
      it("returns the assertion instance", () => {
        const entry1: Entry = ["myKey", 0];
        const entry2: Entry = [2, { innerObjKey: 1, message: "inner value" }];
        const test = new ObjectAssertion(TEST_OBJ);

        assert.deepStrictEqual(test.toContainAllEntries(entry1, entry2), test);
        assert.throws(() => test.not.toContainAllEntries(entry1, entry2), {
          message: `Expected the object NOT to contain all the provided entries <${JSON.stringify([entry1, entry2])}>`,
          name: AssertionError.name
        });
      });
    });

    context("when the object does NOT contain all the provided entries", () => {
      it("throws an assertion error", () => {
        const entry: Entry = ["truthy", true];
        const wrongEntry: Entry = ["wrongKey", false];
        const test = new ObjectAssertion(RECORD);

        assert.throws(() => test.toContainAllEntries(entry, wrongEntry), {
          message: `Expected the object to contain all the provided entries <${JSON.stringify([entry, wrongEntry])}>`,
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toContainAllEntries(entry, wrongEntry), test);
      });
    });
  });

  describe(".toContainAnyEntries", () => {
    context("when the object contains at least one of the provided entries", () => {
      it("returns the assertion instance", () => {
        const entry: Entry = ["truthy", true];
        const wrongEntry: Entry = ["wrongKey", false];
        const test = new ObjectAssertion(RECORD);

        assert.deepStrictEqual(test.toContainAnyEntries(entry, wrongEntry), test);
        assert.throws(() => test.not.toContainAnyEntries(entry, wrongEntry), {
          message: `Expected the object NOT to contain any of the provided entries <${JSON.stringify([entry, wrongEntry])}>`,
          name: AssertionError.name
        });
      });
    });

    context("when the object does NOT contain any of the provided entries", () => {
      it("throws an assertion error", () => {
        const wrongEntry1: Entry = ["wrongKey", false];
        const wrongEntry2: Entry = ["truthy", false];
        const test = new ObjectAssertion(RECORD);

        assert.throws(() => test.toContainAnyEntries(wrongEntry1, wrongEntry2), {
          message: `Expected the object to contain at least one of the provided entries <${JSON.stringify([wrongEntry1, wrongEntry2])}>`,
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toContainAnyEntries(wrongEntry1, wrongEntry2), test);
      });
    });
  });

  describe(".toPartiallyMatch", () => {
    context("when the object matches the provided object", () => {
      it("returns the assertion instance", () => {
        const provObj = {
          myKey: 0,
          2: {
            innerObjKey: 1,
            message: "inner value"
          }
        };
        const test = new ObjectAssertion(TEST_OBJ);

        assert.deepStrictEqual(test.toPartiallyMatch(provObj), test);
        assert.throws(() => test.not.toPartiallyMatch(provObj), {
          message: "Expected the object NOT to be a partial match",
          name: AssertionError.name
        });
      });
    });

    context("when the object does NOT match the provided object", () => {
      it("throws an assertion error", () => {
        const provObj = {
          myKey: 0,
          wrongKey: "wrong value"
        };
        const test = new ObjectAssertion(TEST_OBJ);

        assert.throws(() => test.toPartiallyMatch(provObj), {
          message: "Expected the object to be a partial match",
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toPartiallyMatch(provObj), test);
      });
    });
  });
});
