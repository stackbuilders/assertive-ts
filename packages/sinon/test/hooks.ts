import Sinon from "sinon";

export function mochaHooks(): Mocha.RootHookObject {
  return {
    afterEach() {
      Sinon.restore();
    },
  };
}
