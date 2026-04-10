const homeService = require('../services/home.service');


const homeController = {
  get: async (req, res) => {
    return homeService.get(req, res);
  },

  createHome: async (req, res) => {
    return homeService.createHome(req, res);
  },

  getById: async (req, res) => {
    return homeService.getById(req, res);
  },

  updateHome: async (req, res) => {
    return homeService.updateHome(req, res);
  },

  deleteHome: async (req, res) => {
    return homeService.deleteHome(req, res);
  }

};






module.exports = homeController;