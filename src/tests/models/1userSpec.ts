import { User, UserStore } from "../../models/user";

const userStore = new UserStore();
const user: User = {
  id: 1,
  first_name: "first_name",
  last_name: "last_name",
  username: "username",
  password: "1234567890absdefgh",
  admin: false,
};
const users: User[] = [user];
const password = "1234567890absdefgh";

describe("User model testing suite:", () => {
  it("should have a create method", () => {
    expect(userStore.create).toBeDefined();
  });
  it("create method should add a user", async () => {
    const result = await userStore.create(user);
    user.password = result.password;
    expect(result).toEqual(user);
    //console.log(result)
  });

  it("should have an index method", () => {
    expect(userStore.index).toBeDefined();
  });
  it("index method should return a list of users", async () => {
    const result = await userStore.index();
    expect(result).toEqual(users);
  });

  it("should have a show method", () => {
    expect(userStore.show).toBeDefined();
  });
  it("show method should return the correct user", async () => {
    const result = await userStore.show(user.username);
    expect(result).toEqual(user);
  });

  it("should have a login method", () => {
    expect(userStore.login).toBeDefined();
  });
  it("login method should login a user", async () => {
    const result = await userStore.login(user.username, password);
    expect(result).toEqual(user);
  });

  it("should have a makeAdmin method", () => {
    expect(userStore.makeAdmin).toBeDefined();
  });
  it("makeAdmin method should update the correct user as admin", async () => {
    user.admin = true;
    const result = await userStore.makeAdmin(user.username);
    user.admin = true;
    expect(result).toEqual(user);
  });
});
