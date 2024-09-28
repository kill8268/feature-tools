import { useContext } from "react";
import { ModalsContext } from "../featureTools.provider";
/**
 * useModals 用于从 ModalsContext 获取指定名称的模态窗口。
 *
 * @param {string} name - 模态窗口的名称。
 * @returns {Object} 指定名称的模态窗口。
 */
export default function useModals(name) {
  const context = useContext(ModalsContext);
  return context?.get(name);
}
