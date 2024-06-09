import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-[1350px] m-auto p-4 flex justify-around min-h-[calc(100vh-280px)]">
      <Image
        src="/icons8-success-120.png"
        width={600}
        height={600}
        alt="payment success "
      />
      <p>Payment Suucess</p>
    </div>
  );
};

export default page;
