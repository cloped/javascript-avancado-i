import 'bootstrap/dist/css/bootstrap.css';
import NegociacaoController from './controllers/NegociacaoController';

const initialize = () => {
  const negociacaoController = new NegociacaoController();
  $('.form').on('submit', negociacaoController.adiciona);
};

initialize();
