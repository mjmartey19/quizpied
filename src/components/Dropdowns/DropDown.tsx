import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import useGlobalContextProvider from './../../ContextApi'; 

const handleNavigation = (path: string) => {
    window.location.href = path;
};

interface Quiz {
    id: number;
    icon: any;
    quizTitle: string;
    status: string;
    quizQuestions: Question[];
  }
  
  interface Question {
    id: number;
    mainQuestion: string;
    choices: string[];
    correctAnswer: number;
    answeredResult: number;
    statistics: {
      totalAttempts: number;
      correctAttempts: number;
      incorrectAttempts: number;
    };
  }

interface MenuItem {
    name: string;
    icon: IconDefinition;
}

const DropDown: React.FC = () => {
  const {
    dropDownToggleObject,
    threeDotsPositionsObject,
    selectedQuizObject,
    allQuizzes,
    setAllQuizzes,
  } = useGlobalContextProvider();
  const { dropDownToggle, setDropDownToggle } = dropDownToggleObject;
  const { threeDotsPositions } = threeDotsPositionsObject;
  const { selectedQuiz, setSelectedQuiz } = selectedQuizObject;
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { name: 'Edit', icon: faPencil },
    { name: 'Delete', icon: faTrash },
  ];

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        if (!isDialogOpened) {
          setSelectedQuiz(null);
        }
        setDropDownToggle(false);
      }
    }
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropDownToggle, isDialogOpened, setSelectedQuiz, setDropDownToggle]);

  async function deleteTheQuiz() {
    const updatedAllQuizzes = allQuizzes.filter((quiz: Quiz) => quiz.id !== selectedQuiz?.id);

    const res = await fetch(
      `http://localhost:3000/api/quizzes?id=${selectedQuiz?.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      toast.error('Error while deleting the quiz');
      return;
    }

    setAllQuizzes(updatedAllQuizzes);
    toast.success('The Quiz has been deleted successfully.');
    setIsDialogOpened(false);
    setSelectedQuiz(null);
  }

  function handleClickedItem(menuItem: MenuItem) {
    if (menuItem.name === 'Edit') {
        handleNavigation('/quiz-build');
    }

    if (menuItem.name === 'Delete') {
      setIsDialogOpened(true);
      toast(
        (t) => (
          <div className="flex flex-col gap-4">
            <div>
              Do you really want to delete ({selectedQuiz?.quizTitle}) Quiz?
            </div>
            <div className="w-full flex gap-3 justify-center">
              <button
                onClick={() => {
                  deleteTheQuiz();
                  toast.dismiss(t.id);
                }}
                className="bg-primary text-white p-1 w-[100px] rounded-md"
              >
                Yes
              </button>
              <button
                className="bg-white text-primary p-1 w-[100px] border rounded-md hover:text-white hover:bg-primary"
                onClick={() => {
                  toast.dismiss(t.id);
                }}
              >
                No
              </button>
            </div>
          </div>
        ),
        {
          duration: 10000,
          id: 'deleteQuiz',
        },
      );
    }

    setDropDownToggle(false);
  }

  return (
    <div
      style={{ left: threeDotsPositions.x, top: threeDotsPositions.y }}
      ref={dropDownRef}
      className={`p-4 w-32 fixed z-50 shadow-md flex rounded-lg flex-col gap-3 bg-white dark:bg-black 
      poppins poppins-light text-[13px] ${dropDownToggle ? 'visible' : 'invisible'}`}
    >
      {menuItems.map((menuItem, index) => (
        <div
          onClick={() => handleClickedItem(menuItem)}
          key={index}
          className="flex gap-2 items-center border text-primary border-gray-200 rounded-md p-3 select-none cursor-pointer hover:text-white hover:bg-primary dark:border-strokedark dark:hover:bg-meta-4 dark:text-meta-4 dark:hover:text-white"
        >
          <FontAwesomeIcon className="size-4" icon={menuItem.icon} />
          <div>{menuItem.name}</div>
        </div>
      ))}
    </div>
  );
}

export default DropDown;
