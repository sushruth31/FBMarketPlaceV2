import bucket from "../../lib/firebase";
import path from "path";
import * as fs from "fs";

export default async function handler(req, res) {
  const { imgs: base64array } = req.body;

  const dirs = [];

  //write files to disk

  for (const [idx, base64data] of base64array.entries()) {
    const dir = path.resolve("./public", "img", `${idx}.png`);

    dirs.push(dir);

    fs.writeFileSync(dir, base64data, "base64");
  }

  //upload files to firebase

  let promises = [];

  dirs.forEach((dir, idx) => {
    promises.push(bucket.upload(dir, { destination: `${dir.replaceAll("/", "")}.png` }));
  });

  await Promise.all(promises);

  //read files from firebase and get urls

  promises = [];

  for (const dir of dirs) {
    const filename = bucket.file(dir.replaceAll("/", ""));
    promises.push(
      filename.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      })
    );
  }

  const [...urls] = await Promise.all(promises);

  res.json(urls);
}
