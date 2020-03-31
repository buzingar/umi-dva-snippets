import { post, get } from "@ali-whale/fetch-web";

export const getDemoList = data => get(`/path/${data}`);
export const update = data => post("/path", data);
