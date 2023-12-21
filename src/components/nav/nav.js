export class NavComponent {
  constructor(authService, renderHandler, templateFunction, router) {
    this.authService = authService;
    this.renderHandler = renderHandler;
    this.templateFunction = templateFunction;
    this.router = router;
    this.logoutHandler = this._logoutHandler.bind(this);
    this.showView = this._showView.bind(this);
  }

  async _showView(ctx, next) {
    let isUserLoggendIn = this.authService.isUserLoggendIn();
    let template = this.templateFunction(isUserLoggendIn, this.logoutHandler);
    this.renderHandler(template);
    next();
  }

  async _logoutHandler() {
    await this.authService.logout();
    this.router.navigate("/");
  }
}
