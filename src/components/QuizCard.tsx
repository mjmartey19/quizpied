import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlay } from '@fortawesome/free-solid-svg-icons';
import useGlobalContextProvider from './../ContextApi';
import convertToFaIcons from './contents/convertToFaIcons';



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

function successRate(singleQuiz: Quiz) {
  let correctQuestions = 0;
  let totalAttempts = 0;
  let successRate = 0;

  singleQuiz.quizQuestions.forEach((question) => {
    totalAttempts += question.statistics.totalAttempts;
    correctQuestions += question.statistics.correctAttempts;
  });

  successRate = Math.ceil((correctQuestions / totalAttempts) * 100);
  return successRate;
}

interface QuizCardProps {
  singleQuiz: Quiz;
}

function QuizCard({ singleQuiz }: QuizCardProps) {
  const {
    quizToStartObject,
    dropDownToggleObject,
    threeDotsPositionsObject,
    selectedQuizObject,
  } = useGlobalContextProvider();
  const { setDropDownToggle } = dropDownToggleObject;
  const { setSelectQuizToStart } = quizToStartObject;
  const { setThreeDotsPositions } = threeDotsPositionsObject;
  const { setSelectedQuiz } = selectedQuizObject;

  const { quizTitle, quizQuestions, icon, status } = singleQuiz;

  const totalQuestions = quizQuestions.length;
  const globalSuccessRate = successRate(singleQuiz);

  function openDropDownMenu(event: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    const xPos = event.clientX;
    const yPos = event.clientY;

    setThreeDotsPositions({ x: xPos, y: yPos });

    if (event) {
      event.stopPropagation();
    }

    setDropDownToggle(true);
    setSelectedQuiz(singleQuiz);
  
  }

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="rounded-[10px] flex flex-col border border-stroke w-[230px] overflow-hidden pb-2">
      {/* Image Container */}
      <div className="relative  w-full h-32 flex justify-center items-center bg-violet-100">
        {/* More Options Icon */}
        <div className="absolute cursor-pointer top-2 right-2">
          <FontAwesomeIcon
            className="text-black"
            height={13}
            width={13}
            icon={faEllipsisVertical}
            onClick={openDropDownMenu}
          />
        </div>
        {/* Quiz Icon */}
        <FontAwesomeIcon
          className="text-primary text-6xl"
          width={120}
          height={120}
          icon={convertToFaIcons(icon)}
        />
      </div>
     <div className='p-5'>
        {/* Title Area */}
      <h3 className="font-bold">{quizTitle}</h3>
        {/* Questions */}
      <div className='flex justify-between items-center'>
        <p className="text-sm font-light">{totalQuestions} question(s)</p>
        <span
            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs font-medium ${
              status === "Active"
                ? "bg-success text-success"
                : status === "inactive"
                ? "bg-danger text-danger"
                : "bg-warning text-warning"
            }`}
          >
            {status}
          </span>
      </div>
    </div>
    </div>
  );
}

export default QuizCard;
