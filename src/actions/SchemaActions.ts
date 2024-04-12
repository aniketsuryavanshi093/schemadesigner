"use server";
import { Fetch } from "@/utils/apiservice";
import { getCurrentUser } from "@/utils/session";

export async function createNewDaigramaction(values: any) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await getCurrentUser();
      const loginres = await Fetch({
        method: "POST",
        data: values,
        url: "schema/create",
        token: user?.authToken,
      });
      resolve(loginres);
    } catch (error: any) {
      reject(error);
    }
  });
}

export async function createFolderAction(values: any) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await getCurrentUser();
      const loginres = await Fetch({
        method: "POST",
        data: values,
        url: "user/folder",
        token: user?.authToken,
      });
      resolve(loginres);
    } catch (error: any) {
      console.log("errior 😍😍😍😍", error);
      reject(error);
    }
  });
}

export async function MoveToFolderAction(values: any) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await getCurrentUser();
      const loginres = await Fetch({
        method: "POST",
        data: values,
        url: "schema/addfolder",
        token: user?.authToken,
      });
      resolve(loginres);
    } catch (error: any) {
      console.log("errior 😍😍😍😍", error);
      reject(error);
    }
  });
}

export async function DeleteSchemaAction(values: any) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await getCurrentUser();
      const loginres = await Fetch({
        method: "DELETE",
        url: `schema/delete/${values.schemaId}`,
        token: user?.authToken,
      });
      resolve(loginres);
    } catch (error: any) {
      console.log("errior 😍😍😍😍", error);
      reject(error);
    }
  });
}
