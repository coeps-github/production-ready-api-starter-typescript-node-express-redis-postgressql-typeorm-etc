import {defineCustomElements} from '../loader';

defineCustomElements();

export const parameters = {
  layout: 'centered',
  actions: {argTypesRegex: "^on[A-Z].*"},
}
