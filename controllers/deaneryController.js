const db = require("../config/dbConn");

const createDeanery = async (req, res) => {
  const sql = "INSERT INTO deanery (`name`) VALUES (?)";
  const values = [req.body.name];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Deanery added successfully" });
    } else {
      return res.status(400).json({ message: "Failed to add deanery" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getDeneraries = async (req, res) => {
  const sql = "SELECT * FROM `deanery`";
  try {
    const result = await db.query(sql);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getDeanery = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `deanery` WHERE `id` = ?";
  try {
    const result = await db.query(sql, [id]);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const editDeanery = async (req, res) => {
  const sql = "UPDATE deanery SET `name`=? WHERE `id`=?";
  const values = [req.body.name, req.body.id];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Deanery updated successfully" });
    } else {
      return res.status(400).json({ message: "Failed to update deanery" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteDeanery = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM deanery WHERE `id`=?";
  const values = [id];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Deanery deleted successfully" });
    } else {
      res.status(400).json({ message: "Failed to delete deanery" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something unexpected has occured" });
  }
};

module.exports = {
  createDeanery,
  getDeanery,
  getDeneraries,
  editDeanery,
  deleteDeanery,
};
