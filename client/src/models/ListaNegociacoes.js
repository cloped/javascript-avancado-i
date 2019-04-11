class ListaNegociacoes {
  constructor(trigger) {
    this._negociacoes = [];

    this._trigger = trigger;
  }

  get negociacoes() {
    return [].concat(this._negociacoes);
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);

    this._trigger(this);
  }

  esvazia() {
    this._negociacoes = [];

    this._trigger(this);
  }
}

export default ListaNegociacoes;
