export default {
  title: 'my-component'
};

const Template = ({first, middle, last}) => {
  const btn = document.createElement('my-component');
  btn.setAttribute('first', first);
  btn.setAttribute('middle', middle);
  btn.setAttribute('last', last);
  return btn;
};

export const Primary = Template.bind({});
Primary.args = {first: 'first', middle: 'middle', last: 'last'};
