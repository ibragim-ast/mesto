class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch(this._options.baseUrl, {
      headers: this._options.headers
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .then(res => {
        return res;
      })
      .catch(console.log)
  }

  createNewCard(data) {
    return fetch(this._options.baseUrl, {
      headers: {
        'Authorization': 'd8c1ea30-e545-47be-9a07-052774c37113',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        name: data.name, link: data.link
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(new Error(`Ошибка ${res.status}`)))
      .then(res => {
        return res;
      })
      .catch(console.log);
  }

}


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64/cards',
  headers: {
    authorization: 'd8c1ea30-e545-47be-9a07-052774c37113',
    'Content-Type': 'application/json'
  }
});
