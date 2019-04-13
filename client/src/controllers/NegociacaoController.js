import Negociacao from '../models/Negociacao';
import ListaNegociacoes from '../models/ListaNegociacoes';
import DateHelper from '../helpers/DateHelper';
import NegociacoesView from '../views/NegociacoesView';
import Mensagem from '../models/Mensagem';
import MensagemView from '../views/MensagemView';

class NegociacaoController {
  constructor() {
    const self = this;
    const $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
      get: (target, prop, receiver) => {
        if (['adiciona', 'esvazia'].indexOf(prop) !== -1 && typeof (target[prop]) === typeof (Function)) {
          return function () {
            // eslint-disable-next-line prefer-rest-params
            Reflect.apply(target[prop], target, arguments);
            self._negociacoesView.update(target);
          };
        }
        return Reflect.get(target, prop, receiver);
      },
    });

    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._negociacoesView.update(this._listaNegociacoes);

    this._mensagem = new Mensagem(undefined, model => this._mensagemView.update(model));
    this._mensagemView = new MensagemView($('#mensagemView'));

    this.adiciona = this.adiciona.bind(this);
    this.apaga = this.apaga.bind(this);
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textToDate(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }

  adiciona(event) {
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());

    this._mensagem.texto = 'Negociação adicionada com sucesso';

    this._limpaFormulario();
  }

  apaga() {
    this._listaNegociacoes.esvazia();

    this._mensagem.texto = 'Negociações apagadas!';
  }

  adicionaEventos() {
    // Adding page events listeners
    $('.form').on('submit', this.adiciona);
    $('#apagarNegociacoes').on('click', this.apaga);
  }
}

export default NegociacaoController;
