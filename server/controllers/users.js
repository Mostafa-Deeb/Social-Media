import User from "../modules/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(
      existingUser.password,
      password
    );

    console.log(isPasswordCorrect);
    if (isPasswordCorrect) {
      console.log("not");
      res.json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(409).json({ meesage: error.message });
  }
};
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  console.log("up");
  try {
    console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("ex");
      res.status(404).json({ messgae: "User already exist" });
      return;
    }
    if (password != confirmPassword) {
      console.log("notmat");
      res.status(400).json({ message: "passwords don't match" });
      return;
    }
    console.log("noprob");
    // const name = `${FirstName} ${LastName}`;
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    console.log(result);
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
    return;
  } catch (error) {
    res.status(404).json({ message: error });
    return;
  }
};
