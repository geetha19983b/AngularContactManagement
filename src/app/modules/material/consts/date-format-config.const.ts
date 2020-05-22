import { CommonDateConsts } from '../../../common/constants/common.date.consts';

export const UAL_DATE_FORMATS = {
  parse: {
    dateInput: [
      CommonDateConsts.FORMAT,
      'DDMMMYYYY',
      'DD MMM',
      'DDMMM',
      'DD MM YYYY'
    ]
  },
  display: {
    dateInput: CommonDateConsts.FORMAT,
    monthYearLabel: CommonDateConsts.FORMAT,
    dateA11yLabel: CommonDateConsts.FORMAT,
    monthYearA11yLabel: CommonDateConsts.FORMAT
  }
};
