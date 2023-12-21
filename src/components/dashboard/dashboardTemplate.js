import { html } from "../../../node_modules/lit-html/lit-html.js";

//name	imageUrl	description	nutrition

const shoeTemplate = (fruit) => html`
  <div class="fruit">
    <img src=${fruit.imageUrl} alt="example1" />
    <h3 class="title">${fruit.name}</h3>
    <p class="description">${fruit.description}</p>
    <a class="details-btn" href=${`/details/${fruit._id}`}>More Info</a>
  </div>
`;

export const dashboardTemplate = (fruits) => html`
  <h2>Fruits</h2>
  
    <!-- Display a div with information about every post (if any)-->
  
  <!-- Display an h2 if there are no posts -->
 
    ${
      fruits.length > 0
        ? html` <section id="dashboard">${fruits.map((s) => shoeTemplate(s))}</section> `
        : html` <h2>No fruit info yet.</h2>`
    }
  </section>
`;
