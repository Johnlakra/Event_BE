const db = require("../config/dbConn");

const createParish = async (req, res) => {
  const sql = "INSERT INTO parish (`name`, `deanery_id`) VALUES (?, ?)";
  const values = [req.body.name, req.body.deanery_id];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Parish added successfully" });
    } else {
      return res.status(400).json({ message: "Failed to add parish" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getParishes = async (req, res) => {
  const sql = "SELECT * FROM `parish`";
  try {
    const result = await db.query(sql);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getParish = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `parish` WHERE `id` = ?";
  try {
    const result = await db.query(sql, [id]);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const editParish = async (req, res) => {
  const sql = "UPDATE parish SET `name`=?, `deanery_id`=? WHERE `id`=?";
  const values = [req.body.name, req.body.deanery_id, req.body.id];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Parish updated successfully" });
    } else {
      return res.status(400).json({ message: "Failed to update parish" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteParish = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM parish WHERE `id`=?";
  const values = [id];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Parish deleted successfully" });
    } else {
      res.status(400).json({ message: "Failed to delete parish" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something unexpected has occured" });
  }
};

module.exports = {
  createParish,
  getParish,
  getParishes,
  editParish,
  deleteParish,
};
