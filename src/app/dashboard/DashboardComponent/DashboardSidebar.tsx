"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreateFolderModal from "./CreateFolderModal";
import { getUserFoldersAction } from "@/apiservices/userservices";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { FolderType } from "@/types";
import Image from "next/image";

const DashboardSidebar = () => {
  const router = usePathname();

  const [selected, setSelected] = React.useState<string>("");
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const { data } = useSession();
  const { data: userfolder, isLoading } = useQuery({
    queryFn: () => getUserFoldersAction({ authToken: data?.user?.authToken }),
    queryKey: ["userfolder"],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!data?.user?.authToken,
  });

  console.log(userfolder, isLoading);
  useEffect(() => {
    setSelected(router as string);
  }, [router]);

  const handleCreateFolder = async () => {
    setCreateFolderModal(true);
  };

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
        {userfolder?.data?.data?.map((elem: FolderType) => (
          <Link
            href={`/dashboard/folder/${elem._id}`}
            key={elem._id}
            className={`listitem flex ${window.location.pathname.split("/")[3] === elem._id &&
              "listitemselected"
              } items-center justify-start`}
          >
            <i className="fa-regular fa-folder-open"></i>
            {elem.name}
          </Link>
        ))}
        <button className={`listitem`} onClick={handleCreateFolder}>
          <Image height={22} width={22} src="/images/folder.svg" alt="seacrh" />
          Create Folders
        </button>
      </div>
      {createFolderModal && (
        <CreateFolderModal
          isOpen={createFolderModal}
          onClose={() => setCreateFolderModal(false)}
        />
      )}
    </aside>
  );
};

export default DashboardSidebar;
