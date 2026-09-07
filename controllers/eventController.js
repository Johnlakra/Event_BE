const db = require("../config/dbConn");

const createEvent = async (req, res) => {
  const sql = "INSERT INTO `event` (`name`, `type`) VALUES (?, ?)";
  const values = [req.body.name, req.body.type];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Event added successfully" });
    } else {
      return res.status(400).json({ message: "Failed to add event" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getEvents = async (req, res) => {
  const sql = "SELECT * FROM `event`";
  try {
    const result = await db.query(sql);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getEvent = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `event` WHERE `id` = ?";
  try {
    const result = await db.query(sql, [id]);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const editEvent = async (req, res) => {
  const sql = "UPDATE event SET `name`=?, `type`=? WHERE `id`=?";
  const values = [req.body.name, req.body.type, req.body.id];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Event updated successfully" });
    } else {
      return res.status(400).json({ message: "Failed to update event" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteEvent = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM event WHERE `id`=?";
  const values = [id];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Event deleted successfully" });
    } else {
      res.status(400).json({ message: "Failed to delete event" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something unexpected has occured" });
  }
};

module.exports = {
  createEvent,
  getEvent,
  getEvents,
  editEvent,
  deleteEvent,
};
