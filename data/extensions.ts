/**
 * Trim string from a set of characters.
 * @author https://stackoverflow.com/a/55292366
 * @param str
 * @param chars
 */
export function trimAny(str: string, chars: string) {
  let start = 0,
    end = str.length;

  while (start < end && chars.indexOf(str[start]) >= 0) {
    ++start;
  }

  while (end > start && chars.indexOf(str[end - 1]) >= 0) {
    --end;
  }

  return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}


/**
 * Title case a string.
 * Based on https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
 * And https://brandintellect.in/convert-string-title-case-javascript/
 * And https://javascript.info/regexp-unicode
 * @param value
 */
export function titleCase(value: string) {
  // title case is achieved by splitting the string on a word boundary \b
  // followed by one or more Unicode Letters \p{L} (using the Unicode flag /u )
  // then convert the first char to upper case according to the current locale, and the rest of the match to lower case

  value = value ? value : '';

  return value.replace(
    /\b\p{L}+/gu,
    function(matched) {
      return matched.charAt(0).toLocaleUpperCase() + matched.substr(1).toLocaleLowerCase();
    });
}

/**
 * From Typescript documentation, src
 * See https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types
 * @param o
 * @param propertyName
 */
export function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; // o[propertyName] is of type T[K]
}
