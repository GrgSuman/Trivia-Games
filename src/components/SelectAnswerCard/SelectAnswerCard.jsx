import React,{useState} from 'react'
import "./SelectAnswerCard.css"

function SelectAnswerCard({totalClicked,setTotalClicked,question,qsnNumber,answers,correctAnswerCount,setCorrectAnswerCount}) {
  const[answer,setAnswer] = useState(null)
  const[answerSelected,setAnswerSeleted] = useState(false)

  const setUserAnser=(value,i)=>{
    if(!answerSelected){
      setAnswer(i)
      setTotalClicked(totalClicked+1)
      if(value.isCorrectAnswer){
        setCorrectAnswerCount(correctAnswerCount+1)
      }
      setAnswerSeleted(true)
    }
  }


  return (
    <div className='questions_border'>
    <h2 className='qac_title_2'>{qsnNumber}. {question}</h2>
    <div className="sac_select_answer">
          {answers.map((x,i)=>{
            return(
                <div key={i} style={{background:answerSelected&&x.isCorrectAnswer?"#29c369":null,color:answerSelected&&x.isCorrectAnswer?"white":null}} className={answer===i ?"sac_ans_card sac_ans_active":"sac_ans_card"} onClick={()=>setUserAnser(x,i)}>
                     <p>{x.answer}</p>    
                </div>
            )
        })}
    </div>
    </div>
  )
}

export default SelectAnswerCard