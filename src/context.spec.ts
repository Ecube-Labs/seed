import { Service, Inject } from "typedi";
import { Context } from "./context";

@Service()
class User {
  @Inject()
  context!: Context;
}

class Group {
  name?: string;
}

describe("Test Context", () => {
  test("context.txId should match the initially passed parameter.", () => {
    const context = Context.of("TXID");

    expect(context.txId).toBe("TXID");
  });

  test("Context should provide singleton scope for instances.", () => {
    const context = Context.of("TXID");

    const user1 = context.get(User);
    const user2 = context.get(User);

    expect(user1).toBe(user2);
  });

  test("Context should not create a new instance when it already has one.", () => {
    const context = Context.of("TXID");

    const group = new Group();
    group.name = "node.js";

    context.set(Group, group);

    expect(context.get(Group)).toBe(group);
  });
});
