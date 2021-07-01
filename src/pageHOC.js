import { withRedux } from "./store/withRedux.js";

export const PageHOC = (WrappedComponent) => {
  return withRedux(WrappedComponent);
};
