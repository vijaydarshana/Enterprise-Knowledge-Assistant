const dashboardModel = require("../models/dashboardModel");

async function getStats(req, res) {
  try {
    const stats = await dashboardModel.getStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getStats,
};