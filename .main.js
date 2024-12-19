console.log(1);

const DATABASE_SERVERS = {
	// PORT, PASSWORD
	MAIN : [41000, 'a']
};

for(var s in DATABASE_SERVERS){
	let PORT = DATABASE_SERVERS[s][0]; // SERVER PORT
	let PASS = DATABASE_SERVERS[s][1]; // PASSWORD
	global.bootstrap(PORT, PASS);
}