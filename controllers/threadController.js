import db from "../database/db.js";

const createThread = (req, res) => {
	const {uploadTime, threadContent, userId} = req.body;
	const fields = `(upload_time, thread_content, user_id)`;
	const fullQuery = `INSERT INTO thread ${fields} VALUES (?, ?, ?)`;

	const convertToMySQLFormat = (inputString) => {
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
				connection.release();
			});
		} catch(error) {
			console.error("Query error : ", error);
			connection.release();
			return ;
		}
	});
};



const getThread = (req, res) => {
	const { userId } = req.query;

	// userId 의 followee 를 포함한 ids 가 일치하는 thread 정보 및 userName, userEmail 가져오기
	db.getConnection((error, connection) => {
		const selectQuery = "SELECT t.*, u.user_name, u.user_email FROM thread t JOIN users u ON t.user_id = u.user_id WHERE t.user_id = ? OR t.user_id IN (SELECT followee_id FROM follows WHERE follower_id = ?) ORDER BY t.upload_time DESC;"

		if (error) {
			console.error(`ERR_getThread : `, error);
			res.status(500).send("Fail get thread");
			return ;
		}
		try {
			connection.query(selectQuery, [userId, userId], (error, result) => {
				if (error) {
					console.error("ERR_getThread : ", error);
					res.status(500).send("getThread failed");
					return ;
				}
				res.status(200).send(result);
				connection.release();
				return;
			});
		} catch(error) {
			console.error("Query error : ", error);
			connection.release();
			return ;
		}
	});
};



export default {
	createThread: createThread,
	getThread: getThread,
}