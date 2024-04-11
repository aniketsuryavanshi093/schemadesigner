import axiosInterceptorInstance from "@/http";
import { Fetch, createHeader, } from "@/utils/apiservice";

export const getUserFoldersAction = async (val: { authToken: string }) => {
    return axiosInterceptorInstance.get(
        `/user/folders`,
        createHeader(val.authToken)
    );
}

export const getUserDetailsAction = async (val: string) => {
    return axiosInterceptorInstance.get(
        `/user/get`,
        createHeader(val)
    );
}