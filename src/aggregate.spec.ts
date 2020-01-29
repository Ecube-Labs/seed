import { Aggregate, Identifier, Property } from "./aggregate";

class User extends Aggregate<User> {
  @Identifier()
  private id: number;

  constructor(id: number) {
    super();
    this.id = id;
  }
}

class Team extends Aggregate<Team> {
  @Identifier()
  private id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}

class Apple extends Aggregate<Apple> {
  @Property()
  iPhone = "iPhone";

  @Property()
  airPower?: string;

  iPhone12?: string;

  @Property()
  headPhoneJackCount = 0;
}

describe("Test Aggregate", () => {
  describe("Test getId()", () => {
    test("The type of the aggregate's identifier should be number.", () => {
      const user = new User(1);

      expect(user.getId()).toBe(1);
    });

    test("The type of the aggregate's identifier should be string.", () => {
      const team = new Team("sw");

      expect(team.getId()).toBe("sw");
    });
  });

  describe("Test toNullable()", () => {
    test("When optional property decorated by @Property does not have value, it should be converted to null.", () => {
      const apple = new Apple();

      expect(apple.toNullable()).toEqual({
        airPower: null,
        headPhoneJackCount: 0,
        iPhone: "iPhone"
      });
    });

    test("When optional property decorated by @Property does have value, it should be changed.", () => {
      const apple = new Apple();
      apple.airPower = "none";

      expect(apple.toNullable()).toEqual({
        airPower: "none",
        headPhoneJackCount: 0,
        iPhone: "iPhone"
      });
    });
  });
});
