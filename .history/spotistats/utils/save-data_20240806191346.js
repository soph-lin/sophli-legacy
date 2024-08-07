import * as fs from 'fs';

const saveAsSampleData = '' && true; // Save as sample data

export default function saveData(data, type) {
    if (!saveAsSampleData) return;
    let path = null;
    if (type === 'song data') path = './data/sample-song-data.json';
    else if (type === 'audio data') path = './data/sample-audio-data.json';
    else throw new Error(`Type ${type} not implemented`);

    const jsonData = JSON.stringify(data);
    fs.writeFile(path, jsonData, (error) => {
        if (error) throw error;
    })
}

function isLocalHost() {
    return location.hostname === "localhost" || location.hostname === "127.0.0.1"
}