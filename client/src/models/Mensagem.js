class Mensagem {
  constructor(texto, trigger) {
    this._texto = texto || '';

    this._trigger = trigger;
  }

  get texto() {
    return this._texto;
  }

  set texto(texto) {
    this._texto = texto;

    if (texto !== '') {
      this._trigger(this);
    }
  }
}

export default Mensagem;
