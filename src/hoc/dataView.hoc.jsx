import { DataViewContxt, FeatureContext } from "../featureTools.provider";
import { useContext } from "react";

/**
 * dataViewHoc 高阶组件，它为包装的组件提供渲染数据视图所需的依赖。
 *
 * @param {React.ComponentType} WrappedComponent - 需要包装的组件。
 * @returns {React.ComponentType} 包装后的组件。
 */
export default function dataViewHoc(WrappedComponent) {
  return function DataViewHocComponent({ beforeRender, ...props }) {
    const dataViewContxt = useContext(DataViewContxt);
    const featureContext = useContext(FeatureContext);
    const getData = () => {
      if (!dataViewContxt || !dataViewContxt.data) return;
      if (beforeRender) {
        return beforeRender(dataViewContxt.data);
      } else {
        return dataViewContxt.data;
      }
    };

    return (
      <WrappedComponent
        {...props}
        data={getData()}
        reset={featureContext.reset}
        params={featureContext.params}
        isLoading={dataViewContxt.isLoading}
        isPage={dataViewContxt.isPage}
        pageChange={dataViewContxt.pageChange}
      />
    );
  };
}
