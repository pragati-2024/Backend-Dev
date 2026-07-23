const fs = require("fs");

const args = process.argv;
const command = args[2]||3000;

// WRITE FILE
if (command === "write") {
  const filename = args[3];
  const content = args[4];

  fs.writeFile(filename, content, "utf8", (err) => {
    if (err) {
      console.log("Error writing file");
    } else {
      console.log("File written successfully");
    }
  });
}

// READ FILE
else if (command === "read") {
  const filename = args[3];

  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file");
    } else {
      console.log("File content:");
      console.log(data);
    }
  });
}

// COPY FILE
else if (command === "copy") {
  const source = args[3];
  const destination = args[4];

  fs.copyFile(source, destination, (err) => {
    if (err) {
      console.log("Error copying file");
    } else {
      console.log("File copied successfully");
    }
  });
}

// DELETE FILE
else if (command === "delete") {
  const filename = args[3];

  fs.unlink(filename, (err) => {
    if (err) {
      console.log("Error deleting file");
    } else {
      console.log("File deleted successfully");
    }
  });
}

// LIST DIRECTORY
else if (command === "list") {
  const folder = args[3];

  fs.readdir(folder, (err, files) => {
    if (err) {
      console.log("Error reading directory");
    } else {
      console.log("Files in directory:");
      files.forEach(file => console.log(file));
    }
  });

//   node server.js list .   ->for seeing dircetry run on terminal

}

// INVALID COMMAND
else {
  console.log("Invalid command");
  console.log("Use:");
  console.log("node server.js write <file> <content>");
  console.log("node server.js read <file>");
  console.log("node server.js copy data.txt copy.txt");
  console.log("node server.js delete <file>");
  console.log("node server.js list <folder>");
}


// arg[0] = node ka path
// arg[1] = js file ka path
// arg[2] = "write"
// arg[3] = "data.txt"
// arg[4] = "hello"
