const entradasRoutes = require('./entradasRoute');
const saidasRoutes = require('./saidasRoute');  

module.exports = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(entradasRoutes);
  app.use(saidasRoutes);
};