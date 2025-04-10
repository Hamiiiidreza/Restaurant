import React from 'react'

const StarRating = ({ rating, setRating, readonly = false }) => {
    const fullStars = Math.floor(rating);
    const partialStar = rating % 1;

    return (
        <div className="flex gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
                <button
                    key={i}
                    type="button"
                    onClick={() => !readonly && setRating(i + 1)}
                    className={`text - 2xl ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
                    disabled={readonly}
                >
                    {i < fullStars ? '★' :
                        i === fullStars && partialStar > 0 ? (
                            <div style={{ position: 'relative', width: '1em' }}>
                                <div style={`{ width: ${partialStar * 100}%, overflow: 'hidden' }`}>
                                    ★
                                </div>
                                ☆
                            </div>
                        ) : '☆'
                    }
                </button >
            ))}
        </div >
    );
};

export default StarRating;
