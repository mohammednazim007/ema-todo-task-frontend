import { baseApi } from "./api/baseApi";

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
};
export default rootReducer;
