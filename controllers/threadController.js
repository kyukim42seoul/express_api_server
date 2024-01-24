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
	let userInfo = [{}];
	let follow = [];
	let idCollection = [];

	// user_id 로 follow 가져오기
	db.getConnection((error, connection) => {
		const Query = "SELECT follow FROM users WHERE user_id = ?";
		
		if (error) {
			connection.release();
			return ;
		}
		try {
			connection.query(Query, [userId], (error, result) => {
				if (error) {
					connection.release();
					return ;
				}
				follow = result[0]["follow"];
				idCollection = [...follow, userId];
				connection.release();
				return ;
			});
		} catch(error) {
			connection.release();
			return ;
		}
	});

	// user_id 로 user_name, user_email 가져오기
	// idCollection 으로 user_name, user_email 가져오기
	db.getConnection((error, connection) => {
		const Query = "SELECT user_name, user_email FROM users WHERE user_id = ?";
		//const Query = `SELECT user_id, user_name, user_email FROM users WHERE user_id IN (?, ?, ?)`;
		//let testUserInfo;

		if (error) {
			console.error(`ERR_getThread : `, error);
			res.status(500).send("Fail get thread");
			return ;
		}
		try {
			connection.query(Query, [userId], (error, result) => {
			//connection.query(Query, idCollection, (error, result) => {
				if (error) {
					console.error("ERR_getThread : ", error);
					res.status(500).send("getThread failed");
					return ;
				}
				userInfo = result;
				//testUserInfo = result;
				//console.log("testUserInfo", testUserInfo);
				connection.release();
				return ;
			});
		} catch(error) {
			console.error("Query error : ", error);
			connection.release();
			return ;
		}
	});
	// Promise 방식으로 전환할 때 사용할 부분
	//console.log("userInfo", userInfo);

	// userId 가 일치하는 thread 정보 가져오기
	db.getConnection((error, connection) => {
		const selectQuery = "SELECT * FROM thread WHERE user_id = ? ORDER BY upload_time DESC LIMIT 10"; // user_id 가 하나인 경우
		//const selectQuery = `SELECT * FROM thread WHERE user_id IN (?, ?, ?) ORDER BY upload_time DESC LIMIT 10`;
		let infoCollection = {};

		if (error) {
			console.error(`ERR_getThread : `, error);
			res.status(500).send("Fail get thread");
			return ;
		}
		try {
			connection.query(selectQuery, [userId], (error, result) => {
			//connection.query(selectQuery, idCollection, (error, result) => {
				if (error) {
					console.error("ERR_getThread : ", error);
					res.status(500).send("getThread failed");
					return ;
				}
				infoCollection = result.map((threadInfo) => {return {...userInfo[0], ...threadInfo}});

				res.status(200).send(infoCollection);
				connection.release();
				return;
			});
		} catch(error) {
			console.error("Query error : ", error);
			connection.release();
			return ;
		}
	});

	// Promise 방식으로 전환할 때 사용할 부분
	//console.log("threadInfo", threadInfo);
	//const infoCollection = threadInfo.map((thread) => {return {...selectedUserInfo[0], ...thread}}) || {};

	//res.status(200).send(infoCollection);
};



export default {
	createThread: createThread,
	getThread: getThread,
}