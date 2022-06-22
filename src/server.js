const express = require("express");
const AdminJS = require("adminjs");
const argon2 = require("argon2");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const AdminJSMongoose = require("@adminjs/mongoose");
const postgres = require("./config/postgres.connection");
const options = require("./admin.options");
const app = express();

AdminJS.registerAdapter(AdminJSSequelize);
AdminJS.registerAdapter(AdminJSMongoose);

const Company = require("./models/company.entity");

const run = async () => {
  try {
    await postgres.sync();
  } catch (e) {
    console.log("PostgreSQL connection error");
  }

  const adminJs = new AdminJS(options);
  const router = AdminJSExpress.buildRouter(adminJs);
  // const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  // 	authenticate: async (email, password) => {
  // 		const Co = await Company.findOne({ email });
  // 		if (Co) {
  // 			const matched = await argon2.verify(Co.encryptedPassword, password);
  // 			if (matched) {
  // 				return Co;
  // 			}
  // 		}
  // 		return false;
  // 	},
  // 	cookiePassword: 'some-secret-password-used-to-secure-cookie', 
  // });
  app.use(adminJs.options.rootPath, router);
  app.listen(3001, () => console.log("AdminJS is under localhost:3001/admin"));
};

module.exports = run; 