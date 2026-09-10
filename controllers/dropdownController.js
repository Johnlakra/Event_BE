const db = require("../config/dbConn");

const DROPDOWN_TABLES = {
  events: "event",
  places: "place",
  deanery: "deanery",
  parish: "parish",
  stage: "stage",
  leader_board: "leader_board",
  year: "year",
};

const getDropdown = async (req, res) => {
  const keys = Object.keys(DROPDOWN_TABLES);
  try {
    const results = await Promise.all(
      keys.map((key) => {
        if(key === 'deanery') return db.query(`SELECT * FROM \`${DROPDOWN_TABLES[key]}\` ORDER BY \`name\``)
        return db.query(`SELECT * FROM \`${DROPDOWN_TABLES[key]}\``)
      })
    );
    return res.json(
      keys.reduce((acc, key, index) => ({ ...acc, [key]: results[index] }), {})
    );
  } catch (error) {
    console.error("getDropdown failed:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getDropdown,
};
