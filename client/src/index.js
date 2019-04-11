import 'bootstrap/dist/css/bootstrap.css';
import NegociacaoController from './controllers/NegociacaoController';

// console.log('hello world');
// $('.jumbotron').append(' Jquery here');
// const essix = async () => {
//   await console.log('es6');
// }
// essix();

const initialize = () => {
  const negociacaoController = new NegociacaoController();
  $('.form').submit(negociacaoController.adiciona());
};


initialize();
