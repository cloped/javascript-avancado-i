import 'bootstrap/dist/css/bootstrap.css';
import NegociacaoController from './controllers/NegociacaoController';

// eslint-disable-next-line no-use-before-define
const beforeInit = (callback = initialize) => {
  // implements before functions

  callback();
};

// eslint-disable-next-line no-use-before-define
const initialize = (callback = afterInit) => {
  const negociacaoController = new NegociacaoController();
  negociacaoController.adicionaEventos();

  callback();
};

const afterInit = () => {
  // implements after functions
};

beforeInit();
