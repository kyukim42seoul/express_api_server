import db from "../database/db.js";

/**
 * @param userEmail
 * @param userPassword
 * @param userName 
 */

const createUser = (req, res) => {
	const {userEmail, userPassword, userName} = req.body;
	const fields = `(user_email, user_pw, user_name)`;
	const fullQuery = `INSERT INTO users ${fields} VALUES (?, ?, ?)`;
	const values = [userEmail, userPassword, userName];
  
	db.getConnection((error, connection) => {
		if (error) {
			console.error("ERR_getConnection : ", error);
			res.status(500).send("Fail create user");
			return ;
		}
		try {
			connection.query(fullQuery, values);
			connection.release();
			res.status(200).send('createUser Success');
		} catch(error) {
			console.error("Query error : ", error);
			connection.release();
			return ;
		}
	});
};

const login = (req, res) => {
	const {userEmail, userPassword} = req.body;
	const searchQuery = "SELECT * FROM users WHERE user_email = ? AND user_pw = ?";
	const values = [userEmail, userPassword];

	db.getConnection((error, connection) => {
		if (error) {
			console.error("ERR_login", error);
			res.status(500).send("Fail login");
		}
		try {
			connection.query(searchQuery, values, (error, result) => {
				if (error) {
					console.error("Query error : ", error);
					connection.release();
					return ;
				};
				if (result.length > 0) {
					const userId = result[0].user_id.toString();
					res.status(200).send(userId);
					connection.release();
					return ;
				}
			});
			connection.release();
		} catch (error) {
			connection.error("Query error : ", error);
			connection.release();
			return ;
		}

	});
};

const authenticateUser = (req, res) => {
	const {userEmail, userPassword} = req.body;
	const searchQuery = "SELECT * FROM users WHERE user_email = ? AND user_pw = ?";
	const values = [userEmail, userPassword];

	db.getConnection((error, connection) => {
	  try {
		connection.query(searchQuery, values, (error, result) => {
		  if (error) {
			console.error('Error search query: ', error);
			connection.release();
			return ;
		  } else {
			if (result.length > 0) {
			  console.log('User already exist: ', userEmail, userPassword);
			  res.status(401).send('The user already exist');
			} else {
			  res.status(200).send('Validation success');
			};
		  }
		  connection.release();
		});
	  } catch (error) {
		console.error(`Error /api/validation query ${error.message}`);
	  }
	});
};

export default {
	createUser,
	login,
	authenticateUser
};