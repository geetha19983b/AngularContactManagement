import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'ualDate'
})
export class DatePipe implements PipeTransform {
  transform(value: Date | string): any {
    const tempDate = moment(value);

    if (tempDate.isValid()) {
      return moment(tempDate, 'DD/MMM/YYYY')
        .format('DD MMM YYYY')
        .toUpperCase();
    }

    return value;
  }
}
