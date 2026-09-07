const db = require("../config/dbConn");

const createLiveOnStage = async (req, res) => {
  const sql =
    "INSERT INTO live_on_stage (`stage_id`, `current_event`, `next_event`, `live`) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.stage_id,
    req.body.current_event,
    req.body.next_event,
    req.body.live,
  ];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Live on stage added successfully" });
    } else {
      return res.status(400).json({ message: "Failed to add live on stage" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const addBatchLiveOnStage = (req, res) => {
  const records = req.body;

  const sql = `
    INSERT INTO live_on_stage (stage_id, current_event, next_event, live) 
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      current_event = VALUES(current_event), 
      next_event = VALUES(next_event), 
      live = VALUES(live);
  `;

  const insertPromises = records.map(
    ({ stage_id, current_event, next_event, live }) => {
      const values = [stage_id, current_event, next_event, live];

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

  Promise.all(insertPromises)
    .then(() => {
      res.json({
        success: "All live on stage records added/updated successfully",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    });
};

const getLiveOnStages = async (req, res) => {
  const sql = `SELECT 
	ls.id,
	ls.current_event,
    ls.next_event,
    ls.live,
    s.id AS stage_id,
    s.name AS stage_name
	FROM live_on_stage ls
    JOIN stage s
		ON ls.stage_id = s.id`;
  try {
    const result = await db.query(sql);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const editLiveOnStage = async (req, res) => {
  const { current_event, next_event, live, stage_id } = req.body;
  const sql =
    "UPDATE `live_on_stage` SET `current_event`=?, `next_event`=?, `live`=? WHERE `stage_id`=?";
  const values = [current_event, next_event, live, stage_id];
  try {
    const result = await db.query(sql, values);
    if (result.affectedRows > 0) {
      return res.json({ success: "Deanery updated successfully" });
    } else {
      return res.status(400).json({ message: "Failed to update Deanery" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createLiveOnStage,
  getLiveOnStages,
  editLiveOnStage,
  addBatchLiveOnStage,
};
