import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})

export class HighlightSearch implements PipeTransform {

  transform(value: string, matchingText: string, minLength: number): string {
    if (!matchingText || matchingText.replace(/^\s+/, '').length < minLength) {
      return value;
    }

    return value.replace(new RegExp(matchingText.replace(/^\s+/, ''), 'gi'), '<span class="highlight-text">$&</span>');
  }
}
