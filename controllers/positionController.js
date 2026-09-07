const db = require("../config/dbConn");

const createPosition = async (req, res) => {
  const sql = "INSERT INTO `place` (`name`, `type`, `point`) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.type, req.body.point];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Position added successfully" });
    } else {
      return res.status(400).json({ message: "Failed to add position" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getPositions = async (req, res) => {
  const sql = "SELECT * FROM `place`";
  try {
    const result = await db.query(sql);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getPosition = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `place` WHERE `id` = ?";
  try {
    const result = await db.query(sql, [id]);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const editPosition = async (req, res) => {
  const { name, type, point } = req.body;
  const sql = "UPDATE `place` SET `name`=?, `type`=?, `point`=? WHERE `id`=?";
  const values = [name, type, point, req.body.id];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Position updated successfully" });
    } else {
      return res.status(400).json({ message: "Failed to update position" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deletePosition = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM `place` WHERE `id`=?";
  const values = [id];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Position deleted successfully" });
    } else {
      res.status(400).json({ message: "Failed to delete position" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something unexpected has occured" });
  }
};

module.exports = {
  createPosition,
  getPosition,
  getPositions,
  editPosition,
  deletePosition,
};
