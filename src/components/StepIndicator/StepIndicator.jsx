// src/components/StepIndicator.jsx
import React from 'react';

const StepIndicator = ({ currentStep }) => {
    const steps = [
        { id: 1, title: 'انتخاب میز و زمان' },
        { id: 2, title: 'سبد رزرو' },
        { id: 3, title: 'پرداخت' },
        { id: 4, title: 'مشاهده رزروها' },
    ];

    return (
        <div className="step-indicator bg-[#1a1e24] p-4 rounded-lg mb-6">
            <div className="flex justify-between relative">
                {/* خط اتصال مراحل */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-600 -translate-y-1/2 z-0"></div>

                {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center z-10">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step.id
                                    ? 'bg-orange-250 text-white'
                                    : 'bg-gray-700 text-gray-400'
                                }`}
                        >
                            {step.id}
                        </div>
                        <span
                            className={`mt-2 text-sm ${currentStep >= step.id
                                    ? 'text-orange-250 font-medium'
                                    : 'text-gray-400'
                                }`}
                        >
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepIndicator;