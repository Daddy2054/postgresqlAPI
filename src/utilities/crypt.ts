import bcrypt from "bcrypt";

const crypt_hash = (password: string): string => {
  return bcrypt.hashSync(
    password + process.env.BCRYPT_PEPPER,
    parseInt(process.env.SALT_ROUNDS as string)
  );
};

const crypt_compare = (password: string, user_password: string): boolean => {
  return bcrypt.compareSync(
    (password + process.env.BCRYPT_PEPPER) as string,
    user_password
  );
};

export { crypt_hash, crypt_compare };
