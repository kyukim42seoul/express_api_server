import db from "../database/db.js";

/**
 * @param uploadTime
 * @param threadContent
 * @param userId
 */

const createThread = (req, res) => {
	const {uploadTime, threadContent, userId} = req.body;
	const fields = `(upload_time, thread_content, user_id)`;
	const fullQuery = `INSERT INTO thread ${fields} VALUES (?, ?, ?)`;

	function convertToMySQLFormat(inputString) {
		const date = new Date(inputString);
	  
		const pad = (num) => num.toString().padStart(2, '0');
	  
		let year = date.getFullYear();
		let month = pad(date.getMonth() + 1);
		let day = pad(date.getDate());
		let hours = pad(date.getHours());
		let minutes = pad(date.getMinutes());
		let seconds = pad(date.getSeconds());
	  
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	  };
	
	  const mysqlDateFormat = convertToMySQLFormat(uploadTime);

	const values = [mysqlDateFormat, threadContent, userId];
	
	db.getConnection((error, connection) => {
		if (error) {
			console.error(`ERR_createThread : `, error);
			res.status(500).send("Fail create thread");
			return ;
		}
		try {
			connection.query(fullQuery, values, (error, result) => {
				if (error) {
					console.error("ERR_createThread : ", error);
					res.status(500).send("createThread failed");
					return ;
				}
				res.status(200).send("createThread success");
			});
		} catch(error) {
			console.error("Query error : ", error);
			connection.release();
			return ;
		}
	});
};

export default {
	createThread: createThread
}