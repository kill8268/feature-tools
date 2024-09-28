import { ModalsContext } from "../featureTools.provider";
import { useContext, useEffect, useRef } from "react";

/**
 * modalsHoc 高阶组件，为包装的组件提供模态窗口自动注册到contxt的注册功能。
 *
 * @param {React.ComponentType} WrappedComponent - 需要包装的组件。
 * @param {string} [alias] - 注册到 ModalsContext 的别名，如果没有提供，则使用组件的 displayName 或 name。
 * @returns {React.ComponentType} 包装后的组件。
 */
export default function modalsHoc(WrappedComponent, alias) {
  return function ModalsHocComponent(props) {
    const ref = useRef();
    const modalsContext = useContext(ModalsContext);
    useEffect(() => {
      if (!modalsContext) return;
      modalsContext.register(
        alias || WrappedComponent.displayName || WrappedComponent.name,
        ref.current,
      );
    }, [modalsContext]);

    return <WrappedComponent ref={ref} {...props} />;
  };
}
