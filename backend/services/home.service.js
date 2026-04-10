const { db } = require("../config/db");

const homeService = {
  get: async (req, res) => {
    const [homedata] = await db.query("SELECT * FROM home");
    return res.status(200).json(homedata);
  },

  createHome: async (req, res) => {
    const { name, address } = req.body;
    if (!name || !address) {
      return res.status(400).json({ message: "Name and address are required" });
    }
    await db.query("INSERT INTO home (home_name, home_address) VALUES (?, ?)", [
      name,
      address,
    ]);
    return res.status(201).json({ message: "Home created successfully!" });
  },

  getById: async (req, res) => {
    const [homedata] = await db.query("SELECT * FROM home WHERE home_id = ?", [
      req.params.id,
    ]);

    if (homedata.length === 0) {
      return res.status(404).json({ message: "Home not found" });
    }
    return res.status(200).json(homedata[0]);
  },

  updateHome: async (req, res) => {
    const { name, address } = req.body;
    if (!name || !address) {
      return res.status(400).json({ message: "Name and address are required" });
    }
    await db.query("UPDATE home SET home_name = ?, home_address = ? WHERE home_id = ?", [
      name,
      address,
      req.params.id,
    ]);
    return res.status(200).json({ message: "Home updated successfully!" });
  },

  deleteHome: async (req, res) => {
    const [homedata] = await db.query("SELECT * FROM home WHERE home_id = ?", [
      req.params.id,
    ]);
    if (!homedata.length) {
      return res.status(404).json({ message: "Home not found" });
    }
    await db.query("DELETE FROM home WHERE home_id = ?", [req.params.id]);
    return res.status(200).json({ message: "Home deleted successfully!" });
  },
};

module.exports = homeService;
