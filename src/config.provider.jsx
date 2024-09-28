import { createContext } from "react";

const ConfigContext = createContext({
  pagination: {
    page: 1,
    pageSize: 15,
  },
});

/**
 * ConfigProvider
 * @param {Object} props - 传递给组件的属性。
 * @param {Object} props.config - 传递给 ConfigContext.Provider 的值。
 * @param {React.ReactNode} props.children - 子组件。
 *
 * @returns {React.Element} 渲染的 ConfigContext.Provider 组件。
 */
export default function ConfigProvider({ config, children }) {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}

export { ConfigContext };
