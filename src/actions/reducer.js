import { ADD_ACCESS_TOKEN } from "./actions";

export const accessToken = (state = null, action) => {
  if (action.type === ADD_ACCESS_TOKEN) {
    return action.payload;
  }
  return state;
};
