class HttpService {
  static get(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            // console.log(xhr.responseText);
            reject(xhr.responseText);
          }
        }
      };
      xhr.send();
    });
  }

  static post(url, negociacao) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.responseText);
          }
        }
      };
      xhr.send(JSON.stringify({
        data: new Date(Date.parse(negociacao.data)),
        quantidade: negociacao.quantidade,
        valor: negociacao.valor,
      }));
    });
  }
}

export default HttpService;
