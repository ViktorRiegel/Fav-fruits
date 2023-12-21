import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { AuthService } from "./services/AuthService.js";
import { BaseCrudApiService } from "./services/BaseCrudApiservice.js";
import { SessionService } from "./services/SessionService.js";
import { NavComponent } from "./components/nav/nav.js";
import { navTemplate } from "./components/nav/navTemplate.js";
import { HomeComponent } from "./components/home/home.js";
import { homeTemplate } from "./components/home/homeTemplate.js";
import { LoginComponent } from "./components/login/login.js";
import { loginTemplate } from "./components/login/loginTemplate.js";
import { DashboardComponent } from "./components/dashboard/dashboard.js";
import { dashboardTemplate } from "./components/dashboard/dashboardTemplate.js";
import { RegisterComponent } from "./components/register/register.js";
import { registerTemplate } from "./components/register/registerTemplate.js";
import { CreateComponent } from "./components/create/create.js";
import { createTemplate } from "./components/create/createTemplate.js";
import { detailTemplate } from "./components/detail/detailTemplate.js";
import { DetailsComponent } from "./components/detail/detail.js";
import { EditComponent } from "./components/edit/edit.js";
import { editTemplate } from "./components/edit/editTemplate.js";

const main = document.querySelector("#wrapper main");
const nav = document.querySelector("#wrapper header");

let router = {
  navigate: page.show,
  redirect: page.redirect,
};

const baseUrl = "http://localhost:3030";

let renderBody = (template) => render(template, main);
let renderNav = (template) => render(template, nav);

let sessionService = new SessionService();
let authService = new AuthService(baseUrl, sessionService);
let fruitService = new BaseCrudApiService(baseUrl, "/data/fruits", sessionService);

let navComponent = new NavComponent(authService, renderNav, navTemplate, router);
let homeComponet = new HomeComponent(renderBody, homeTemplate);

let loginComponent = new LoginComponent(authService, renderBody, loginTemplate, router);
let dashboardComponent = new DashboardComponent(fruitService, renderBody, dashboardTemplate);

let registerComponent = new RegisterComponent(authService, renderBody, registerTemplate, router);
let createComponent = new CreateComponent(fruitService, renderBody, createTemplate, router);

let detailsComponent = new DetailsComponent(authService, fruitService, renderBody, detailTemplate, router);

const editComponent = new EditComponent(fruitService, renderBody, editTemplate, router);

page("/index.html", "/");
page(navComponent.showView);

page("/", homeComponet.showView);
page("/login", loginComponent.showView);
page("/register", registerComponent.showView);
page("/dashboard", dashboardComponent.showView);
page("/create", createComponent.showView);
page("/details/:id", detailsComponent.showView);
page("/edit/:id", editComponent.showView);

page.start();
