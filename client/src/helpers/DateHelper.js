class DateHelper {
  constructor() {
    throw new Error('This is a static class');
  }

  static textToDate(text) {
    if (!/\d{4}-\d{2}-\d{2}/.test(text)) {
      throw new Error('Must be on format yyyy-mm-dd');
    }

    const date = new Date(
      ...text
        .split('-')
        .map((item, indice) => item - (indice % 2))
    );

    return date;
  }

  static dateToText(date) {
    const diaMesAno = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;

    return diaMesAno;
  }
}

export default DateHelper;
