import { User, UserStore } from "../../models/user";

const store = new UserStore();
const user: User = {
  id: "1",
  first_name: "first_name",
  last_name: "last_name",
  username: "username",
  password: "1234567890absdefgh",
  admin: false,
};
const users: User[] = [user];
const admin: User = user;
admin.admin = true;

describe("User model testing suite", () => {
  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("create method should add a user", async () => {
    const result = await store.create(user);
    expect(result).toEqual(user);
  });
 
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result).toEqual(users);
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("show method should return the correct user", async () => {
    const result = await store.show(user.username);
    expect(result).toEqual(user);
  });

  it("should have a login method", () => {
    expect(store.login).toBeDefined();
  });
  it("login method should login a user", async () => {
    const result = await store.login(user.username, user.password);
    expect(result).toEqual(user);
  });

  it("should have a makeAdmin method", () => {
    expect(store.makeAdmin).toBeDefined();
  });
  it("makeAdmin method should update the correct user as admin", async () => {
    const result = await store.makeAdmin(user.username);
    expect(result).toEqual(admin);
  });
});
