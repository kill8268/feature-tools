# Feature Tools

Feature Tools 是一个基于swr提供了多种功能的 React 工具库，包括数据获取、模态窗口管理、搜索功能、数据视图等。

## 使用

```jsx
import FeatureToolsProvider, {
  searchHoc,
  dataViewHoc,
  modalsHoc,
  useModals,
  useDataHooks,
  FeatureToolsConfig,
} from "feature-tools";

// ...
```

## API

### `FeatureToolsProvider`

一个 Provider 组件，提供了多个context。

### `searchHoc`

一个高阶组件，为包装的组件提供搜索功能。

### `dataViewHoc`

一个高阶组件，为包装的组件提供数据视图的功能。

### `modalsHoc`

一个高阶组件，为包装的组件提供模态窗口的注册功能。

### `useModals`

一个自定义 React Hook，用于从 `ModalsContext` 获取指定名称的模态窗口。

### `useDataHooks`

一个自定义 React Hook，用于处理异步操作并管理相关状态。

### `FeatureToolsConfig`

一个 React 组件，提供了全局的配置对象。
