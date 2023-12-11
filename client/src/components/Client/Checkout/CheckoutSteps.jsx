import React from 'react';

const CheckoutSteps = ({ active }) => {
  console.log(active);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
        {/* Step 1: Shipping */}
        <div className="flex items-center">
          <div className="px-[20px] h-[38px] rounded-[20px] bg-[#f63b60] flex items-center justify-center cursor-pointer">
            <span className="text-[#fff] text-[16px] font-[600]">1. Shipping</span>
          </div>
          <div className={`w-[30px] 800px:w-[70px] h-[4px] ${active > 1 ? 'bg-[#f63b60]' : 'bg-[#FDE1E6]'}`} />
        </div>

        {/* Step 2: Payment */}
        <div className="flex items-center">
          <div className={`px-[20px] h-[38px] rounded-[20px] bg-[#f63b60] flex items-center justify-center cursor-pointer ${active > 1 ? '' : 'bg-[#FDE1E6]'}`}>
            <span className={`text-[#fff] text-[16px] font-[600] ${active > 1 ? '' : 'text-[#f63b60]'}`}>2. Payment</span>
          </div>
        </div>

        {/* Step 3: Success */}
        <div className="flex items-center">
          <div className={`w-[30px] 800px:w-[70px] h-[4px] ${active > 3 ? 'bg-[#f63b60]' : 'bg-[#FDE1E6]'}`} />
          <div className={`px-[20px] h-[38px] rounded-[20px] bg-[#f63b60] flex items-center justify-center cursor-pointer ${active > 2 ? '' : 'bg-[#FDE1E6]'}`}>
            <span className={`text-[#fff] text-[16px] font-[600] ${active > 2 ? '' : 'text-[#f63b60]'}`}>3. Success</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
