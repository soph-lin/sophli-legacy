import * as fs from 'fs';



export default function saveData(data, type) {
    if (!saveAsSampleData) return;
    let path = null;
    if (type === 'song') path = './data/sample-song-data.json';
    else if (type === 'audio') path = './data/sample-audio-data.json';
    else throw new Error(`Type ${type} not implemented`);

    const jsonData = JSON.stringify(data);
    fs.writeFile(path, jsonData, (error) => {
        if (error) throw error;
    })
}