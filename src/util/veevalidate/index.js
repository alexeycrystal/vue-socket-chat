import {extend} from 'vee-validate';
import {required, email, min, max, alpha_num, confirmed} from 'vee-validate/dist/rules';

// Add the required rule
extend('required', {
  ...required
});

extend('email', {
  ...email
});

extend('min', {
  ...min
});

extend('max', {
  ...max
});

extend('alpha_num', {
  ...alpha_num
});

extend('confirmed', {
  ...confirmed
});

export default true;

