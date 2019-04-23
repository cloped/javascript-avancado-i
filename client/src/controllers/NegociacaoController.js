import Negociacao from '../models/Negociacao';
import ListaNegociacoes from '../models/ListaNegociacoes';
import DateHelper from '../helpers/DateHelper';
import NegociacoesView from '../views/NegociacoesView';
import Mensagem from '../models/Mensagem';
import MensagemView from '../views/MensagemView';
import ProxyFactory from '../services/ProxyFactory';
import NegociacaoService from '../services/NegociacaoService';

class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._listaNegociacoes = ProxyFactory.create(
      new ListaNegociacoes(),
      ['adiciona', 'esvazia'], model => this._negociacoesView.update(model)
    );
    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._negociacoesView.update(this._listaNegociacoes);

    this._mensagem = ProxyFactory.create(
      new Mensagem(), ['texto'], model => this._mensagemView.update(model)
    );
    this._mensagemView = new MensagemView($('#mensagemView'));

    this.adiciona = this.adiciona.bind(this);
    this.apaga = this.apaga.bind(this);
    this.importaNegociacoes = this.importaNegociacoes.bind(this);
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textToDate(this._inputData.value),
      parseInt(this._inputQuantidade.value, 10),
      parseInt(this._inputValor.value, 10),
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
    const negociacao = this._criaNegociacao();
    this._limpaFormulario();
    NegociacaoService.cadastraNegociacao(negociacao)
      .then(() => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = 'Negociação adicionada com sucesso';
      }).catch((err) => {
        this._mensagem.texto = err;
      });
  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas!';
  }

  importaNegociacoes() {
    Promise.all([
      NegociacaoService.importaNegociacoesSemana('semana'),
      NegociacaoService.importaNegociacoesSemana('anterior'),
      NegociacaoService.importaNegociacoesSemana('retrasada'),
    ]).then((negociacoes) => {
      negociacoes
        .reduce((array, element) => array.concat(element), [])
        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociações importadas com sucesso';
    }).catch((erro) => {
      this._mensagem.texto = erro;
    });
  }

  adicionaEventos() {
    // Adding page events listeners
    $('.form').on('submit', this.adiciona);
    $('#apagarNegociacoes').on('click', this.apaga);
    $('#importarNegociacoes').on('click', this.importaNegociacoes);
  }
}

export default NegociacaoController;
