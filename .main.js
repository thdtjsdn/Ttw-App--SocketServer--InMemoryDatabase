console.log(1);

//----------------------------------------------------------------------------------------------------;

// How to use in server mode

const DATABASE_SERVERS = {
	// PORT, PASSWORD
	MAIN : [41000, 'a']
};

for(var s in DATABASE_SERVERS){
	let PORT = DATABASE_SERVERS[s][0]; // SERVER PORT
	let PASS = DATABASE_SERVERS[s][1]; // PASSWORD
	global.bootstrap(PORT, PASS);
}

//----------------------------------------------------------------------------------------------------;

// How to use in component mode

(async function () {
	const path_backup_data = './.data/41000/database_backup.json.gz';
	const client = new DatabaseInMemoryClient(path_backup_data);

	try {
		let response = await client.set('key1', 'value1');
		console.log('SET Response:', response); // Output: OK

		response = await client.get('key1');
		console.log('GET Response:', response); // Output: value1

		const keys = await client.keys('*');
		console.log('KEYS Response:', keys); // Output: [ 'key1' ]

		response = await client.dataBackup();
		console.log('BACKUP Response:', response); // Output: OK: Backup completed

		await client.flushAll();
		console.log('Data flushed.');

		response = await client.dataRestore();
		console.log('RESTORE Response:', response); // Output: OK: Restore completed

		response = await client.get('key1');
		console.log('GET Response after restore:', response); // Output: value1

		// getter;
		const MEMORY_STORE = client.getMemoryStore();
		// setter;
		client.setMemoryStore('key', 'value');
	}
	catch (err) { console.error('Error:', err); }
})();