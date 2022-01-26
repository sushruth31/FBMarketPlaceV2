import bucket from "../../lib/firebase";
import path from "path";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { newListing } from "../../lib/redis";

export default async function handler(req, res) {
  const { imgs: base64array, ...formData } = req.body;

  const filenames = [];

  //write files to disk

  for (const base64data of base64array) {
    const fileName = uuidv4() + ".png";
    const dir = path.resolve("./public", "img", fileName);

    filenames.push(fileName);

    fs.writeFileSync(dir, base64data, "base64");
  }

  //upload files to firebase

  let promises = [];

  filenames.forEach(fileName => {
    const dir = path.resolve("./public", "img", fileName);
    promises.push(bucket.upload(dir, { destination: fileName }));
  });

  await Promise.all(promises);

  //read files from firebase and get urls

  promises = [];

  for (const fileName of filenames) {
    const fbFile = bucket.file(fileName);
    promises.push(
      fbFile
        .getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        })
        .then(urls => urls[0])
    );
  }

  const [...urls] = await Promise.all(promises);

  for (const fileName of filenames) {
    const dir = path.resolve("./public", "img", fileName);

    fs.unlink(dir, () => null);
  }

  const id = await newListing({ ...formData, imgs: urls });

  res.send(id);
}
