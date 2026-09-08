const db = require("../../../config/dbConn");

const getLeaderBoardItems = async (req, res) => {
  const sql = `
    SELECT 
    lb.id,
    d.id AS deanery_id,
    d.name AS deanery,
    p.id AS parish_id,
    IFNULL(p.name, d.name) AS parish,
    e.id AS event_id,
    e.name AS event,
    pl.id AS position_id,
    pl.name AS position,
    pl.point,
    y.name year
FROM
    leader_board lb
        LEFT JOIN
    deanery d ON lb.deanery_id = d.id
        LEFT JOIN
    parish p ON lb.parish_id = p.id
        LEFT JOIN
    event e ON lb.event_id = e.id
        LEFT JOIN
    place pl ON lb.position_id = pl.id
        LEFT JOIN
	  year y ON lb.year_id = y.id;`;
  try {
    const result = await db.query(sql);
    const output = result.reduce((acc, item)=>{
      if(!acc[item.year]) acc[item.year] = []
      acc[item.year].push(item)
      return acc
    },{})
    return res.json(output);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getLeaderBoardItem = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `leader_board` WHERE `id`=?";
  try {
    const result = await db.query(sql, [id]);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const createLeaderBoard = async (req, res) => {
  const { deanery_id, parish_id, event_id, position_id } = req.body;
  const sql =
    "INSERT INTO `leader_board` (`deanery_id`, `parish_id`, `event_id`, `position_id`) VALUES (?, ?, ?, ?)";
  const values = [deanery_id, parish_id, event_id, position_id];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Leaderboard added successfully" });
    } else {
      return res.status(400).json({ message: "Failed to add leaderboard" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const addLeaderBoardBatch = (req, res) => {
  const records = req.body;

  const sql =
    "INSERT IGNORE INTO `leader_board` (`deanery_id`, `parish_id`, `event_id`, `position_id`) VALUES (?, ?, ?, ?)";

  const insertPromises = records.map(
    ({ deanery_id, parish_id, event_id, position_id }) => {
      const values = [deanery_id, parish_id, event_id, position_id];

      return new Promise(async (resolve, reject) => {
        try {
          const result = await db.query(sql, values);
          return resolve(result);
        } catch (error) {
          return reject(error);
        }
      });
    }
  );

  // Execute all insert queries
  Promise.all(insertPromises)
    .then(() => {
      res.json({ success: "All LeaderBoard records added successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    });
};

const deleteLeaderBoard = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM `leader_board` WHERE `id`=?";
  const values = [id];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Leadeerboard deleted successfully" });
    } else {
      res.status(400).json({ message: "Failed to delete leaderboard" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something unexpected has occured" });
  }
};

const updateLeaderBoard = async (req, res) => {
  const { deanery_id, parish_id, event_id, position_id, id } = req.body;
  const sql =
    "UPDATE `leader_board` SET `deanery_id`=?, `parish_id`=?, `event_id`=?, `position_id`=? WHERE `id`=?";
  const values = [deanery_id, parish_id, event_id, position_id, id];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Leaderboard updated successfully" });
    } else {
      return res.status(400).json({ message: "Failed to update leaderboard" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getLeaderBoardItems,
  createLeaderBoard,
  deleteLeaderBoard,
  getLeaderBoardItem,
  updateLeaderBoard,
  addLeaderBoardBatch,
};
