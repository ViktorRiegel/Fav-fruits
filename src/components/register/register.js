import { UserReadableError } from "../../errors/UserReadableError.js";

export class RegisterComponent {
  constructor(authService, renderHandler, templateFunction, router) {
    this.authService = authService;
    this.renderHandler = renderHandler;
    this.templateFunction = templateFunction;
    this.router = router;
    this.registerHandler = this._registerHandler.bind(this);
    this.showView = this._showView.bind(this);
  }

  async _showView() {
    let template = this.templateFunction(this.registerHandler);
    this.renderHandler(template);
  }

  async _registerHandler(e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);

    let email = formData.get("email");
    let password = formData.get("password");
    let repeatePassword = formData.get("re-password");

    if (email == "" || password == "" || repeatePassword == "") {
      alert("Email and password must not be empty");
      return;
    }
    if (password != repeatePassword) {
      alert("Password do not match");
      return;
    }

    let user = { email, password };
    try {
      let result = await this.authService.register(user);
      this.router.navigate("/");
    } catch (e) {
      if (e instanceof UserReadableError) {
        alert(e.message);
      }
    }
  }
}
