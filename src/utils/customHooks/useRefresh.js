import { useDispatch } from "react-redux";

const useRefresh = (refresh) => {
  const dispatch = useDispatch();

  const refreshFunc = () => {
    return dispatch(refresh());
  };

  return refreshFunc;
};

export default useRefresh;
