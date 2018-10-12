import React from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

import { AdIconViewContext, AdIconViewContextValueType } from './withNativeAd';

// tslint:disable-next-line:variable-name
export const NativeAdIconView = requireNativeComponent<ViewProps>('AdIconView');

export interface AdIconViewProps
  extends ViewProps,
    Required<AdIconViewContextValueType> {}

class AdIconViewChild extends React.Component<AdIconViewProps> {
  private iconView: React.ReactNode | null = null;

  private handleAdIconViewRef = (ref: React.ReactNode) => {
    if (this.iconView) {
      this.props.unregister(this.iconView);
      this.iconView = null;
    }

    if (ref) {
      this.props.register(ref);
      this.iconView = ref;
    }
  }

  render() {
    return <NativeAdIconView {...this.props} ref={this.handleAdIconViewRef} />;
  }
}

export default class AdIconView extends React.Component<AdIconViewProps> {
  render() {
    return (
      <AdIconViewContext.Consumer>
        {(contextValue: Required<AdIconViewContextValueType>) => (
          <AdIconViewChild {...this.props} {...contextValue} />
        )}
      </AdIconViewContext.Consumer>
    );
  }
}
