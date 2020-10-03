import { Config } from '@stencil/core';
import { angularOutputTarget, ValueAccessorConfig } from "@stencil/angular-output-target";

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  // TODO: In order for ngmodel to work on input components we need to define certain pieces of information about the input components.
  // Unfortunately the Stencil compiler cannot infer the intent of components because this is a very conceptual idea.
  // Example: https://github.com/ionic-team/stencil-ds-output-targets/blob/ad7e6605c372e6e98672a26ddf9e99f7343a9fc8/packages/example-project/component-library/stencil.config.ts#L6-L37
];

export const config: Config = {
  namespace: 'web-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    angularOutputTarget({
      componentCorePackage: 'web-components',
      directivesProxyFile: '../web-components-angular/src/directives/proxies.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
  ],
};
