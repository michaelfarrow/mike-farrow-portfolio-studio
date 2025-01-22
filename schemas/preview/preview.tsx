import React, { ComponentType } from 'react';
import { PreviewProps } from 'sanity';

export function createPreview<T extends PreviewProps>(
  component: (props: {
    renderError: (error: string) => React.ReactNode;
  }) => ComponentType<T>
) {
  return (props: T) => {
    const C = component({
      renderError: (error: string) => {
        return props.renderDefault({
          ...props,
          title: `[${error}]`,
          subtitle: undefined,
        });
      },
    });
    return <C {...props} />;
  };
}
