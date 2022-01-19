const imgUrls = [];

for (let i = 0; i < 3; i++) {
  imgUrls.push("https://picsum.photos/200/300");
}

const data = [
  {
    userName: "Joe Smith",
    postId: "32736d67w8",
    imgUrls: imgUrls,
    datePosted: new Date().getTime(),
    price: 120,
    description: "this is something else",
  },
  {
    userName: "Bob Fred",
    postId: "33dfg6d67w8",
    imgUrls: imgUrls,
    datePosted: new Date().getTime(),
    price: 1000,
    description: "this is something ",
  },
];

export default function fetchData() {
  return new Promise(res => {
    setTimeout(() => res(data), 1000);
  });
}
