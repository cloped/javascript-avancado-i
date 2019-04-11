import DataHelper from '../helpers/DateHelper';

class NegociacoesView {
  constructor(element) {
    this._element = element;
  }

  _template(model) {
    /* eslint-disable indent */
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
            <th>VOLUME</th>
          </tr>
        </thead>
      <tbody>
      ${
      model.negociacoes.map(el => `
          <tr>
            <td>${DataHelper.dateToText(el.data)}</td>
            <td>${el.quantidade}</td>
            <td>${el.valor}</td>
            <td>${el.volume}</td>
          </tr>`).join('')
      }
      </tbody>

      <tfoot>
      <td colspan="3"></td>
      <td>
      ${
        model.negociacoes.reduce((total, el) => total + el.volume, 0.0)
      }
      </td>
      </tfoot>
      </table>`;
    /* eslint-enable indent */
  }

  update(model) {
    this._element.innerHTML = this._template(model);
  }
}

export default NegociacoesView;
