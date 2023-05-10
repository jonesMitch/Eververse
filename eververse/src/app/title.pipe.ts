import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(title: string): string {
    if (title.length < 50) {
      return title;
    } else {
      return title.slice(0, 48) + "...";
    }
  }

}
