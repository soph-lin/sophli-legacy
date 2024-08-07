import FileSystem from 'fs';

function saveData(data, type) {
    let path = null;
    if (type === 'song data') 
    else if (type === 'audio data') 
    else 
}

const data = JSON.stringify(user);

// writing the JSON string content to a file
fs.writeFile("data.json", data, (error) => {
  // throwing the error
  // in case of a writing problem
  if (error) {
    // logging the error
    console.error(error);

    throw error;
  }

  console.log("data.json written correctly");
});