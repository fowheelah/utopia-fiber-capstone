function getPassword(userinput) {
	
	const { Client} = require('pg')

	var results = [];
	var password;
	var salt;

	const client = new Client({
		host: "10.128.14.220",
		user: "grafanauser",
		port: 5432,
		password: "jabbathehutt",
		database: "smartmap"
	})
	client.connect();
	client.query('Select password p, salt s from users WHERE username = ' + userinput, (err, res)=>{
		if(!err){
			setValue(res.rows);
		} else {
			console.log(err.message);
		}
		client.end;
	})

	function setValue(value) {
		results = value;
    		password = results[0].p;
   		salt = results[0].s;
		console.log(password);
		console.log(salt);
	}

	return (password, salt)
}

getPassword("username");