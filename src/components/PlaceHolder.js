import React from 'react';
import useGlobalContextProvider from '../ContextApi';

function PlaceHolder(props) {
  const { userObject } = useGlobalContextProvider();
  const { user, setUser } = userObject;

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="poppins flex-col gap-3 p-4 flex justify-center items-center">
      {/* Icon Container */}
      <img src="/emptyBox.png" alt="" width={130} height={130} />
      {/* Title */}
      <h2 className="text-2xl font-bold">Quizzes await! Make one.</h2>
      {/* Call To Action */}
      <span className="text-[13px] font-light">
        Click below to begin your journey here...
      </span>
      {/* button */}
      <button
        onClick={() => handleNavigation('/quiz-build')}
        className="p-3 px-4 text-white text-[12px] bg-green-700 rounded-md"
      >
        Create my first Quiz
      </button>
    </div>
  );
}

export default PlaceHolder;