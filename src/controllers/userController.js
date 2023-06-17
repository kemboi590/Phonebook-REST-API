import sql from "mssql";
import config from "../db/config.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};

export const register = async (req, res) => {
  const { FirstName, LastName, Password } = req.body; //destructuring
  const hashedPassword = bcrypt.hashSync(Password, 10);
  try {
    //check if user exists
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("FirstName", sql.VarChar, FirstName)
      .input("LastName", sql.VarChar, LastName)
      .query(
        "SELECT * FROM Users WHERE FirstName = @FirstName AND LastName = @LastName"
      );
    const user = result.recordset[0];
    if (user) {
      res.status(409).send("User already exists");
    } else {
      //if user does not exist we register the user
      await pool
        .request()
        .input("FirstName", sql.VarChar, FirstName)
        .input("LastName", sql.VarChar, LastName)
        .input("hashedPassword", sql.VarChar, hashedPassword)
        .query(
          "INSERT INTO Users (FirstName, LastName, hashedPassword) VALUES (@FirstName, @LastName, @hashedPassword)"
        );
      res.status(200).send("User Created successfully");
    }
  } catch (error) {
    res.status(409).send(error.message);
  } finally {
    sql.close();
  }
};

export const login = async (req, res) => {
  const { FirstName, LastName, Password } = req.body; //destructuring
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("FirstName", sql.VarChar, FirstName)
      .input("LastName", sql.VarChar, LastName)
      .query(
        "SELECT * FROM Users WHERE FirstName = @FirstName AND LastName = @LastName"
      );
    const user = result.recordset[0];
    //if user does not exist
    if (!user) {
      res.status(401).send("The username does not exist");
    } else {
      if (!bcrypt.compareSync(Password, user.hashedPassword)) {
        //if password is wrong
        res.status(401).send("Wrong Password");
      } else {
        //create token
        const token = `JWT ${jwt.sign(
          { FirstName: user.FirstName, LastName: user.LastName },
          config.jwt_secret,
          { expiresIn: "1h" }
        )}`;
        res.status(200).json({
          FirstName: user.FirstName,
          LastName: user.LastName,
          UserID: user.UserID,
          token: token,
        });
      }
    }
  } catch (error) {
  } finally {
    sql.close();
  }
};
