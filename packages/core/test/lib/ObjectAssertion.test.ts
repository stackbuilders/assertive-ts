import dedent from "dedent";

import { ObjectAssertion } from "../../src/lib/ObjectAssertion";
import { prettify } from "../../src/lib/helpers/messages";

import assert, { AssertionError } from "assert";

type Entry = ["myKey", number] | [2, { innerObjKey: number; message: string; }] | [string, boolean];

const RECORD: Record<string, boolean> = {
  falsy: false,
  truthy: true,
};

const TEST_OBJ = {
  2: {
    innerObjKey: 1,
    message: "inner value",
  },
  myKey: 0,
};

describe("[Unit] ObjectAssertion.test.ts", () => {
  describe(".toBeEmpty", () => {
    context("when the object is an empty object", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({ });

        assert.deepStrictEqual(test.toBeEmpty(), test);
        assert.throws(() => test.not.toBeEmpty(), {
          message: "Expected the value NOT to be an empty object",
          name: AssertionError.name,
        });
      });
    });

    context("when the object is NOT an empty object", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion(TEST_OBJ);

        assert.throws(() => test.toBeEmpty(), {
          message: "Expected the value to be an empty object",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeEmpty(), test);
      });
    });
  });

  describe(".toContainKey", () => {
    context("when the object contains the provided key", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion(TEST_OBJ);

        assert.deepStrictEqual(test.toContainKey("myKey"), test);
        assert.throws(() => test.not.toContainKey("myKey"), {
          message: 'Expected the object NOT to contain the provided key <"myKey">',
          name: AssertionError.name,
        });
      });
    });

    context("when the object does NOT contain the provided key", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion(RECORD);

        assert.throws(() => test.toContainKey("wrongKey"), {
          message: 'Expected the object to contain the provided key <"wrongKey">',
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toContainKey("wrongKey"), test);
      });
    });
  });

  describe(".toContainAllKeys", () => {
    context("when the object contains all the provided keys", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion(TEST_OBJ);

        assert.deepStrictEqual(test.toContainAllKeys("myKey", 2), test);
        assert.throws(() => test.not.toContainAllKeys("myKey", 2), {
          message: 'Expected the object NOT to contain all the provided keys <"myKey", 2>',
          name: AssertionError.name,
        });
      });
    });

    context("when the object does NOT contain all the provided keys", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion(RECORD);

        assert.throws(() => test.toContainAllKeys("truthy", "wrongKey"), {
          message: 'Expected the object to contain all the provided keys <"truthy", "wrongKey">',
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toContainAllKeys("truthy", "wrongKey"), test);
      });
    });
  });

  describe(".toContainAnyKeys", () => {
    context("when the object contains at least one of the the provided keys", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion(RECORD);

        assert.deepStrictEqual(test.toContainAnyKeys("truthy", "wrongKey"), test);
        assert.throws(() => test.not.toContainAnyKeys("truthy", "wrongKey"), {
          message: 'Expected the object NOT to contain any of the provided keys <"truthy", "wrongKey">',
          name: AssertionError.name,
        });
      });
    });

    context("when the object does NOT contain any of the provided keys", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion(RECORD);

        assert.throws(() => test.toContainAnyKeys("wrongKey", "randomKey"), {
          message: 'Expected the object to contain at least one of the provided keys <"wrongKey", "randomKey">',
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toContainAnyKeys("wrongKey", "randomKey"), test);
      });
    });
  });

  describe(".toHaveKeys", () => {
    context("when the object has exactly provided keys", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({ x: 1, y: 2, z: 3 });

        assert.deepStrictEqual(test.toHaveKeys("x", "y", "z"), test);
        assert.throws(() => test.not.toHaveKeys("x", "y", "z"), {
          message: 'Expected the object NOT to have the keys <"x", "y", "z">',
          name: AssertionError.name,
        });
      });
    });

    context("when the object does NOT have exactly the provided keys", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion({ x: 1, y: 2, z: 3 });

        assert.throws(() => test.toHaveKeys("x", "y"), {
          message: 'Expected the object to have exactly the keys <"x", "y">',
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toHaveKeys("x", "z"), test);
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
          message: `Expected the object NOT to contain the provided value <${prettify(value)}>`,
          name: AssertionError.name,
        });
      });
    });

    context("when the object does NOT contain the provided value", () => {
      it("throws an assertion error", () => {
        const wrongValue = 4;
        const test = new ObjectAssertion(TEST_OBJ);

        assert.throws(() => test.toContainValue(wrongValue), {
          message: `Expected the object to contain the provided value <${wrongValue}>`,
          name: AssertionError.name,
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

        assert.deepStrictEqual(test.toContainAllValues(...allValues), test);
        assert.throws(() => test.not.toContainAllValues(...allValues), {
          message: dedent`
            Expected the object NOT to contain all the provided values \
            <0, {"innerObjKey":1,"message":"inner value"}>
          `,
          name: AssertionError.name,
        });
      });
    });

    context("when the object does NOT contain all the provided values", () => {
      it("throws an assertion error", () => {
        const someValues = [0, { innerObjKey: 1, message: "wrong inner value" }];
        const test = new ObjectAssertion(TEST_OBJ);

        assert.throws(() => test.toContainAllValues(...someValues), {
          message: dedent`
            Expected the object to contain all the provided values \
            <0, {"innerObjKey":1,"message":"wrong inner value"}>
          `,
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toContainAllValues(...someValues), test);
      });
    });
  });

  describe(".toContainAnyValues", () => {
    context("when the object contains at least one of the provided values", () => {
      it("returns the assertion instance", () => {
        const someValues = [0, { innerObjKey: 1, message: "wrong inner value" }];
        const test = new ObjectAssertion(TEST_OBJ);

        assert.deepStrictEqual(test.toContainAnyValues(...someValues), test);
        assert.throws(() => test.not.toContainAnyValues(...someValues), {
          message: dedent`
            Expected the object NOT to contain any of the provided values \
            <0, {"innerObjKey":1,"message":"wrong inner value"}>
          `,
          name: AssertionError.name,
        });
      });
    });

    context("when the object does NOT contain any of the provided values", () => {
      it("throws an assertion error", () => {
        const wrongValues = [10, { innerObjKey: 1, message: "wrong inner value" }];
        const test = new ObjectAssertion(TEST_OBJ);

        assert.throws(() => test.toContainAnyValues(...wrongValues), {
          message: dedent`
            Expected the object to contain at least one of the provided values \
            <10, {"innerObjKey":1,"message":"wrong inner value"}>
          `,
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toContainAnyValues(...wrongValues), test);
      });
    });
  });

  describe(".toHaveValues", () => {
    context("when the object has exactly the provided values", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({ x: 1, y: "a", z: true });

        assert.deepStrictEqual(test.toHaveValues(1, "a", true), test);
        assert.throws(() => test.not.toHaveValues(1, "a", true), {
          message: 'Expected the object NOT to have the values <1, "a", true>',
          name: AssertionError.name,
        });
      });
    });

    context("when the object does NOT have exactly the provided values", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion({ x: 1, y: "a", z: true });

        assert.throws(() => test.toHaveValues(1, "a"), {
          message: 'Expected the object to have exactly the values <1, "a">',
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toHaveValues(1, "a"), test);
      });
    });
  });

  describe(".toContainEntry", () => {
    context("when the object contains the provided entry", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion(TEST_OBJ);

        assert.deepStrictEqual(test.toContainEntry(["myKey", 0]), test);
        assert.throws(() => test.not.toContainEntry(["myKey", 0]), {
          message: 'Expected the object NOT to contain the provided entry <["myKey",0]>',
          name: AssertionError.name,
        });
      });
    });

    context("when the object does NOT contain the provided entry", () => {
      it("throws an assertion error", () => {
        const wrongEntry: Entry = ["myKey", 2];
        const test = new ObjectAssertion(TEST_OBJ);

        assert.throws(() => test.toContainEntry(wrongEntry), {
          message: 'Expected the object to contain the provided entry <["myKey",2]>',
          name: AssertionError.name,
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
          message: dedent`
            Expected the object NOT to contain all the provided entries \
            <["myKey",0], [2,{"innerObjKey":1,"message":"inner value"}]>
          `,
          name: AssertionError.name,
        });
      });
    });

    context("when the object does NOT contain all the provided entries", () => {
      it("throws an assertion error", () => {
        const entry: Entry = ["truthy", true];
        const wrongEntry: Entry = ["wrongKey", false];
        const test = new ObjectAssertion(RECORD);

        assert.throws(() => test.toContainAllEntries(entry, wrongEntry), {
          message: 'Expected the object to contain all the provided entries <["truthy",true], ["wrongKey",false]>',
          name: AssertionError.name,
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
          message: dedent`
            Expected the object NOT to contain any of the provided entries \
            <["truthy",true], ["wrongKey",false]>
          `,
          name: AssertionError.name,
        });
      });
    });

    context("when the object does NOT contain any of the provided entries", () => {
      it("throws an assertion error", () => {
        const wrongEntry1: Entry = ["wrongKey", false];
        const wrongEntry2: Entry = ["truthy", false];
        const test = new ObjectAssertion(RECORD);

        assert.throws(() => test.toContainAnyEntries(wrongEntry1, wrongEntry2), {
          message: dedent`
            Expected the object to contain at least one of the provided entries \
            <["wrongKey",false], ["truthy",false]>
          `,
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toContainAnyEntries(wrongEntry1, wrongEntry2), test);
      });
    });
  });

  describe(".toHaveEntries", () => {
    context("when the object has exactly the provided entries", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({ a: 1, b: 2, c: 3 });

        assert.deepStrictEqual(test.toHaveEntries(["a", 1], ["b", 2], ["c", 3]), test);
        assert.throws(() => test.not.toHaveEntries(["a", 1], ["b", 2], ["c", 3]), {
          message: 'Expected the object NOT to have the entries <["a",1], ["b",2], ["c",3]>',
          name: AssertionError.name,
        });
      });
    });

    context("when the object doe NOT have exactly the provided entries", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion({ a: 1, b: 2, c: 3 });

        assert.throws(() => test.toHaveEntries(["a", 1], ["c", 3]), {
          message: 'Expected the object to have exactly the entries <["a",1], ["c",3]>',
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toHaveEntries(["a", 1], ["c", 3]), test);
      });
    });
  });

  describe(".toPartiallyMatch", () => {
    context("when the object matches the provided object", () => {
      it("returns the assertion instance", () => {
        const provObj = {
          2: {
            innerObjKey: 1,
            message: "inner value",
          },
          myKey: 0,
        };
        const test = new ObjectAssertion(TEST_OBJ);

        assert.deepStrictEqual(test.toPartiallyMatch(provObj), test);
        assert.throws(() => test.not.toPartiallyMatch(provObj), {
          message: dedent`
            Expected the object NOT to partially match \
            <{"2":{"innerObjKey":1,"message":"inner value"},"myKey":0}>
          `,
          name: AssertionError.name,
        });
      });
    });

    context("when the object does NOT match the provided object", () => {
      it("throws an assertion error", () => {
        const provObj = {
          myKey: 0,
          wrongKey: "wrong value",
        };
        const test = new ObjectAssertion(TEST_OBJ);

        assert.throws(() => test.toPartiallyMatch(provObj), {
          message: 'Expected the object to partially match <{"myKey":0,"wrongKey":"wrong value"}>',
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toPartiallyMatch(provObj), test);
      });
    });
  });
});
