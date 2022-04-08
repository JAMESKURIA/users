// Select elements
const search = document.querySelector("#search");
const cardBody = document.querySelectorAll(".card-body")[0];

// Fetch data
const url = "https://randomuser.me/api/?results=100";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    main(data.results);
  })
  .catch((err) => {
    console.log("Error: ", err);
    if (err.includes("NetworkError")) {
      cardBody.textContent =
        "Network Error! Please check your connection and try again";
    }
  });

// Main function - work with the data
const main = (data) => {
  data.forEach((d) => {
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

  // Filter the data
  search.addEventListener("keyup", (e) => {
    const searchText = e.target.value.toLowerCase();

    setTimeout(() => {
      if (cardBody.children.length <= 0) {
        cardBody.textContent = "Currently no users to display";
        return;
      }

      Array.from(cardBody.children).forEach((profile) => {
        const name = profile.children[1].firstElementChild.innerText;
        const location = profile.children[1].lastElementChild.innerText;

        if (
          name.toLowerCase().indexOf(searchText) != -1 ||
          location.toLowerCase().indexOf(searchText) != -1
        ) {
          profile.style.display = "";
        } else {
          profile.style.display = "none";
        }
      });
    }, 250);
  });
};
