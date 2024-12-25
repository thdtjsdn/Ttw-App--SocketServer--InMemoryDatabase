console.log(1);

//----------------------------------------------------------------------------------------------------;

const DATABASE_SERVERS = (function () {
	const PASSWORD = 'a';
	const SOCKET_SERVER_MEMORY_DATABASES = {
		ETC: [41000, PASSWORD]

		, MEMBER: [41100, PASSWORD]

		, STOCKS: [41200, PASSWORD]

		, VCURRENCY: [41300, PASSWORD]
	};

	function SET_CB(key, value) {
		console.log(1);
		console.log(Date.now(), key, value);

		// ...
	}

	for (var s in SOCKET_SERVER_MEMORY_DATABASES) {
		let PORT = SOCKET_SERVER_MEMORY_DATABASES[s][0]; // SERVER PORT
		let PASS = SOCKET_SERVER_MEMORY_DATABASES[s][1]; // PASSWORD

		SOCKET_SERVER_MEMORY_DATABASES[s] = global.createSocketServerSocketDatabaseInMemory(PORT, PASS);
		SOCKET_SERVER_MEMORY_DATABASES[s].setBOOL_SET_LOG(false);
		SOCKET_SERVER_MEMORY_DATABASES[s].getDB().callbacks.set_cb = SET_CB;
		console.log(SOCKET_SERVER_MEMORY_DATABASES[s].getDB().callbacks.set_cb);
	}

	// console.log(SOCKET_SERVER_MEMORY_DATABASES);

	return SOCKET_SERVER_MEMORY_DATABASES;
})();

//----------------------------------------------------------------------------------------------------;

(function () {
	/*/
	UtilHttpRequest.check_IP
	UtilHttpRequest.check_IP_N_Response
	//*/
	function createHTTPServerForInMemoryDatabase(server) {
		const PORT = server.value_port + 1;
		console.log('createHTTPServerForInMemoryDatabase - InMemoryDB(' + server.value_port + ') / HTTPServer(' + PORT + ')');

		const CONFIG = UtilFS.readFile_UTF8_Sync__JSON('.config.json');
		const PASSWORD = CONFIG.PASSWORD;

		global.createServerHTTP(PORT);
		// console.log(global['SERVER_HTTP' + PORT]);

		const S = global['SERVER_HTTP' + PORT];
		const SD = server.getDB();

		/*/
		http://localhost:41001/g/set?k=a&v=asd
		http://localhost:41001/g/get?k=a
		http://localhost:41001/g/del?k=a
		//*/
		S.addRouter('/g/del', function (req, res, owner) {
			if (UtilHttpRequest.check_IP_N_Response(req, res, owner)) {
				const queryObject = UtilURL.getQueryObjectFromURL_Decode(String(req.url));
				if (SD[queryObject.k]) {
					delete SD[queryObject.k];
					UtilHttpResponse.response_200_Boolean_True(req, res);
				}
				else { UtilHttpResponse.response_404(req, res); }
			}
		});
		S.addRouter('/g/get', function (req, res, owner) {
			if (UtilHttpRequest.check_IP_N_Response(req, res, owner)) {
				const queryObject = UtilURL.getQueryObjectFromURL_Decode(String(req.url));
				if (SD[queryObject.k]) { UtilHttpResponse.response_200_String(req, res, SD[queryObject.k]); }
				else { UtilHttpResponse.response_404(req, res); }
			}
		});
		S.addRouter('/g/set', function (req, res, owner) {
			if (UtilHttpRequest.check_IP_N_Response(req, res, owner)) {
				const queryObject = UtilURL.getQueryObjectFromURL_Decode(String(req.url));
				try { SD[queryObject.k] = queryObject.v; }
				catch (err) { UtilHttpResponse.response_500(req, res, err.message); return; }
				UtilHttpResponse.response_200_Boolean_True(req, res);
			}
		});
		S.addRouter('/p/set', function (req, res, owner) {
			if (UtilHttpRequest.check_IP_N_Response(req, res, owner)) {
				const queryObject = UtilURL.getQueryObjectFromURL_Decode(String(req.url));

				let clientData = '';
				req.on('data', function (chunk) { clientData += chunk; });
				req.on('end', function () { try { SD[queryObject.k] = clientData } catch (err) { } });

				UtilHttpResponse.response_200_Boolean_True(req, res);
			}
		});
	}

	//--------------------------------------------------;

	for (var s in DATABASE_SERVERS) {
		const server = DATABASE_SERVERS[s];
		createHTTPServerForInMemoryDatabase(server);
	}
})();

//----------------------------------------------------------------------------------------------------;