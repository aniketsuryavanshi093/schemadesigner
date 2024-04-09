import { Fetch, } from "@/utils/apiservice";

export const getUserFoldersAction = async (val: { authToken: string }) => {
    console.log(val.authToken);
    return Fetch({
        token: val?.authToken,
        method: "GET",
        url: "user/folder"
    })
    // return axiosInterceptorInstance.get(
    //     `/user/folder`,
    //     createHeader(val.authToken)
    // );
}