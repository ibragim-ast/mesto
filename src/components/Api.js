class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .then(res => {
        return res;
      })
      .catch(console.log)
  }

  setUserInfo(name, about) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .then(res => {
        return res;
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }


  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .then(res => {
        return res;
      })
      .catch(console.log)
  }

  createNewCard(data) {
    return fetch(`${this._address}cards`, {
      headers: this._headers,
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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
    authorization: 'd8c1ea30-e545-47be-9a07-052774c37113',
    'Content-Type': 'application/json'
  }
});
