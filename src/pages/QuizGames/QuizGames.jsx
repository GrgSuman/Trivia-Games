import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useQuiz} from '../../context/QuizContext/QuizContext'
import './QuizGames.css'

function QuizGames() {
    const {isGetCategoryLoading,allQuizCategories,getAllQuizCategories} = useQuiz();

    useEffect(()=>{
        getAllQuizCategories()
    },[])
  
  return (
    <div>
       {isGetCategoryLoading?<h1>Loading Categories</h1>:
       allQuizCategories.map((x)=>{
           return(
               <div key={x.id}>
                  <Link to={`/quiz/${x.slug}/${x.id}/`}> <img src={x.image} alt="category" height={100} width={100}/> </Link>
                  <Link to={`/quiz/${x.slug}/${x.id}/`}> {x.name} </Link>
               </div>
           )
       })
       } 
    </div>
  )
}

export default QuizGames