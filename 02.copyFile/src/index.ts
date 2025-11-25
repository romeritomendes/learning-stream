import fs from "node:fs";



const orig = fs.createReadStream("../00.resources/origin/2f7601b2269f57f259714571c48ef8e5.txt");

const dest = fs.createWriteStream("../00.resources/destination/2f7601b22.txt");

let numChunks = 0;
orig.on("data", (chunk) => {
    numChunks += chunk.length;
    console.log(`Copied ${numChunks} bytes`);
});

orig.pipe(dest);