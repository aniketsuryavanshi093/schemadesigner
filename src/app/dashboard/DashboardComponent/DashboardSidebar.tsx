"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, } from "react";
import CreateFolderModal from "./CreateFolderModal";
import { getUserFoldersAction } from "@/apiservices/userservices";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Fetch } from "@/utils/apiservice";

const DashboardSidebar = () => {
  const router = usePathname();
  const [selected, setSelected] = React.useState<string>("");
  const [createFolderModal, setCreateFolderModal] = useState(false)
  const { data } = useSession()
  console.log(data);

  // const { data: userfolder, isLoading } = useQuery({
  //   queryFn: () => getUserFoldersAction({ authToken: data?.user?.authToken }),
  //   queryKey: ['userfolder'],
  //   enabled: !!data?.user?.authToken
  // })

  const getFontOverridead = async () => {
    try {
      const res = await Fetch({
        token: data?.user?.authToken,
        method: "GET",
        url: "user/folder"
      })
      console.log(res);

    } catch (error) {
      console.log(error);

    }

  }
  useEffect(() => {
    getFontOverridead()
  }, [data])

  // console.log(userfolder, isLoading);

  useEffect(() => {
    setSelected(router as string);
  }, [router]);

  const handleCreateFolder = async () => {
    setCreateFolderModal(true)
  }
  return (
    <aside className="pb-8 pt-6 lg:col-span-3">
      {/* user profile with name */}
      <div className="listwrapper">
        <Link
          href="/dashboard"
          prefetch={false}
          className={`listitem ${selected === "/dashboard" && "listitemselected"
            } `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
            ></path>
          </svg>
          My Daigrams
        </Link>
        <Link
          prefetch={false}
          href="/dashboard/favourites"
          className={`listitem ${selected === "/dashboard/favourites" && "listitemselected"
            } `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            ></path>
          </svg>
          My Favorites
        </Link>
        <button className={`listitem`} onClick={handleCreateFolder}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            ></path>
          </svg>
          Create Folders
        </button>
      </div>
      {
        createFolderModal && (
          <CreateFolderModal isOpen={createFolderModal} onClose={() => setCreateFolderModal(false)} />
        )
      }
    </aside>
  );
};

export default DashboardSidebar;
