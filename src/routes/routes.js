//importing all the functions from the controller
import {
  allUsers,
  allGroups,
  createUser,
  getSingleUser,
  updateUser,
  assignGroup,
  deleteUser,
} from "../controllers/phoneContoller.js";

//importing all functions from the controller
import {
  register,
  login,
  loginRequired,
} from "../controllers/userController.js";
//get routes
const user = (app) => {
  app.route("/users").get(loginRequired, allUsers).post(createUser);
  app.route("/groups").get(allGroups);

  //get, put, delete routes
  app.route("/users/:id").get(getSingleUser).put(updateUser).delete(deleteUser);
  app.route("/groups/:id").put(assignGroup);

  //auth register
  app.route("/auth/register").post(register);

  //auth login
  app.route("/auth/login").post(login);
};
export default user;
