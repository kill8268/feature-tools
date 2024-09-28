import { useContext } from "react";
import { ModalsContext } from "../featureTools.provider";

/**
 * ModalTriggerHelper 组件。
 * @param {Object} props - 组件的属性。
 * @param {string} props.modalName - 模态窗口的名称。
 * @param {Function} props.children - 一个接收 modalRef 作为参数的函数。
 * @returns {React.Element} 渲染的元素。
 */
export default function ModalTriggerHelper({ modalName, children }) {
  const { get } = useContext(ModalsContext);

  const trigger = (fun) => {
    return () => fun(get(modalName));
  };

  return children(trigger);
}
