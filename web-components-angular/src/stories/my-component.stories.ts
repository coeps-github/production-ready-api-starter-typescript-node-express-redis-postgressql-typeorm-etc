// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular/types-6-0';
import { MyComponent } from "../directives/proxies";
import { moduleMetadata } from "@storybook/angular";
import { WebComponentsAngularModule } from "../web-components-angular.module";

export default {
  title: 'my-component',
  component: MyComponent,
  decorators: [
    moduleMetadata({
      imports: [WebComponentsAngularModule],
    }),
  ],
} as Meta;

const Template: Story<MyComponent> = (args: MyComponent) => ({
  template: '<my-component [first]="first" [middle]="middle" [last]="last"></my-component>',
  component: MyComponent,
  props: args
});

export const Primary = Template.bind({});
Primary.args = {first: 'first', middle: 'middle', last: 'last'};
