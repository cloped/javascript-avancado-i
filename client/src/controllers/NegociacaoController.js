class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
  }

  adiciona() {
    // event.preventDefault();

    const data = new Date(
      ...this._inputData.value
        .split('-')
        .map((item, indice) => item - (indice % 2))
    );

    // const negociacao = new Negociacao(
    //   data,
    //   this._inputQuantidade.value,
    //   this._inputValor.value,
    // );
    // eslint-disable max-len
    // const diaMesAno = `${negociacao.data.getDate()}/${(negociacao.data.getMonth() + 1)}/${negociacao.data.getFullYear()}`;
    // eslint-enable max-len
    // console.log(diaMesAno);

    // console.log(negociacao);

    console.log(data);
  }
}

export default NegociacaoController;
