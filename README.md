### Prefix => Method

> make sure you are in the right type file

| Prefix              | Method                                                      |
| ------------------- | ----------------------------------------------------------- |
| `zz-imp`            | `import moduleName from module`                             |
| `zz-imd`            | `import {destructuredModule} from module`                   |
| `zz-impt`           | `import PropTypes from 'prop-types'`                        |
| `zz-exp`            | `export default moduleName`                                 |
| `zz-fre`            | `arrayName.forEach(element => { }`                          |
| `zz-map`            | `arrayName.map(element => { }`                              |
| `zz-cp`             | `const { } = this.props`                                    |
| `zz-cs`             | `const { } = this.state`                                    |
| `zz-clg`            | `console.log("data:", object)`                              |
| `zz-cdm`            | `componentDidMount = () => { }`                             |
| `zz-scu`            | `shouldComponentUpdate = (nextProps, nextState) => { }`     |
| `zz-cdup`           | `componentDidUpdate = (prevProps, prevState) => { }`        |
| `zz-cwun`           | `componentWillUnmount = () => { }`                          |
| `zz-gdsfp`          | `static getDerivedStateFromProps(nextProps, prevState) { }` |
| `zz-gsbu`           | `getSnapshotBeforeUpdate = (prevProps, prevState) => { }`   |
| `zz-page-normal`    | `jsx|js page`                                               |
| `zz-model-normal`   | `models page`                                               |
| `zz-service-normal` | `services page`                                             |

### zz-page-normal

> maybe not the latest content, see `src/pages/DemoPage.js`

```javascript
import React, { Component } from "react";
import { connect } from "dva";
import { ConfigProvider, Spin } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import PropTypes from "prop-types";

import styles from "./DemoPage.less";

@connect(({ demo, loading }) => ({ demoData: demo, loadingData: loading }))
class DemoPage extends Component {
  // 不需要可以先注释，建议进行类型检查
  static propTypes = {
    // 特定的JS类型
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,
    // 任何可以被渲染的元素
    optionalNode: PropTypes.node,
    // 指定类型为：一个react 元素
    optionalElement: PropTypes.element,
    // 某个类的实例
    optionalMessage: PropTypes.instanceOf(Message),
    // 指定枚举类型：你可以把属性限制在某些特定值之内
    optionalEnum: PropTypes.oneOf(["A", "B"]),
    // 指定多个类型：你也可以把属性类型限制在某些指定的类型范围内
    optionalUnion: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Message),
    ]),
    // 指定某个类型的数组
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
    // 指定类型为对象，且对象属性值是特定的类型
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),
    // 指定类型为对象，且可以规定哪些属性必须有，哪些属性可以没有
    optionalObjectWithShape: PropTypes.shape({
      optionalProperty: PropTypes.string,
      requiredProperty: PropTypes.number.isRequired,
    }),
  };

  static defaultProps = {
    key: "value",
  };

  state = {
    key: "value",
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "demoData/getDemoList",
      payload: {},
    }).then(res => {
      if (res) {
        console.log("res:", res);
      }
    });
  }

  // need shouldComponentUpdate type&enter zz-scu

  // need componentDidUpdate type&enter zz-cdup

  // need componentWillUnmount type&enter zz-cwun

  render() {
    const { key } = this.state;
    const { loadingData } = this.props;
    const { effects } = loadingData;

    // 此处注意替换
    const spinning = effects["demoData/getDemoList"] || false;

    return (
      <ConfigProvider locale={zhCN}>
        <Spin spinning={spinning}>
          <div className={styles.root}>
            <div>many components here... </div>
            <div>DemoPage</div>
          </div>
        </Spin>
      </ConfigProvider>
    );
  }
}

export default DemoPage;
```

### zz-model-normal

> maybe not the latest content, see `src/models/demo.js`

```javascript
// import { message } from 'antd';
import { getDemoList /* , methodNames */ } from "../services/demo";

const initData = {
  key: "value",
};

export default {
  namespace: "demo",
  state: {
    ...initData,
  },
  effects: {
    *getDemoList({ payload }, { call, put /* , select */ }) {
      // const model = yield select(state => state.demo);

      const resData = yield call(getDemoList, payload);

      const { errCode, data } = resData;
      if (errCode === 0) {
        yield put({
          type: "updateModel",
          payload: {
            data: data,
          },
        });
      }
      return resData;
    },
  },
  reducers: {
    updateModel: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    clearData: () => ({ ...initData }),
  },
  //subscriptions: {
  //	setup({ dispatch, history }) {
  //		return history.listen(({ pathname }) => {
  //			if( pathname && pathname === '/' ) {
  //				// do something when app init
  //				dispatch({
  //					type: '',
  //					payload: {}
  //				})
  //			}
  //		})
  //	}
  //}
};
```

### zz-service-normal

> maybe not the latest content, see `src/services/demo.js`

```javascript
import { post, get } from "@ali-whale/fetch-web";

export const getDemoList = data => get(`/path/${data}`);
export const update = data => post("/path", data);
```
