"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
    isNext: boolean;
    pageNumber: number;
    path: string;
}

function Pagination({
    isNext, pageNumber, path
}: Props) {

    const router = useRouter();

    const handleNavigation = (type: string) => {
        let nextPageNumber = pageNumber;

        if (type === 'prev') {
            nextPageNumber = Math.max(1, pageNumber - 1);
        } else if (type === 'next'){
            nextPageNumber = pageNumber + 1;
        }

        if (nextPageNumber > 1) {
            router.push(`/${path}?page=${nextPageNumber}`);
        } else {
            router.push(`/${path}`)
        }
    }

    if(!isNext && pageNumber === 1) return null;

    return (
        <div className="pagination">
            <Button
                className="!text-small-regular text-light-2"
                onClick={() => handleNavigation('prev')}
                disabled={pageNumber === 1}
            >
                Prev
            </Button>
            
            <p className="text-small-semibold text-light-1">
                {pageNumber}
            </p>

            <Button
                className="!text-small-regular text-light-2"
                onClick={() => handleNavigation('next')}
                disabled={!isNext}
            >
                Next
            </Button>

        </div>
    )
}

export default Pagination;
