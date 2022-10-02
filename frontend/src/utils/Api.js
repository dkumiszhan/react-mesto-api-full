class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.putLike(cardId);
    }
    return this.deleteLike(cardId);
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        authorization: this._getAuthHeader(),
    }    },
    
    
    
    ).then((res) => {
      return this._getResponseData(res);
    });
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        authorization: this._getAuthHeader(),
    },      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        ...this._headers,
        authorization: this._getAuthHeader(),
    },      method: "DELETE",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        authorization: this._getAuthHeader(),
    }}).then((res) => {
      return this._getResponseData(res);
    });
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: this._getAuthHeader(),
    },      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: {
        ...this._headers,
        authorization: this._getAuthHeader(),
    },      method: "PUT",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: {
        ...this._headers,
        authorization: this._getAuthHeader(),
    },      method: "DELETE",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: this._getAuthHeader(),
    },      body: JSON.stringify(data),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  _getAuthHeader() {
    return "Bearer " + localStorage.getItem("jwt");
  }
}

const api = new Api({
  baseUrl: "http://kumiszhan.students.nomoredomains.icu/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
