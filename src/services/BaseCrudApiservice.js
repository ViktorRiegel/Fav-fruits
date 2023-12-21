import { BaseApiService } from "./BaseApiService.js";

export class BaseCrudApiService extends BaseApiService {
  constructor(baseUrl, path, sessionService) {
    super(baseUrl);
    this.resourceUrl = `${this.baseUrl}${path}`;
    this.sessionService = sessionService;
  }

  async getAll() {
    let options = {
      method: "Get",
    };
    let url = `${this.resourceUrl}?sortBy=_createdOn%20desc`;
    let ressult = await this._internalFetchJson(url, options);
    return ressult;
  }

  async getById(id) {
    let options = {
      method: "Get",
    };
    let url = `${this.resourceUrl}/${id}`;
    let ressult = await this._internalFetchJson(url, options);
    return ressult;
  }

  async create(item) {
    let options = {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": this.sessionService.getAccessToken(),
      },
      body: JSON.stringify(item),
    };
    let ressult = await this._internalFetchJson(this.resourceUrl, options);
    return ressult;
  }

  async edit(id, item) {
    let options = {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": this.sessionService.getAccessToken(),
      },
      body: JSON.stringify(item),
    };

    let url = `${this.resourceUrl}/${id}`;
    let ressult = await this._internalFetchJson(url, options);
    return ressult;
  }

  async delete(id) {
    let options = {
      method: "Delete",
      headers: {
        "X-Authorization": this.sessionService.getAccessToken(),
      },
    };
    let url = `${this.resourceUrl}/${id}`;
    let ressult = await this._internalFetchJson(url, options);
    return ressult;
  }
}
