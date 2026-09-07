const db = require("../config/dbConn");

// const createStage = (req, res) => {
//   const sql = "INSERT INTO stage (`name`) VALUES (?)";
//   const values = [req.body.name];
//   db.query(sql, values, (err, result) => {
//     if (err) return res.json({ message: "Something went wrong" + err });
//     return res.json({ success: "Stage added successfully" });
//   });
// };

const getStages = async (req, res) => {
    const sql = "SELECT * FROM `stage`"
    try{
      const result = await db.query(sql);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
}

// const getStage = (req, res) => {
//   const id = req.params.id;
//   const sql = "SELECT * FROM `stage` WHERE `id` = ?";
//   db.query(sql, [id], (err, result) => {
//     if (err) res.json({ message: "Server Error" });
//     return res.json(result);
//   });
// };

// const editStage = (req, res) => {
//   const sql = "UPDATE stage SET `name`=? WHERE `id`=?";
//   const values = [req.body.name, req.body.id];
//   db.query(sql, values, (err, result) => {
//     if (err) return res.json({ message: "Something went wrong" + err });
//     return res.json({ success: "Stage updated successfully" });
//   });
// };

// const deleteStage = (req, res) => {
//   const id = req.params.id;
//   const sql = "DELETE FROM stage WHERE `id`=?";
//   const values = [id];
//   db.query(sql, values, (err, result) => {
//     if (err)
//       return res.json({ message: "Something unexpected has occured" + err });
//     return res.json({ success: "Stage deleted successfully" });
//   });
// };

module.exports = {
  // createStage,
  // getStage,
  getStages,
  // editStage,
  // deleteStage,
};