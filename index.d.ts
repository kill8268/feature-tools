declare module "feature-tools" {
  import { ComponentType, FC, ReactNode, RefObject } from "react";

  export interface FeatureToolsProviderProps {
    swrKey: string;
    defaultParams: any;
    isPage?: boolean;
    children: ReactNode;
  }

  export const FeatureToolsProvider: FC<FeatureToolsProviderProps>;

  export function searchHoc(
    WrappedComponent: ComponentType<any>,
  ): ComponentType<any>;

  export function dataViewHoc(
    WrappedComponent: ComponentType<any>,
  ): ComponentType<any>;

  export function modalsHoc(
    WrappedComponent: ComponentType<any>,
    alias?: string,
  ): ComponentType<any>;

  export function useModals(name: string): RefObject<any> | null;

  export function useDataHooks(
    fun: Function,
    reset?: boolean,
  ): [Function, boolean, Error | null];

  export interface FeatureToolsConfigProps {
    config: any;
    children: ReactNode;
  }

  export const FeatureToolsConfig: FC<FeatureToolsConfigProps>;

  export function ModalTriggerHelper({
    modalName,
    children,
  }: {
    modalName: string;
    children: (modalRef: any | RefObject<any>) => React.ReactNode;
  }): React.ReactElement;

  export default FeatureToolsProvider;
}
