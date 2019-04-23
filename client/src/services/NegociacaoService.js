import Negociacao from '../models/Negociacao';
import HttpService from './HttpService';

class NegociacaoService {
  static importaNegociacoesSemana(periodo) {
    return new Promise((resolve, reject) => {
      HttpService
        .get(`http://localhost:3000/negociacoes/${periodo}`)
        .then((negociacoes) => {
          resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
        })
        .catch((err) => {
          console.log(err);
          reject(new Error('Não foi possível obter as negociações'));
        });
    });
  }

  static cadastraNegociacao(negociacao) {
    return new Promise((resolve, reject) => {
      HttpService
        .post('http://localhost:3000/negociacoes', negociacao)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(new Error('Não foi possível cadastrar a negociação'));
        });
    });
  }
}

export default NegociacaoService;
