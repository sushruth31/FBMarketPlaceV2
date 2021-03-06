import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class Post extends Entity {}
let schema = new Schema(
  Post,
  {
    uid: { type: "string" },
    city: { type: "string" },
    condition: { type: "string" },
    price: { type: "number" },
    description: { type: "string" },
    imgs: { type: "array" },
    tags: { type: "array" },
    title: { type: "string" },
  },
  { dataStructure: "JSON" }
);

export async function newListing(data) {
  await connect();

  const repository = new Repository(schema, client);

  const post = repository.createEntity(data);

  const id = await repository.save(post);
  return id;
}

export async function getListings(offset) {
  await connect();

  const repository = new Repository(schema, client);

  const posts = await repository.search().return.page(offset, 20);

  return posts;
}

export async function createIndex() {
  await connect();

  const repository = new Repository(schema, client);

  await repository.createIndex();
}
