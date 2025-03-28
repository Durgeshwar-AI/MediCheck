import User from "../models/user.register.js";

export const createUser = async ({
  firstname,
  lastname,
  email,
  phone,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = await User.create({
    fullname: { firstname, lastname },
    email,
    phone,
    password,
  });
  return user;
};
