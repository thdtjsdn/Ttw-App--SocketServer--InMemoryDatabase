# Ttw-App--SocketServer-InMemoryDatabase

---

# 문의 사항

- thdtjsdn@gmail.com

---

# Like 'REDIS' Socket Server 입니다.

- In Memory Socket Server 입니다.
- 본서버는 Protocol Level에서 정의된 기능외 확장기능이 없기 때문에 보안에 안전합니다.

- Windows, Linux, Mac 지원
- Linux, Mac은 바이너리 권한 추가 sudo chmod 755 ./TtwServerStreamLinux 또는 Mac

- Log 시간 단위 저장

---

# .main.js 가 메인 소스 시작파일입니다.

- 추후 .config.json 설정으로 변경 할수도 있습니다만, 굳이..?

- 사용 예시 소스 코드가 존재합니다.

---

# 본 서버는 '무료제공' 입니다.

- 자유롭게 사용하셔도 무방합니다.

---

# GUI 기반의 Debugger Tool이 존재합니다.

- Private Repository 입니다.

---

# client test - 0

```javascript
import {ServerSocketDatabaseInMemoryClient} from './client/server_socket__database_inmemory_client.js';

(async function () {
	const client = new ServerSocketDatabaseInMemoryClient(41000, '127.0.0.1', 'a');

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

---

# client test - 1

```javascript
import {ServerSocketDatabaseInMemoryClient} from './client/server_socket__database_inmemory_client.js';
import crypto from 'crypto';

(async function () {
	const client = new ServerSocketDatabaseInMemoryClient(41000, '127.0.0.1', 'a');

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

---

# API 목록(필요할 법한 목록만)

- UtilLogger.debug = function(o, g){}
- UtilLogger.error = function(o, g, l){}
- UtilLogger.log = function(o, g){}
- UtilLogger.logc = function(o, g){}
- UtilLogger.logi = function(o, g){}
- UtilLogger.logr = function(o, g){}
- UtilLogger.logy = function(o, g){}
- UtilLogger.verbose = function(o, g){}
- UtilLogger.warn = function(o, g){}
- 
- UtilDate.getNow = function(){}
- UtilDate.getNowLocaleString = function(){}
- UtilDate.getNowLocaleString__Dash = function(){}
- UtilDate.getNowLocaleString__Dash__Milliseconds = function(){}
- UtilDate.getNowLocaleString_D = function(){}
- UtilDate.getNowLocaleString_H = function(){}
- UtilDate.getNowLocaleString_HM = function(){}
- UtilDate.getNowString_D = function(){}
- 
- UtilFS.appendFile = function(r, n){}
- UtilFS.appendFile_Sync = function(t, e){}
- UtilFS.check_path = function(t){}
- UtilFS.close = function(e){}
- UtilFS.close_cb = function(t, e){}
- UtilFS.close_Sync = function(t){}
- UtilFS.createDirectory = function(t, e){}
- UtilFS.createDirectory_BefoeCheck = function(t){}
- UtilFS.deleteFile = function(t, e){}
- UtilFS.deleteAllFiles_Sync = function(t){}
- UtilFS.deleteFile_Sync = function(t){}
- UtilFS.deleteFiles_Sync__link_name = function(t, e){}
- UtilFS.getList_Directory = function(t){}
- UtilFS.getList_File = function(t){}
- UtilFS.getList_Folder = function(t){}
- UtilFS.getList_FileExtension = function(t, e){}
- UtilFS.getList_FE__css = function(t){}
- UtilFS.getList_FE__csv = function(t){}
- UtilFS.getList_FE__gz = function(t){}
- UtilFS.getList_FE__html = function(t){}
- UtilFS.getList_FE__js = function(t){}
- UtilFS.getList_FE__json = function(t){}
- UtilFS.getList_FE__mp3 = function(t){}
- UtilFS.getList_FE__tcss = function(t){}
- UtilFS.getList_FE__thtml = function(t){}
- UtilFS.getList_FE__tjs = function(t){}
- UtilFS.getList_FE__tjson = function(t){}
- UtilFS.getList_FE__ts = function(t){}
- UtilFS.getList_FE__tson = function(t){}
- UtilFS.getList_FE__tsv = function(t){}
- UtilFS.getList_FE__txml = function(t){}
- UtilFS.getList_FE__txt = function(t){}
- UtilFS.getList_FE__xml = function(t){}
- UtilFS.getList_FE__zip = function(t){}
- UtilFS.readDir_Sync = function(t){}
- UtilFS.readFile = function(r){}
- UtilFS.readFile_cb = function(t, e){}
- UtilFS.readFile_Sync = function(t){}
- UtilFS.readFile_UTF8_Sync = function(t){}
- UtilFS.readFile_UTF8_Sync__JSON = function(t){}
- UtilFS.writeFile_UTF8 = function(r, n, i){}
- UtilFS.writeFile_UTF8_Sync = function(t, e){}
- UtilFS.writeFile_UTF8_Sync__JSON = function(t, e){}
- UtilFS.writeFile_UTF8_Sync__JSON_Tab1 = function(t, e){}
- UtilFS.writeFile = function(r, n, i){}
- UtilFS.writeFile_Sync = function(t, e){}
- 
- UtilHttpNodeJS.get = function(t){}
- UtilHttpNodeJS.get_cb = function(r, o){}
- UtilHttpNodeJS.get_cb__string = function(t, i){}
- UtilHttpNodeJS.get_cb__string__utf8 = function(t, i){}
- UtilHttpNodeJS.getSync = function(r){}
- UtilHttpNodeJS.getSyncJSON = function(e){}
- UtilHttpNodeJS.post__native = function(t, n, e, r, o, i){}
- UtilHttpNodeJS.post = function(t, n, e, r){}
- 
- UtilHttpRequest.check_IP = function(e, t, r){}
- UtilHttpRequest.check_IP_N_Response = function(e, t, r){}
- 
- UtilHttpResponse.response_header_CORS = function(e, t){}
- UtilHttpResponse.response_header_common_json_utf8 = function(e, t){}
- UtilHttpResponse.response_header_common_text_utf8 = function(e, t){}
- UtilHttpResponse.response_header_contentType = function(e, t, n){}
- UtilHttpResponse.response_header_contentType__gz = function(e, t, n){}
- UtilHttpResponse.response_200 = function(e, t, n, o){}
- UtilHttpResponse.response_200__404 = function(e, t, n, o){}
- UtilHttpResponse.response_200_Boolean_False = function(e, t, n, o){}
- UtilHttpResponse.response_200_Boolean_True = function(e, t, n, o){}
- UtilHttpResponse.response_200_FileStream = function(e, t, n, o, s){}
- UtilHttpResponse.response_200_FileStream__Toss = function(e, t, n, o, s){}
- UtilHttpResponse.response_200_HTML = function(e, t, n, o){}
- UtilHttpResponse.response_200_JSON = function(e, t, n, o){}
- UtilHttpResponse.response_200_JSON__Array = function(e, t, n, o){}
- UtilHttpResponse.response_200_JSON__Error = function(e, t, n, o){}
- UtilHttpResponse.response_200_JSON__Object = function(e, t, n, o){}
- UtilHttpResponse.response_200_String = function(e, t, n, o){}
- UtilHttpResponse.response_301__google_thdtjsdncom = function(e, t, n){}
- UtilHttpResponse.response_301 = function(e, t, n, o){}
- UtilHttpResponse.response_400 = function(e, t, n, o){}
- UtilHttpResponse.response_400_JSON = function(e, t, n, o){}
- UtilHttpResponse.response_403 = function(e, t, n, o){}
- UtilHttpResponse.response_403_JSON = function(e, t, n, o){}
- UtilHttpResponse.response_404 = function(e, t, n, o){}
- UtilHttpResponse.response_404_JSON = function(e, t, n, o){}
- UtilHttpResponse.response_416 = function(e, t, n, o){}
- UtilHttpResponse.response_500 = function(e, t, n, o){}
- UtilHttpResponse.response_500_JSON = function(e, t, n, o){}
- UtilHttpResponse.response_501 = function(e, t, n, o){}
- UtilHttpResponse.response_501_JSON = function(e, t, n, o){}
- UtilHttpResponse.writeHead_response_206 = function(e, t, n, o, s, r){}
- UtilHttpResponse.writeHead_response_206__Video = function(e, t, n, o, s){}
- 
- UtilHttpsNodeJS.get = function(t){}
- UtilHttpsNodeJS.get_cb = function(o, r){}
- UtilHttpsNodeJS.get_cb__string = function(t, i){}
- UtilHttpsNodeJS.get_cb__string__utf8 = function(t, i){}
- UtilHttpsNodeJS.getSync = function(o){}
- UtilHttpsNodeJS.getSyncJSON = function(e){}
- 
- UtilObject.defineProperty__const = function(t, n, r){}
- UtilObject.defineProperty__const__if = function(t, n, r){}
- 
- UtilString.deleteNumbers = function(r){}
- UtilString.isIPAddress = function(r){}
- UtilString.isIPAddress_regexp = function(r){}
- 
- UtilStringIPAddress.getIPv4__NodeJS_Request_RemoteAddress = function(e){}
- UtilStringIPAddress.isIPAddress = function(e){}
- UtilStringIPAddress.isIPAddress_regexp = function(e){}
- 
- UtilStringPad_Number.pad_0_1 = function(t){}
- UtilStringPad_Number.pad_00_3 = function(t){}
- 
- UtilURL.getFileExtensionFromURI = function(e){}
- UtilURL.getFileExtensionFromURI_1 = function(e){}
- UtilURL.getFilePathFromURI = function(e, r){}
- UtilURL.getQueryFromURL = function(e){}
- UtilURL.getQueryFromURL_Decode = function(e){}
- UtilURL.getQueryObjectFromURL = function(e){}
- UtilURL.getQueryObjectFromURL_Decode = function(e){}
- UtilURL.getURIFromURL = function(e){}
- UtilURL.getURIFromURL_DecodeURI = function(e){}
- UtilURL.getURIFromURL_DecodeURIComponent = function(r){}

---