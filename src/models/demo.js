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
