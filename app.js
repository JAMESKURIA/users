// Select elements
const search = document.querySelector("#search");
const cardBody = document.querySelectorAll(".card-body")[0];

console.log("Card body:", cardBody);

// Fetch data
const url = "https://randomuser.me/api/?results=100";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((d) => {
      const picture = d.picture.medium;
      const name = `${d.name.first} ${d.name.last}`;
      const location = `${d.location.city}, ${d.location.country}`;

      const card = `
      <div class="profile-card">
            <img src=${picture} class="avatar" />
            <div class="profile-name">
              <span class="name">${name}</span>
              <span class="location">${location}</span>
            </div>
          </div>
      `;

      cardBody.innerHTML += card;
    });
  })
  .catch((err) => console.log("Error: ", err));
