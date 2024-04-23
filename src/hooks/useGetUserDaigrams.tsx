import { getUserSchemaAction } from '@/apiservices/userservices';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const useGetUserDaigrams = (filterValue: string = 'LastCreatedAt') => {
    const { data, } = useSession();
    const { data: userSchema, isLoading } = useQuery({
        queryFn: () => getUserSchemaAction(data?.user?.authToken, filterValue),
        queryKey: ["userSchemas", filterValue],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!data?.user?.authToken,
        staleTime: 10 * 60 * 5,
    });
    return (
        {
            userSchema, isLoading
        }
    )
}

export default useGetUserDaigrams