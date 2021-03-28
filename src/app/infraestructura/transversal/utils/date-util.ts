import {StringUtil} from './string-util';

export class DateUtil {

  constructor() {
  }

  public static parseToDate(datestring: string): Date {
    if(StringUtil.isNullOrEmpty(datestring)) {
      return null;
    }
    const fechasplit = datestring.split('-');
    if(fechasplit.length != 3){
      return null;
    }
    const year = Number(fechasplit[0]);
    const month = Number(fechasplit[1]) - 1;
    const dat = Number(fechasplit[2]);
    const retorno = new Date(year, month, dat);
    //retorno.setHours(Number)
    return retorno;
  }

  public static getQueryFormat(date: Date): string {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  }

  public static getDateTimeQueryFormat(date: Date): string {
    return date.getFullYear() + '-' +
            String(date.getMonth() + 1).padStart(2, '0') + '-' +
            String(date.getDate()).padStart(2, '0') + ' ' +
            String(date.getHours()).padStart(2, '0') + ':' +
            String(date.getMinutes()).padStart(2, '0') + ':00';
  }

  public static getDecimalTime(date: Date): number {
    return date.getHours() + date.getMinutes() / 100;
  }

  public static isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }

  public static setCurrentTime(date: Date) {
    const now = new Date();
    date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    // date.setHours(today.getHours(), today.getm, 0, 0);
  }

  public static setNoTime(date: Date) {
    const now = new Date();
    date.setHours(0, 0, 0, 0);
  }

  public static ngDateToDate(date: Date): Date {
    const year = Number(date['year']);
    const month = Number(date['month'] - 1);
    const dat = Number(date['day']);
    return new Date(year, month, dat);
  }

  public static ngDateToQueryformat(data: Date): string {
    if(data == null){
      return null;
    }
    return this.getQueryFormat(this.ngDateToDate(data));
  }

  public static toGeneralString(date: Date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }

  public static toString(date: Date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [day, month, year].join('/');
  }

  public static TimeToString(hour: any, minute: any) {
    if (hour < 10) { hour = '0' + hour; }
    if (minute < 10) { minute = '0' + minute; }
    return [hour, minute, '00'].join(':');
  }

  public static toIsoString(date: Date) {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
  }

  public static ToGeneralHour(date: Date){
    let hour = '' + this.leadTwo(date.getHours());
    let minute = '' + this.leadTwo(date.getMinutes());
    return [hour, minute].join(':');
  }

  public static toGeneralStringHour(date: Date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    const fecha = [year, month, day].join('/');
    let hour = '' + this.leadTwo(date.getHours());
    let min = '' + this.leadTwo(date.getMinutes());
    let sec = '' + this.leadTwo(date.getSeconds());
    const hora = [hour, min, sec].join(':');
    return [fecha, hora].join(' ');
  }

  public static toGeneralStringTimeHour(date: Date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    const fecha = [day, month, year].join('/');
    let hour = '' + this.leadTwo(date.getHours());
    let min = '' + this.leadTwo(date.getMinutes());
    const hora = [hour, min].join(':');
    return [fecha, hora].join(' ');
  }

  public static getHourString(date)
  {
    return this.leadTwo(date.getHours());
  }

  public static getMinuteString(date)
  {
    return this.leadTwo(date.getMinutes());
  }

  public static leadTwo(minutes)
  {
    return (minutes < 10 ? '0' : '') + minutes;
  }
}
