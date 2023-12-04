import db from "../database/db.js";

/**
 * @param userEmail
 */

const validateEmail = (req, res) => {
	const {userEmail} = req.body;
	const searchQuery = "SELECT * FROM users WHERE user_email = ?";
  
	console.log('Received POST validation request with body: ', req.body);
  
	db.getConnection((error, connection) => {
	  if (error) {
		console.error("Error acquiring a connection from the pool:", error)
	  } else {
		connection.query(searchQuery, [userEmail], (error, result) => {
		  if (error) {
			console.error(`Error /api/validation/email qeury ${error.message}`);
		  } else {
			if (result.length > 0) {
			  console.log('Used email: ', userEmail);
			  res.status(401).send('The user already exist');
			} else {
			  res.status(200).send('Validation success');
			};
			connection.release();
		}
	});
	};
	});
};

export default {
	validateEmail
};