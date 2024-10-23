import Image from 'next/image';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="flex flex-col items-center">
        <Image
          src="/images/logo-msb.png"
          alt="MSB Logo"
          width={150}
          height={150}
          className="animate-pulse"
        />
        <div className="mt-4 w-12 h-12 border-4 border-blue-400 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;