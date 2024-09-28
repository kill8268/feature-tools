import useSWR from "swr";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ConfigContext } from "./config.provider";

const FeatureContext = createContext();
const ModalsContext = createContext();
const SearchContext = createContext();
const DataViewContxt = createContext();
/**
 * FeatureToolsProvider 是一个维护功能模块基础操作的组件，
 *
 * @param {Object} props - 传递给组件的属性。
 * @param {string} props.swrKey - 用于 SWR 数据获取的键。
 * @param {Object} props.defaultParams - 数据获取的默认参数。
 * @param {boolean} [props.isPage=true] - 标志指示数据视图是否分页。
 * @param {React.ReactNode} props.children - 子组件。
 *
 * @returns {React.Element} 渲染的组件。
 */
export default function FeatureToolsProvider({
  swrKey,
  defaultParams,
  isPage = true,
  children,
}) {
  const modals = useRef({});
  const config = useContext(ConfigContext);
  const defaultParamsRef = useRef();
  const formRef = useRef();
  const [params, setParams] = useState();
  const { data, isLoading, mutate } = useSWR(
    swrKey && params && [...swrKey, params],
  );

  useEffect(() => {
    defaultParamsRef.current = {
      ...(isPage ? config?.pagination : {}),
      ...defaultParams,
    };
    setParams(defaultParamsRef.current);
  }, [config, defaultParams, isPage]);

  const featureValue = useMemo(() => {
    return {
      params,
      mutate,
      formRef,
      reset() {
        setParams(() => ({
          ...defaultParamsRef.current,
          _: Date.now(),
        }));
      },
    };
  }, [params, mutate]);

  const modalsValue = useMemo(() => {
    return {
      modals,
      register(name, ref) {
        name && (modals.current[name] = ref);
      },
      get(name) {
        return name ? modals.current?.[name] : modals.current;
      },
    };
  }, []);

  const searchValue = useMemo(() => {
    return {
      isLoading,
      search(param) {
        if (isPage) {
          setParams({
            ...param,
            ...config.pagination,
            _: Date.now(),
          });
        } else {
          setParams({ ...param, _: Date.now() });
        }
      },
      register(ref) {
        formRef.current = ref;
      },
    };
  }, [isLoading, isPage, config]);

  const dataViewValue = useMemo(() => {
    return {
      data,
      isLoading,
      isPage,
      pageChange: (page) => setParams((prev) => ({ ...prev, ...page })),
    };
  }, [data, isLoading, isPage]);

  return (
    <FeatureContext.Provider value={featureValue}>
      <ModalsContext.Provider value={modalsValue}>
        <SearchContext.Provider value={searchValue}>
          <DataViewContxt.Provider value={dataViewValue}>
            {children}
          </DataViewContxt.Provider>
        </SearchContext.Provider>
      </ModalsContext.Provider>
    </FeatureContext.Provider>
  );
}

export { FeatureContext, ModalsContext, SearchContext, DataViewContxt };
