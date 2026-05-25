const ErrorParagraph = ({ message = "An unexpected error occurred." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center gap-3">
      {/* Alert Triangle SVG using our custom button color */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-12 w-12 text-button animate-pulse" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-800 barlow-condensed-regular">
          Oops! Something went wrong.
        </h3>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          {/* If the API throws a specific error, it prints here. 
            Otherwise, it falls back to the default message. 
          */}
          {message}
        </p>
      </div>
    </div>
  );
};

export default ErrorParagraph;