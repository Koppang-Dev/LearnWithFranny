const LoadingSkeleton = () => {
  return (
    <div className="pl-20 pt-10 space-y-6 animate-pulse">
      <div className="h-8 w-1/4 bg-gray-200 rounded" />
      <div className="h-24 w-11/12 bg-gray-100 rounded" />
      <div className="h-60 w-11/12 bg-gray-100 rounded" />
    </div>
  );
};

export default LoadingSkeleton;
