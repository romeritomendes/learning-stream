import fs from "node:fs";



const orig = fs.createReadStream("./origin/2f7601b2269f57f259714571c48ef8e5.txt");

const dest = fs.createWriteStream("./destination/2f7601b22.txt");

let numChunks = 0;
orig.on("data", (chunk) => {
    numChunks += chunk.length;
    console.log(`Copied ${numChunks} bytes`);
});

orig.pipe(dest);