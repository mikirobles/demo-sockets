const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');
const firebaseConfig = require('../firebase.config.json');

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = {
    addUser: async name => {
        try {
            const response = await db.collection('users').add({
                name,
            });
            console.log(response.id);
            return response.id;
        } catch (err) {
            console.error(err);
        }
    },
    addPlaylist: async (name, author) => {
        try {
            const response = await db.collection('playlists').add({
                name,
                author,
            });
            return response.id;
        } catch (err) {
            console.error(err);
        }
    },
    getPlaylists: async () => {
        try {
            const response = await db.collection('playlists').get();
            return response.docs.map(snapshot => ({
                id: snapshot.id,
                ...snapshot.data(),
            }));
        } catch (err) {
            console.error(err);
        }
    },
    getPlaylist: async (id) => {
        try {
            const response = await db.collection('playlists').doc(id).get();
            return response.data();
        } catch (err) {
            console.error(err);
        }
    },
    deletePlaylist: async (id) => {
        try {
            await db.collection('playlists').doc(id).delete();
            return;
        } catch (err) {
            return { error: err }
        }
    }
};
