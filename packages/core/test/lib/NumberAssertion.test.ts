import assert, { AssertionError } from "assert";

import { NumberAssertion } from "../../src/lib/NumberAssertion";

describe("[Unit] NumberAssertion.test.ts", () => {
  describe(".toBeZero", () => {
    context("when the value is zero", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(0);

        assert.deepStrictEqual(test.toBeZero(), test);
        assert.throws(() => test.not.toBeZero(), {
          message: "Expected the value NOT to be zero",
          name: AssertionError.name,
        });
      });
    });

    context("when the value is NOT zero", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(1);

        assert.throws(() => test.toBeZero(), {
          message: "Expected <1> to be zero",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeZero(), test);
      });
    });
  });

  describe(".toBePositive", () => {
    context("when the value is positive", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(1);

        assert.deepStrictEqual(test.toBePositive(), test);
        assert.throws(() => test.not.toBePositive(), {
          message: "Expected the value NOT to be positive",
          name: AssertionError.name,
        });
      });
    });

    context("when the value is NOT positive", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(-1);

        assert.throws(() => test.toBePositive(), {
          message: "Expected <-1> to be positive",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBePositive(), test);
      });
    });
  });

  describe(".toBeNegative", () => {
    context("when the value is negative", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(-1);

        assert.deepStrictEqual(test.toBeNegative(), test);
        assert.throws(() => test.not.toBeNegative(), {
          message: "Expected the value NOT to be negative",
          name: AssertionError.name,
        });
      });
    });

    context("when the value is NOT negative", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(1);

        assert.throws(() => test.toBeNegative(), {
          message: "Expected <1> to be negative",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeNegative(), test);
      });
    });
  });

  describe(".toBeFinite", () => {
    context("when the value is finite", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(10);

        assert.deepStrictEqual(test.toBeFinite(), test);
        assert.throws(() => test.not.toBeFinite(), {
          message: "Expected the value NOT to be finite",
          name: AssertionError.name,
        });
      });
    });

    context("when the value is NOT finite", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(Infinity);

        assert.throws(() => test.toBeFinite(), {
          message: "Expected <Infinity> to be finite",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeFinite(), test);
      });
    });
  });

  describe(".toBeNaN", () => {
    context("when the value is NaN", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(NaN);

        assert.deepStrictEqual(test.toBeNaN(), test);
        assert.throws(() => test.not.toBeNaN(), {
          message: "Expected the value NOT to be NaN",
          name: AssertionError.name,
        });
      });
    });

    context("when the value is NOT NaN", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(Infinity);

        assert.throws(() => test.toBeNaN(), {
          message: "Expected <Infinity> to be NaN",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeNaN(), test);
      });
    });
  });

  describe(".toBeEven", () => {
    context("when the value is even", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(2);

        assert.deepStrictEqual(test.toBeEven(), test);
        assert.throws(() => test.not.toBeEven(), {
          message: "Expected the value NOT to be even",
          name: AssertionError.name,
        });
      });
    });

    context("when the value is NOT even", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(1);

        assert.throws(() => test.toBeEven(), {
          message: "Expected <1> to be even",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeEven(), test);
      });
    });
  });

  describe(".toBeOdd", () => {
    context("when the value is odd", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(1);

        assert.deepStrictEqual(test.toBeOdd(), test);
        assert.throws(() => test.not.toBeOdd(), {
          message: "Expected the value NOT to be odd",
          name: AssertionError.name,
        });
      });
    });

    context("when the value is NOT odd", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(2);

        assert.throws(() => test.toBeOdd(), {
          message: "Expected <2> to be odd",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeOdd(), test);
      });
    });
  });

  describe(".toBeGreaterThan", () => {
    context("when the actual value is greater than passed argument", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(3);

        assert.deepStrictEqual(test.toBeGreaterThan(2), test);
        assert.throws(() => test.not.toBeGreaterThan(2), {
          message: "Expected <3> NOT to be greater than <2>",
          name: AssertionError.name,
        });
      });
    });

    context("when the actual value is NOT greater than passed argument", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(1);

        assert.throws(() => test.toBeGreaterThan(2), {
          message: "Expected <1> to be greater than <2>",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeGreaterThan(2), test);
      });
    });
  });

  describe(".toBeGreaterThanOrEqual", () => {
    context("when the actual value is greater than or equal to passed argument", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(2);

        assert.deepStrictEqual(test.toBeGreaterThanOrEqual(2), test);
        assert.throws(() => test.not.toBeGreaterThanOrEqual(2), {
          message: "Expected <2> NOT to be greater than or equal to <2>",
          name: AssertionError.name,
        });
      });
    });

    context("when the actual value is NOT greater than or equal to passed argument", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(1);

        assert.throws(() => test.toBeGreaterThanOrEqual(2), {
          message: "Expected <1> to be greater than or equal to <2>",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeGreaterThanOrEqual(2), test);
      });
    });
  });

  describe(".toBeLessThan", () => {
    context("when the actual value is less than passed argument", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(1);

        assert.deepStrictEqual(test.toBeLessThan(2), test);
        assert.throws(() => test.not.toBeLessThan(2), {
          message: "Expected <1> NOT to be less than <2>",
          name: AssertionError.name,
        });
      });
    });

    context("when the actual value is NOT less than passed argument", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(3);

        assert.throws(() => test.toBeLessThan(2), {
          message: "Expected <3> to be less than <2>",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeLessThan(2), test);
      });
    });
  });

  describe(".toBeLessThanOrEqual", () => {
    context("when the actual value is less than or equal to passed argument", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(2);

        assert.deepStrictEqual(test.toBeLessThanOrEqual(2), test);
        assert.throws(() => test.not.toBeLessThanOrEqual(2), {
          message: "Expected <2> NOT to be less than or equal to <2>",
          name: AssertionError.name,
        });
      });
    });

    context("when the actual value is NOT less than or equal to passed argument", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(3);

        assert.throws(() => test.toBeLessThanOrEqual(2), {
          message: "Expected <3> to be less than or equal to <2>",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeLessThanOrEqual(2), test);
      });
    });
  });

  describe(".toBeBetween", () => {
    context("when the actual value is between passed range argument and is NOT inclusive", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(11);
        test.toBeBetween({ inclusive: true, range: [10, 12] });
        assert.deepStrictEqual(test.toBeBetween({ inclusive: false, range: [10, 12] }), test);
        assert.throws(() => test.not.toBeBetween({ inclusive: false, range: [10, 12] }), {
          message: "Expected <11> NOT to be between (10, 12) range",
          name: AssertionError.name,
        },
        );
      });
    });

    context("when the actual value is NOT between passed range argument and is NOT inclusive", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(5);

        assert.throws(() => test.toBeBetween({ inclusive: false, range: [10, 12] }), {
          message: "Expected <5> to be between (10, 12) range",
          name: AssertionError.name,
        },
        );
        assert.deepStrictEqual(test.not.toBeBetween({ inclusive: false, range: [10, 12] }), test);
      });
    },
    );

    context("when the actual value is between passed range argument and is inclusive", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(12);

        assert.deepStrictEqual(test.toBeBetween({ inclusive: true, range: [10, 12] }), test);
        assert.throws(() => test.not.toBeBetween({ inclusive: true, range: [10, 12] }), {
          message: "Expected <12> NOT to be between [10, 12] range",
          name: AssertionError.name,
        },
        );
      });
    });

    context("when the actual value is NOT between passed range argument and is inclusive", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(5);

        assert.throws(() => test.toBeBetween({ inclusive: true, range: [10, 12] }), {
          message: "Expected <5> to be between [10, 12] range",
          name: AssertionError.name,
        },
        );
        assert.deepStrictEqual(test.not.toBeBetween({ inclusive: true, range: [10, 12] }), test);
      });
    });

    context("when InclusiveBetweenOptions are used", () => {
      context("and the range is inclusive", () => {
        it("returns the assertion instance", () => {
          const test = new NumberAssertion(11);

          assert.deepStrictEqual(test.toBeBetween({ inclusive: true, range: [10, 12] }), test);
          assert.throws(() => test.not.toBeBetween({ inclusive: true, range: [10, 12] }), {
            message: "Expected <11> NOT to be between [10, 12] range",
            name: AssertionError.name,
          },
          );
        });
      });

      context("and the range is not inclusive", () => {
        it("throws an assertion error", () => {
          const test = new NumberAssertion(10);

          assert.throws(() => test.toBeBetween({ inclusive: false, range: [10, 12] }), {
            message: "Expected <10> to be between (10, 12) range",
            name: AssertionError.name,
          },
          );
          assert.deepStrictEqual(test.not.toBeBetween({ inclusive: false, range: [10, 12] }), test);
        });
      });
    });

    context("when LowInclusiveBetweenOptions are used", () => {
      context("and actual value is between passed range argument and low limit is NOT inclusive", () => {
        it("returns the assertion instance", () => {
          const test = new NumberAssertion(11);

          assert.deepStrictEqual(test.toBeBetween({ lowInclusive: false, range: [10, 12] }), test);
          assert.throws(() => test.not.toBeBetween({ lowInclusive: false, range: [10, 12] }),
            {
              message: "Expected <11> NOT to be between (10, 12) range",
              name: AssertionError.name,
            },
          );
        });
      },
      );

      context("and actual value is NOT between passed range argument and low limit is NOT inclusive", () => {
        it("throws an assertion error", () => {
          const test = new NumberAssertion(5);

          assert.throws(() => test.toBeBetween({ lowInclusive: false, range: [10, 12] }), {
            message: "Expected <5> to be between (10, 12) range",
            name: AssertionError.name,
          },
          );
          assert.deepStrictEqual(test.not.toBeBetween({ lowInclusive: false, range: [10, 12] }), test);
        });
      },
      );

      context("and the actual value is between passed range argument and low limit is inclusive", () => {
        it("returns the assertion instance", () => {
          const test = new NumberAssertion(10);

          assert.deepStrictEqual(test.toBeBetween({ lowInclusive: true, range: [10, 12] }), test);
          assert.throws(() => test.not.toBeBetween({ lowInclusive: true, range: [10, 12] }), {
            message: "Expected <10> NOT to be between [10, 12) range",
            name: AssertionError.name,
          },
          );
        });
      },
      );

      context("and the actual value is NOT between passed range argument and low limit is inclusive", () => {
        it("throws an assertion error", () => {
          const test = new NumberAssertion(5);

          assert.throws(() => test.toBeBetween({ lowInclusive: true, range: [10, 12] }), {
            message: "Expected <5> to be between [10, 12) range",
            name: AssertionError.name,
          },
          );
          assert.deepStrictEqual(test.not.toBeBetween({ lowInclusive: true, range: [10, 12] }), test);
        });
      },
      );
    });

    context("when HighInclusiveBetweenOptions are used", () => {
      context("and the actual value is between passed range argument and high limit is NOT inclusive", () => {
        it("returns the assertion instance", () => {
          const test = new NumberAssertion(11);

          assert.deepStrictEqual(test.toBeBetween({ highInclusive: false, range: [10, 12] }), test);
          assert.throws(() => test.not.toBeBetween({ highInclusive: false, range: [10, 12] }), {
            message: "Expected <11> NOT to be between (10, 12) range",
            name: AssertionError.name,
          },
          );
        });
      },
      );

      context("and the actual value is NOT between passed range argument and high limit is NOT inclusive", () => {
        it("throws an assertion error", () => {
          const test = new NumberAssertion(5);

          assert.throws(() => test.toBeBetween({ highInclusive: false, range: [10, 12] }), {
            message: "Expected <5> to be between (10, 12) range",
            name: AssertionError.name,
          },
          );
          assert.deepStrictEqual(test.not.toBeBetween({ highInclusive: false, range: [10, 12] }), test);
        });
      },
      );

      context("and the actual value is between passed range argument and high limit is inclusive",
        () => {
          it("returns the assertion instance", () => {
            const test = new NumberAssertion(12);

            assert.deepStrictEqual(test.toBeBetween({ highInclusive: true, range: [10, 12] }), test);
            assert.throws(() => test.not.toBeBetween({ highInclusive: true, range: [10, 12] }), {
              message:
                  "Expected <12> NOT to be between (10, 12] range",
              name: AssertionError.name,
            },
            );
          });
        },
      );

      context("and the actual value is NOT between passed range argument and high limit is inclusive", () => {
        it("throws an assertion error", () => {
          const test = new NumberAssertion(5);

          assert.throws(() => test.toBeBetween({ highInclusive: true, range: [10, 12] }), {
            message: "Expected <5> to be between (10, 12] range",
            name: AssertionError.name,
          },
          );
          assert.deepStrictEqual(test.not.toBeBetween({ highInclusive: true, range: [10, 12] }), test);
        });
      },
      );
    });
  });

  describe(".toBeCloseTo", () => {
    context("when the actual value is close to passed argument with offset", () => {
      it("returns the assertion instance", () => {
        const test = new NumberAssertion(9);

        assert.deepStrictEqual(test.toBeCloseTo({ value: 10, withOffset: 2 }), test);
        assert.throws(() => test.not.toBeCloseTo({ value: 10, withOffset: 2 }), {
          message: "Expected <9> NOT to be close to <10> with offset <2>",
          name: AssertionError.name,
        },
        );
      });
    });

    context("when the value is NOT close to passed argument with offset", () => {
      it("throws an assertion error", () => {
        const test = new NumberAssertion(4);

        assert.throws(() => test.toBeCloseTo({ value: 10, withOffset: 2 }), {
          message: "Expected <4> to be close to <10> with offset <2>",
          name: AssertionError.name,
        },
        );
        assert.deepStrictEqual(test.not.toBeCloseTo({ value: 10, withOffset: 2 }), test);
      });
    });
  });
});
