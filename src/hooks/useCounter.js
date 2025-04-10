import React, { useState } from 'react'

export default function useCounter(init) {
    const [counts, setCounts] = useState(init)

    const addCount = (id) => {
        setCounts(prevCounts => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 1) + 1
        }));
    };

    const minusCount = (id) => {
        setCounts(prevCounts => ({
            ...prevCounts,
            [id]: Math.max((prevCounts[id] || 1) - 1,
                1)
        }));
    };

    return [counts, addCount, minusCount]
}
