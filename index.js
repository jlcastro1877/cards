const cardData = [
  {
    heading: "card 1",
    body: "this is card body 1",
  },
  {
    heading: "card 2",
    body: "this is card body 2",
  },
  {
    heading: "card 3",
    body: "this is card body 3",
  },
  {
    heading: "card 4",
    body: "this is card body 4",
  },
  {
    heading: "card 5",
    body: "this is card body 5",
  },
  {
    heading: "card 6",
    body: "this is card body 6",
  },
  {
    heading: "card 7",
    body: "this is card body 7",
  },
  {
    heading: "card 8",
    body: "this is card body 8",
  },
  {
    heading: "card 9",
    body: "this is card body 9",
  },
  {
    heading: "card 10",
    body: "this is card body 10",
  },
];

const postContainer = document.querySelector(".card-container");

const postMethods = () => {};
cardData.map((postData) => {
  const posElement = document.createElement("div");
  posElement.classList.add("card");
  posElement.innerHTML = `
        <h3 class="card-heading">${postData.heading}</h3>
        <p class="card-body">${postData.body}</p>
  `;
  postContainer.appendChild(posElement);
});
postMethods();
