import React,{useState,useEffect} from 'react'
import {useQuiz} from '../../context/QuizContext/QuizContext'
import {useNavigate,useParams} from 'react-router-dom';
import './QuizGame.css'
import QuestionAnswerCard from '../../components/QuestionAnswerCard/QuestionAnswerCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function QuizGame() {
    let { quizId } = useParams();
    const {getQuizQuestionAndAnswers,isQuizFormLoading,postUserQNA} = useQuiz();

    //take user name
    const[userName,setUserName] = useState('')
    const[showQuiz,setShowQuiz] = useState(false)
    const[qsnCount,setQsnCount] = useState(0)
    const[gender,setGender] = useState('Male')

    //this is for collectin all question and answers answered by user
    const[selectedQNA,setSelectedQNA] = useState([])

    let navigate = useNavigate();

    useEffect(()=>{
        async function getQNA(){
            const qna = await getQuizQuestionAndAnswers(quizId)
            if (qna === "ERROR") {
                navigate('/error')
            }
            else{
                setSelectedQNA(qna.questions.map(x=>{
                    return{
                        question:x.question,
                        color:x.color,
                        isSelected:false,
                        answers:x.answers,
                        user: x.user
                    }

                }))
            }
        }
        getQNA()
    },[])

    useEffect(()=>{
       console.log(selectedQNA)
    },[selectedQNA])

    const validateName = (e)=>{
        e.preventDefault()
         if(userName===""){
            toast.error("Your name is required !", {
                position: toast.POSITION.BOTTOM_RIGHT
              });
         }
         else{
             setShowQuiz(true)
         }
    }

    const saveUserAndQNA=async()=>{

        if(qsnCount!==5){
            toast.error("Please answer all questions !", {
                position: toast.POSITION.TOP_RIGHT
              });
        }
        else{
            const data = selectedQNA.filter(x=>x.isSelected===true)
            const userdata = {
                "user":userName,
                "category":quizId,
                "gender":gender,
                "questions": data
            }
            const res = await postUserQNA(userdata)
            if (res === "ERROR") {
                navigate('/error')
            }
            else{
                navigate('/'+res.linkID)
            }
        }


    }

  return (
    <div className='main'>
        <ToastContainer />
        {
            !showQuiz && (
                <div className='get_user_name'>
                    <h2>What is your name?</h2>
                    <div className='qz_user_details'>
                        <form>
                        <input type="text" placeholder='Suman..' onChange={(e)=>{
                            setUserName(e.target.value)
                            }}/>
                        <button type='submit' onClick={validateName} className='qz_continue'>Let's Start</button>
                        </form>
                    </div>
                </div>
            )
        }
      

        {
            showQuiz && (
                <>
                <div className='questions'>
                 {userName && selectedQNA.map((question,index)=> question.user===null && <QuestionAnswerCard qsnCount={qsnCount} setQsnCount={setQsnCount} selectedQNA={selectedQNA} setSelectedQNA={setSelectedQNA}  key={index} qsnNumber={index+1} question={question.question} answers={question.answers}/>)}
                </div>

                {/* <p className="moreQuestions">Add Question</p> */}
                {!isQuizFormLoading?<p className="submitQNA" onClick={saveUserAndQNA}>Submit</p>:<p className="submitQNA">Please wait..</p>}
                
                </>
            )
       
        }

    </div>
  )}

export default QuizGame