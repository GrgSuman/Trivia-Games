import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom';
import SelectAnswerCard from '../../components/SelectAnswerCard/SelectAnswerCard';
import {useQuiz} from '../../context/QuizContext/QuizContext'
import './QuizUserQuestions.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function QuizUserQuestions() {
    let { userQID } = useParams();
    const {getQuestionsFromUser} = useQuiz();
    let navigate = useNavigate();

    const[QNAByUser,setQNAByUser] = useState([])
    const[correctAnswerCount,setCorrectAnswerCount] = useState(0)
    const[totalClicked,setTotalClicked] = useState(0)
    const[userName,setUserName] = useState('')
    const[showQuiz,setShowQuiz] = useState(false)




    useEffect(()=>{
        async function getQNAUser(id){
            const qna = await getQuestionsFromUser(id)
            if (qna === "ERROR") {
                navigate('/error')
            }
            else{
                setQNAByUser(qna)
            }
        }
        getQNAUser(userQID)
    },[])

    useEffect(()=>{
       if(totalClicked>0 && totalClicked===QNAByUser.length){
           navigate('/report')
       }
    },[totalClicked])

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

  return (
    <div className='main'>
        <ToastContainer />
           {!showQuiz && <div className='get_user_name'>
                    <h2>What is your name?</h2>
                    <div className='qz_user_details'>
                        <form>
                        <input type="text" placeholder='Suman..' onChange={(e)=>{
                            setUserName(e.target.value)
                            }}/>
                        <button type='submit' onClick={validateName} className='qz_continue'>Let's Start</button>
                        </form>
                    </div>
            </div>}

        {showQuiz&&QNAByUser.map((x,index)=>{
            return (
                <div key={x.id}>
                    <SelectAnswerCard totalClicked={totalClicked} correctAnswerCount={correctAnswerCount} setTotalClicked={setTotalClicked} question={x.question} qsnNumber={index+1}  answers={x.answers} setCorrectAnswerCount={setCorrectAnswerCount}/>
                </div>
            )
        })
        }
    </div>
  )
}

export default QuizUserQuestions