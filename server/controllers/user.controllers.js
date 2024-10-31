// Create user and save it to database and set cookie
export const registerController = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
  } catch (error) {
    console.log("Error to create user: ", error.messsage);
  }
};
export const loginController = async (req, res) => {
  try {
  } catch (error) {}
};
