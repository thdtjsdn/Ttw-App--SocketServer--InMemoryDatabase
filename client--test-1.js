import {ServerSocketDatabaseInMemoryClient} from './client/server_socket__database_inmemory_client.js';
import crypto from 'crypto';

(async function () {
	const PORT = 41000;
	const HOST = '127.0.0.1';
	const PASS = 'a';

	const client = new ServerSocketDatabaseInMemoryClient(PORT, HOST, PASS);

	function getRandomKey() {
		return crypto.randomBytes(8).toString('hex');
	}

	function getRandomValue() {
		return crypto.randomBytes(16).toString('hex');
	}

	async function setRandomKeyValue() {
		const key = getRandomKey();
		const value = getRandomValue();
		const setResponse = await client.set(key, value);
		console.log('SET Response:', setResponse); // Output: OK
		return key;
	}

	async function getKeyValue(key) {
		const getResponse = await client.get(key);
		console.log('GET Response:', getResponse); // Output: value
	}

	async function getAllKeys() {
		const keysResponse = await client.keys('*');
		console.log('KEYS Response:', keysResponse); // Output: list of all keys
	}

	const iterations = 10000; // Number of iterations for performance test

	console.time('Performance Test');

	for (let i = 0; i < iterations; i++) {
		const key = await setRandomKeyValue();
		await getKeyValue(key);
	}

	console.timeEnd('Performance Test');
})();
