const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-8 gap-2">
      <span className="size-3 animate-ping rounded-full bg-pop"></span>
      <span className="size-3 animate-ping rounded-full bg-pop [animation-delay:0.2s]"></span>
      <span className="size-3 animate-ping rounded-full bg-pop [animation-delay:0.4s]"></span>
    </div>
  );
};

export default LoadingSpinner;