"use server";

import { FormSignupvalueType } from "@/types";
import { Fetch } from "@/utils/apiservice";

export async function handleAuthSubmit(
  values: FormSignupvalueType | null,
  type: string,
  submittype: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      if (submittype === "signup") {
        if (type === "credentials") {
          const res = await Fetch({
            url: "user/create",
            method: "post",
            data: values,
          });
          console.log("user create 🙌🙌🙌🙌🙌🙌🙌", res);
          resolve(res);
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
