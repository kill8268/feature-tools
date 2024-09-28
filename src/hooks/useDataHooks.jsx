import { useContext, useState } from "react";
import { FeatureContext } from "../featureTools.provider";

/**
 * useDataHooks，用于处理数据更新异步操作并自动刷新数据。
 *
 * @param {Function} fun - 需要执行的异步函数。
 * @param {boolean} [reset=false] - 是否在函数执行后重置查询参数。
 * @returns {Array} 包含异步函数和状态的数组。
 */
export default function useDataHooks(fun, reset = false) {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const featureContext = useContext(FeatureContext);

  async function foo(...agrs) {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fun(...agrs);
      if (reset) {
        featureContext?.formRef?.current?.reset();
        featureContext.reset();
      } else {
        featureContext.mutate();
      }
      return res;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return [foo, loading, error];
}
