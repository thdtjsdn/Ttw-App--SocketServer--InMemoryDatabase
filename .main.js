console.log(1);

//----------------------------------------------------------------------------------------------------;

/*/
// How to use in server mode

const DATABASE_SERVERS = {
	// PORT, PASSWORD
	MAIN : [41000, 'a']
};

for(var s in DATABASE_SERVERS){
	let PORT = DATABASE_SERVERS[s][0]; // SERVER PORT
	let PASS = DATABASE_SERVERS[s][1]; // PASSWORD

	DATABASE_SERVERS[s] = global.bootstrap(PORT, PASS);
}

console.log(DATABASE_SERVERS);
//*/

//----------------------------------------------------------------------------------------------------;

/*/
// How to use in servers mode

const DATABASE_SERVERS = {
	// PORT, PASSWORD
	MAIN : [41000, 'a']

	, MEMBER : [41010, 'a']

	, STOCK_KR : [41020, 'a']
	, STOCK_US : [41021, 'a']
};

for(var s in DATABASE_SERVERS){
	let PORT = DATABASE_SERVERS[s][0]; // SERVER PORT
	let PASS = DATABASE_SERVERS[s][1]; // PASSWORD

	DATABASE_SERVERS[s] = global.bootstrap(PORT, PASS);
}

console.log(DATABASE_SERVERS);
//*/

//----------------------------------------------------------------------------------------------------;

//*/
// How to use in servers mode

// 'SET_CB' sample

const DATABASE_SERVERS = {
	// PORT, PASSWORD
	MAIN : [41000, 'a']

	, MEMBER : [41010, 'a']

	, STOCK_KR : [41020, 'a']
	, STOCK_US : [41021, 'a']
};

function SET_CB(key, value){
	console.log(1);
	console.log(Date.now(), key, value);

	// ...
}

for(var s in DATABASE_SERVERS){
	let PORT = DATABASE_SERVERS[s][0]; // SERVER PORT
	let PASS = DATABASE_SERVERS[s][1]; // PASSWORD

	DATABASE_SERVERS[s] = global.bootstrap(PORT, PASS);
	DATABASE_SERVERS[s].getDB().callbacks.set_cb = SET_CB;
	console.log(DATABASE_SERVERS[s].getDB().callbacks.set_cb);
}

//console.log(DATABASE_SERVERS);
//*/

//----------------------------------------------------------------------------------------------------;

// How to use in component mode

(async function () {
	const PORT = 42000;
	const path_backup_data = './.data/' + PORT + '/database_backup.json.gz';
	const client = new DatabaseInMemoryClient(path_backup_data);

	// getter;
	const DB = client.getDB();
	DB.callbacks.set_cb = function(key, value){
		console.log('---------- SET_CB ----------')
		console.log(Date.now(), key, value);
	};
	console.log(DB.callbacks.set_cb);

	// setter;
	// client.setMemoryStore('key', 'value');

	let response = client.set('key1', 'value1');
	console.log('SET Response:', response); // Output: OK

	response = client.set_cb('key2', 'value2');
	console.log('SET_CB Response:', response); // Output: OK

	response = client.get('key1');
	console.log('GET Response:', response); // Output: value1

	const keys = client.keys('*');
	console.log('KEYS Response:', keys); // Output: [ 'key1' ]

	response = await client.dataBackup();
	console.log('BACKUP Response:', response); // Output: OK: Backup completed

	client.flushAll();
	console.log('Data flushed.');

	response = await client.dataRestore();
	console.log('RESTORE Response:', response); // Output: OK: Restore completed

	response = client.get('key1');
	console.log('GET Response after restore:', response); // Output: value1
})();