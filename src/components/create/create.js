export class CreateComponent {
  constructor(shoeService, renderHandler, templateFunction, router) {
    this.shoeService = shoeService;
    this.renderHandler = renderHandler;
    this.templateFunction = templateFunction;
    this.router = router;
    this.showView = this._showView.bind(this);
    this.createHandler = this._createHandler.bind(this);
  }

  async _showView() {
    let template = this.templateFunction(this.createHandler);
    this.renderHandler(template);
  }

  async _createHandler(e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);

    //name	imageUrl	description	nutrition

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

    let result = await this.shoeService.create(fruit);
    this.router.navigate("/dashboard");
  }
}
