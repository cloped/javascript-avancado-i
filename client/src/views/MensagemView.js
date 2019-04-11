import View from './View';

class MensagemView extends View {
  template(model) {
    return `<p class='alert alert-info'>${model.texto}</p>`;
  }
}

export default MensagemView;
