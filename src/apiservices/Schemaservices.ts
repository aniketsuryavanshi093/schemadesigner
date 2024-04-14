import axiosInterceptorInstance from "@/http";
import { createHeader } from "@/utils/apiservice";

export const getSchemaDetailsAction = async (val: {
  id: string | string[];
  authToken: string;
}) => {
  return axiosInterceptorInstance.get(
    `/schema/get/${val.id}`,
    createHeader(val.authToken)
  );
};
