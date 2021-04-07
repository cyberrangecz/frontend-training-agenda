import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCaseExcept',
})
export class TitleCaseExceptPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    let words: RegExp = /\b(?!of|by|the|a|an|on|in|at|to|into|onto)\w+/g;
    let newVal = value.replace(words, (match) => {
      return match.replace(/^\w/, (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
    });
    return newVal.charAt(0).toUpperCase() + newVal.substr(1);
  }
}
