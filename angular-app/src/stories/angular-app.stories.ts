// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { MyAngularComponent } from "../app/my-angular.component";

export default {
  title: 'my-angular',
  component: MyAngularComponent,
  decorators: [
    moduleMetadata({
      declarations: [MyAngularComponent]
    }),
  ],
} as Meta;

const Template: Story<MyAngularComponent> = (args: MyAngularComponent) => ({
  template: '<my-angular [name]="name"></my-angular>',
  component: MyAngularComponent,
  props: args
});

export const Primary = Template.bind({});
Primary.args = {name: 'name'};
