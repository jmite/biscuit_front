import { element } from 'protractor';

export class Parametro{
  clave: string;
  valor: any;

  constructor(clave:string, valor: any){
      this.clave = clave;
      this.valor =valor;
  }

  static buildParamsUlr(lista: Parametro[]):string{
    let final_params_url = ""; 
    let contador = 0; 
    lista.forEach(element => {
      if (contador === 0)
        final_params_url = final_params_url + "?" + element.clave + "=" + element.valor;
      else
        final_params_url = final_params_url + "&" + element.clave + "=" + element.valor;
      contador++;
    });
    return final_params_url;
  }

  static existParam(elem:Parametro, lista: Parametro[]):boolean{
     let listaclaves = []
     lista.forEach(element => {
        listaclaves.push(element.clave);
     });
     return listaclaves.includes(elem.clave);

  }

  static agregarParametro(elem:Parametro, lista: Parametro[]):Parametro[]{
    let listaclaves = []; // Lista auxiliar que guarda solo las claves, no valores
    lista.forEach(element => {
       listaclaves.push(element.clave);
    });

    if (!listaclaves.includes(elem.clave)){  //console.log(channelArray.indexOf('three') > -1);
        lista.push(elem);
    }
    else{ 
      // Se depura la información para quitar la(s) clave/valor existente(s) previamente.
      lista = lista.filter(function(obj){ 
        return obj.clave != elem.clave;                  
      });
      lista.push(elem); // Se pone la nueva clave/valor
    }
    return lista;
  }

  static removerParametro(elem:Parametro, lista: Parametro[]):Parametro[]{
    // Se depura la información para quitar la(s) clave/valor existente(s) previamente.
    lista = lista.filter(function(obj){ 
      return obj.clave != elem.clave;                  
    });
    return lista;
  }

  static remove(clave: string, lista: Parametro[]) {
      const index = lista.findIndex(x=>x.clave==clave);
      if (index >= 0) {
          lista.splice(index);
      }
  }


  static add(lista: Parametro[], clave: string, valor: any){
    const parametro = new Parametro(clave, valor);
    if (valor != null){
      Parametro.remove(clave, lista);
      Parametro.agregarParametro(parametro, lista);
    }
  }
}