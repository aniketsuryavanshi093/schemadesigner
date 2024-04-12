import axiosInterceptorInstance from "@/http";
import { createHeader } from "@/utils/apiservice";

export const getUserFoldersAction = async (val: { authToken: string }) => {
  return axiosInterceptorInstance.get(
    `/user/folders`,
    createHeader(val.authToken)
  );
};

export const getUserDetailsAction = async (val: string) => {
  return axiosInterceptorInstance.get(`/user/get`, createHeader(val));
};

export const getUserSchemaAction = async (val: string) => {
  return axiosInterceptorInstance.get(`/user/getdaigrams`, createHeader(val));
};

export const getUserFolderDetailsAction = async (val: {
  id: string;
  authToken: string;
}) => {
  return axiosInterceptorInstance.get(
    `/user/folder/${val.id}`,
    createHeader(val.authToken)
  );
};
