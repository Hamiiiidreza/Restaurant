import React, { useContext, useEffect } from 'react'
import { useGetData } from '@/hooks/UseGetData'
import { getUserReviews, getProducts } from '@/Utils/Fetchs'
import containerContext from '@/Context/containerContext';
import { useQueryClient } from '@tanstack/react-query';

export default function Reviews({ userId }) {
    const queryClient = useQueryClient();
    const contextData = useContext(containerContext);
    const { data: userReviews = [], isLoading, refetch } = useGetData(['userReviews', userId],
        () => getUserReviews(contextData.userInfos?.id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['userReviews']);
            }
        }
    );

    const { data: products = [] } = useGetData(['products'],
        () => getProducts(),
        { staleTime: Infinity }
    );

    useEffect(() => {
        if (userId) refetch();
    }, [userId]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className='p-8 max-w-full overflow-x-hidden box-border'>
            <h2 className="text-2xl font-bold mb-6 px-2">نظرات شما</h2>
            <div className="space-y-4 mx-auto max-w-[calc(100vw-4rem)] w-full">
                {userReviews?.length === 0 ? (
                    <p className='text-gray-400 px-2'>هنوز نظری ثبت نکرده اید</p>
                ) : (
                    userReviews?.map(review => {
                        const relatedProduct = products.find(p => p.id === review.productId);
                        return (
                            <div
                                key={review.id}
                                className="bg-[#151B20] p-4 rounded-lg overflow-hidden box-border mx-2 max-w-[calc(100vw-4rem)]"
                            >
                                <div className="flex justify-between items-start mb-2 gap-2 flex-nowrap">
                                    <h3 className="font-semibold truncate flex-1 min-w-0 pr-2 text-ellipsis break-all line-clamp-2">
                                        محصول: {relatedProduct?.title || 'نامشخص'}
                                    </h3>
                                    <div className="flex gap-1 text-yellow-400 min-w-fit whitespace-nowrap shrink-0 pl-2 mt-1">
                                        {'★'.repeat(review.rating)}
                                        {'☆'.repeat(5 - review.rating)}
                                    </div>
                                </div>
                                <p className="text-gray-400 break-words px-1 hyphens-auto max-w-full text-justify">
                                    {review.comment}
                                </p>
                                <time className="text-sm text-gray-500 block mt-2 px-1">
                                    {new Date(review.date).toLocaleString('fa-IR')}
                                </time>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
