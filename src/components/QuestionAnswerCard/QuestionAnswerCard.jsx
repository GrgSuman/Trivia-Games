import React,{useState} from 'react'
import './QuestionAnswerCard.css'

function QuestionAnswerCard({qsnCount,setQsnCount,selectedQNA,setSelectedQNA,qsnNumber,question,answers}) {

    const[answer,setAnswer] = useState(null)

    const setAnswerToQuestion=(ans,id,ansId)=>{
        setAnswer(id)
        answer===null && setQsnCount(qsnCount+1)
        setSelectedQNA(selectedQNA.map(x=>{
            if(x.question===question && x.user===null){
                x.isSelected = true
                x.answers.map(y=>{
                    if(y.id===ansId){
                        y.isCorrectAnswer = true
                        return y
                    }
                    else{
                        y.isCorrectAnswer = false
                        return y
                    }
                })
                return x
            }
            else{
             return x
            }

        })
        )
    }

    const modifySelectAnswer=(newValue,ansId)=>{
        setSelectedQNA(selectedQNA.map(x=>{
            if(x.question===question && x.user===null){
                x.isSelected = true
                x.answers.map(y=>{
                    if(y.id===ansId){
                        y.answer = newValue
                        return y
                    }
                    else{
                        return y
                    }
                })
                return x
            }
            else{
             return x
            }

        })
        )
    }

  return (
    <div className='questions_border'>
    <h2 className='qac_title_2'>{qsnNumber}. {question}</h2>
    <div className="qac_answers">
          {answers.map((x,i)=>{
            return(
                <div key={i} >
                     <input className={answer===i?"qac_ans_card qac_ans_active":"qac_ans_card"} type="text" onClick={()=>setAnswerToQuestion(x.answer,i,x.id)} onChange={(e)=>modifySelectAnswer(e.target.value,x.id)} value={x.answer}/>    
                </div>
            )
        })}
    </div>
    </div>
  )
}

export default QuestionAnswerCard

