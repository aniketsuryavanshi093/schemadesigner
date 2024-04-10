import axiosInterceptorInstance from "@/http";
import { Fetch, createHeader, } from "@/utils/apiservice";

export const getUserFoldersAction = async (val: { authToken: string }) => {
    console.log(val.authToken);

    return axiosInterceptorInstance.get(
        `/user/folders`,
        createHeader(val.authToken)
    );
}