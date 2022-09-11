import { User } from "../../models/user";
import jwt from "jsonwebtoken";
import generateAuthToken from "../../utilities/generate_token";

const user: User = {
  id: "1",
  first_name: "first_name",
  last_name: "last_name",
  username: "username",
  password: "password",
  admin: false,
};

describe("Utilities testing suite", () => {
  it("should have a generateAuthToken function", () => {
    expect(generateAuthToken).toBeDefined();
  });
  it("generateAuthToken function should return a valid token", () => {
    const token: string |undefined = generateAuthToken(user);
    const result = jwt.verify(token as string, process.env.TOKEN_SECRET as string);

    expect(result).toEqual({ user });
  });

 
});
