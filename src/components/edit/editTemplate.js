import { html } from "../../../node_modules/lit-html/lit-html.js";

export const editTemplate = (fruit, submitHandler) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit Fruit</h2>
      <form class="edit-form" @submit=${(e) => submitHandler(e, fruit._id)}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Fruit Name"
          .value="${fruit.name}" />
        <input
          type="text"
          name="imageUrl"
          id="Fruit-image"
          placeholder="Fruit Image URL"
          .value="${fruit.imageUrl}" />
        <textarea
          id="fruit-description"
          name="description"
          placeholder="Description"
          .value="${fruit.description}"
          rows="10"
          cols="50"></textarea>
        <textarea
          id="fruit-nutrition"
          name="nutrition"
          placeholder="Nutrition"
          .value="${fruit.nutrition}"
          rows="10"
          cols="50"></textarea>
        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;
