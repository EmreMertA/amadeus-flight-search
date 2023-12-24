import React, { useCallback, useEffect, useState } from 'react';

const Loading: React.FC = ({}) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <div
        className='
          flex
          justify-center
          items-center
          overflow-x-hidden
          overflow-y-auto
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          bg-neutral-800/70
    '
      >
        <div
          className='
          relative 
          w-full
          md:w-3/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto
        '
        >
          <div
            className={`transform duration-300 ${
              showModal
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-full'
            }`}
          >
            <div className='rounded-lg shadow-lg flex flex-col bg-white'>
              <div className='relative p-6 flex-auto'>Loading...</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
