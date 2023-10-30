import { openDB } from 'idb';

const initdb = async () =>
  openDB('yate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('yate')) {
        console.log('yate database already exists');
        return;
      }
      db.createObjectStore('yate', { keyPath: 'id', autoIncrement: true });
      console.log('yate database created');
    },
  });

// Adds logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const yateDb = await openDB('yate', 1);
  const tx = yateDb.transaction('yate', 'readwrite');
  const store = tx.objectStore('yate');
  const request = store.put({ id: 1, yate: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

// Adds logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const yateDb = await openDB('yate', 1);
  const tx = yateDb.transaction('yate', 'readonly');
  const store = tx.objectStore('yate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result.value;
};

initdb();
