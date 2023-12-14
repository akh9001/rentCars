import React from 'react';

const CheckoutSteps = ({ active }) => {
  console.log(active);

  return (
    <div className="flex justify-center items-center mx-auto">
      <div className="w-[90%] 800px:w-[50%] justify-center flex items-center flex-wrap mx-auto">
          {/* Step 1: Shipping */}
          <div className="flex items-center">
          <div className="px-[20px] h-[38px] rounded-[20px] bg-[#000] flex items-center justify-center cursor-pointer">
            <span className="text-[#fff] text-[16px] font-[600]">1. Booking</span>
          </div>
          <div className={`w-[30px] 800px:w-[70px] h-[4px] ${active >= 1 ? 'bg-[#000]' : 'bg-[#D5D5D5D5]'}`} />
        </div>

        {/* Step 1: Shipping */}
        <div className="flex items-center">
        <div className={`px-[20px] h-[38px] rounded-[20px] bg-[#000] flex items-center justify-center cursor-pointer ${active >= 1 ? '' : 'bg-[#D5D5D5D5]'}`}>
            <span className={`text-[#fff] text-[16px] font-[600] ${active >= 1 ? '' : 'text-[#000]'}`}>2. Shipping</span>
          </div>
          <div className={`w-[30px] 800px:w-[70px] h-[4px] ${active >= 2 ? 'bg-[#000]' : 'bg-[#D5D5D5D5]'}`} />
        </div>

        {/* Step 2: Payment */}
        <div className="flex items-center">
          <div className={`px-[20px] h-[38px] rounded-[20px] bg-[#000] flex items-center justify-center cursor-pointer ${active >= 2 ? '' : 'bg-[#D5D5D5D5]'}`}>
            <span className={`text-[#fff] text-[16px] font-[600] ${active >= 2 ? '' : 'text-[#000]'}`}>3. Payment</span>
          </div>
        </div>

        {/* Step 3: Success */}
        <div className="flex items-center">
          <div className={`w-[30px] 800px:w-[70px] h-[4px] ${active > 4 ? 'bg-[#000]' : 'bg-[#D5D5D5D5]'}`} />
          <div className={`px-[20px] h-[38px] rounded-[20px] bg-[#000] flex items-center justify-center cursor-pointer ${active > 4 ? '' : 'bg-[#D5D5D5D5]'}`}>
            <span className={`text-[#fff] text-[16px] font-[600] ${active > 4 ? '' : 'text-[#000]'}`}>4. Success</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
