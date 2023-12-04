import mysql from "mysql2";
import config from "./db_config.json" assert { type: "json" };

const pool = mysql.createPool(config);

export default {
	getConnection: (callback) => {
	  return pool.getConnection(callback);
	}
};
