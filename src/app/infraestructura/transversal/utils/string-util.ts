export class StringUtil {

  constructor() {
  }

  public static isNullOrEmpty(value: any): Boolean {
    return typeof value === 'undefined' || value == null || value === '';
  }

  public static ponerDigitos(cantidad: number, cadena: string): string {
    const restante = cantidad - cadena.length;
    let relleno = "";
    if ( restante <= 0 ) return relleno + cadena;
    for (let index = 0; index < restante; index++) {
      relleno = relleno + "0";
    }
    return relleno + cadena;
  }

  public static getCurrencyFormat(valor: number): string {
    const retorno  = "$"+valor.toFixed(2);
    return retorno;
  }

}
