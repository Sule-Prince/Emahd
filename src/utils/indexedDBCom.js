const IDBInterface = (function () {
	const openDBInstance = (
		name,
		type,
		storeInfo,
		indexInfo,
		version = 1,
		txMode = "readwrite"
	) => {
		window.indexedDB =
			window.indexedDB ||
			window.mozIndexedDB ||
			window.webkitIndexedDB ||
			window.msIndexedDB;
		let request = window.indexedDB.open(name, version),
			db,
			store,
			tx,
			index;

		const { storeName, sKeyPath } = storeInfo;
		const { indexName, iKeyPath, unique } = indexInfo;

		return new Promise((res, rej) => {
			request.onerror = e => {
				rej("An error occcured while trying to access device's storage");
			};

			request.onupgradeneeded = e => {
				let db = request.result,
					store,
					index;

				if (type === "define") {
					store = db.createObjectStore(storeName, { keyPath: sKeyPath });
				} else {
					store = db.createObjectStore(storeName, { autoIncrement: true });
				}
				index = store.createIndex(indexName, iKeyPath, {
					unique: unique ? true : false,
				});
			};

			request.onsuccess = e => {
				db = request.result;
				tx = db.transaction(storeName, txMode);
				store = tx.objectStore(storeName);
				index = store.index(indexName);
				res({ db, tx, store, index });
			};
		});
	};

	const addDataToDB = (store, data) => {
		// const { store, index } = handlers
		store.put(data);
	};

	const getDataFromDB = (handlers, keyPath, type = "store") => {
		const { store, index } = handlers;

		return new Promise((res, rej) => {
			let instance;
			if (type === "store") {
				instance = store.get(keyPath);

				instance.onsuccess = () => {
					res(instance.result);
				};
				return;
			}

			instance = index.get(keyPath);

			instance.onsuccess = () => {
				res(instance.result);
			};
		});
	};

	const closeDBTrans = handlers => {
		const { db, tx } = handlers;

		tx.oncomplete = () => {
			db.close();
		};
	};

	return { openDBInstance, addDataToDB, getDataFromDB, closeDBTrans };
})();

export default IDBInterface;
