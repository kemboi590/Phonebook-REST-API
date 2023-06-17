import sql from "mssql";
import config from "../db/config.js";


// GET ALL BLOGS
export const allUsers = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM Contacts");
    res.json(result.recordset);
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
};

//GET ALL BLOGS GROUPS

//CREATE BLOG
export const createUser = async (req, res) => {
  try {
    const { FirstName, LastName, MobileNumber, GroupID } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("FirstName", sql.VarChar, FirstName)
      .input("LastName", sql.VarChar, LastName)
      .input("MobileNumber", sql.VarChar, MobileNumber)
      .input("GroupID", sql.Int, GroupID)
      .query(
        "INSERT INTO Contacts (FirstName, LastName, MobileNumber, GroupID) VALUES (@FirstName, @LastName, @MobileNumber, @GroupID)"
      );
    res.status(200).json(" user created successfully");
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
};


export const allGroups = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM Groups");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
};

//GET BLOG BY ID
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`SELECT * FROM Contacts WHERE ContactID = @id`);
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
};

//UPDATE BLOG
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { FirstName,LastName,MobileNumber,GroupID } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("FirstName", sql.VarChar, FirstName)
      .input("LastName", sql.VarChar, LastName)
      .input("MobileNumber", sql.VarChar, MobileNumber)
      .input("GroupID", sql.Int, GroupID)
      .query(
        `UPDATE Contacts SET FirstName = @FirstName, LastName = @LastName, MobileNumber = @MobileNumber, GroupID = @GroupID WHERE ContactID = @id`
      );
    res.status(200).json("User updated successfully");
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};

export const assignGroup = async (req, res) => { 
  try {
    const { id } = req.params;
    const { GroupID } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("GroupID", sql.Int, GroupID)
      .query(
        `UPDATE Contacts SET  GroupID = @GroupID WHERE ContactID = @id`
      );
    res.status(200).json("User updated successfully");
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
}

//DELETE BLOG
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`DELETE FROM Contacts WHERE ContactID = @id`);
    res.status(200).json("User deleted successfully");
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};
