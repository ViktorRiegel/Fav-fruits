export class EditComponent {
  constructor(shoeService, renderHandler, templateFunction, router) {
    this.shoeService = shoeService;
    this.renderHandler = renderHandler;
    this.templateFunction = templateFunction;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.editHandler = this._editHandler.bind(this);
  }

  async _showView(ctx) {
    let id = ctx.params.id;
    let fruit = await this.shoeService.getById(id);

    let template = this.templateFunction(fruit, this.editHandler);
    this.renderHandler(template);
  }

  async _editHandler(e, id) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);

    let fruit = {
      name: formData.get("name"),
      imageUrl: formData.get("imageUrl"),
      description: formData.get("description"),
      nutrition: formData.get("nutrition"),
    };
    if (fruit.name == "" || fruit.imageUrl == "" || fruit.description == "" || fruit.nutrition == "") {
      alert("You need to write every field");
      return;
    }

    let result = await this.shoeService.edit(id, fruit);
    this.router.navigate(`/details/${id}`);
  }
}
