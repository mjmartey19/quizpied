import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { quizzesData } from './components/contents/QuizzesData';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

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

interface User {
  name: string;
  isLogged: boolean;
  experience: number;
}

interface GlobalContextProps {
  allQuizzes: Quiz[];
  setAllQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  quizToStartObject: {
    selectQuizToStart: Quiz | null;
    setSelectQuizToStart: React.Dispatch<React.SetStateAction<Quiz | null>>;
  };
  userObject: {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
  };
  openBoxToggle: {
    openIconBox: boolean;
    setOpenIconBox: React.Dispatch<React.SetStateAction<boolean>>;
  };
  selectedIconObject: {
    selectedIcon: { faIcon: any }; // specify the correct type for icons if available
    setSelectedIcon: React.Dispatch<React.SetStateAction<{ faIcon: any }>>;
  };
  dropDownToggleObject: {
    dropDownToggle: boolean;
    setDropDownToggle: React.Dispatch<React.SetStateAction<boolean>>;
  };
  threeDotsPositionsObject: {
    threeDotsPositions: { x: number; y: number };
    setThreeDotsPositions: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  };
  selectedQuizObject: {
    selectedQuiz: Quiz | null;
    setSelectedQuiz: React.Dispatch<React.SetStateAction<Quiz | null>>;
  };
  userXpObject: {
    userXP: number;
    setUserXP: React.Dispatch<React.SetStateAction<number>>;
  };
  isLoadingObject: {
    isLoading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>(quizzesData);
  const [selectQuizToStart, setSelectQuizToStart] = useState<Quiz | null>(null);
  const [user, setUser] = useState<User>({
    name: 'quizUser',
    isLogged: true,
    experience: 0,
  });
  const [openIconBox, setOpenIconBox] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedIcon, setSelectedIcon] = useState({ faIcon: faDoorOpen });
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [threeDotsPositions, setThreeDotsPositions] = useState({ x: 0, y: 0 });
  const [isLoading, setLoading] = useState(false);
  const [userXP, setUserXP] = useState(0);

  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      experience: userXP,
    }));
  }, [userXP]);

  useEffect(() => {
    if (selectedQuiz) {
      setSelectedIcon({ faIcon: selectedQuiz.icon });
    } else {
      setSelectedIcon({ faIcon: faDoorOpen });
    }
  }, [selectedQuiz]);

  return (
    <GlobalContext.Provider
      value={{
        allQuizzes,
        setAllQuizzes,
        quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
        userObject: { user, setUser },
        openBoxToggle: { openIconBox, setOpenIconBox },
        selectedIconObject: { selectedIcon, setSelectedIcon },
        dropDownToggleObject: { dropDownToggle, setDropDownToggle },
        threeDotsPositionsObject: { threeDotsPositions, setThreeDotsPositions },
        selectedQuizObject: { selectedQuiz, setSelectedQuiz },
        userXpObject: { userXP, setUserXP },
        isLoadingObject: { isLoading, setLoading },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalContextProvider() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContextProvider must be used within a ContextProvider');
  }
  return context;
}
