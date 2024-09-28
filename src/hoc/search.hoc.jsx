import { FeatureContext, SearchContext } from "../featureTools.provider";
import { useContext } from "react";

/**
 * searchHoc 高阶组件，它为包装的组件提供搜索和重置功能。
 *
 * @param {React.ComponentType} WrappedComponent - 需要包装的组件。
 * @returns {React.ComponentType} 包装后的组件。
 */
export default function searchHoc(WrappedComponent) {
  return function SearchHocComponent({ beforeSearch, ...props }) {
    const featureContext = useContext(FeatureContext);
    const searchContext = useContext(SearchContext);

    const handleSearch = (param) => {
      if (searchContext.isLoading) return;
      if (beforeSearch) {
        searchContext.search(beforeSearch(param));
      } else {
        searchContext.search(param);
      }
    };

    const handleReset = () => {
      if (searchContext.isLoading) return;
      featureContext.reset();
    };

    return (
      <WrappedComponent
        {...props}
        register={searchContext.register}
        onSearch={handleSearch}
        onReset={handleReset}
      />
    );
  };
}
