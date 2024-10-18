const entradasRoutes = require('./entradasRoute');
const saidasRoutes = require('./saidasRoute');
const usersRoutes = require('./userRoute');  

module.exports = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(entradasRoutes);
  app.use(saidasRoutes);
  app.use(usersRoutes);
};