import {ServerSocketDatabaseInMemoryClient} from './client/server_socket__database_inmemory_client.js';

(async function () {
	const PORT = 41000;
	const HOST = '127.0.0.1';
	const PASS = 'a';

	const client = new ServerSocketDatabaseInMemoryClient(PORT, HOST, PASS);

	try {
		const setResponse = await client.set('key1', 'value1');
		console.log('SET Response:', setResponse); // Output: OK

		const getResponse = await client.get('key1');
		console.log('GET Response:', getResponse); // Output: value1

		const keysResponse = await client.keys('*');
		console.log('KEYS Response:', keysResponse); // Output: key1

		const backupResponse = await client.data_backup();
		console.log('BACKUP Response:', backupResponse); // Output: OK: Backup completed

		const restoreResponse = await client.data_restore();
		console.log('RESTORE Response:', restoreResponse); // Output: OK: Restore completed
	}
	catch (err) { console.error('Error:', err); }
	finally { client.close(); }
})();