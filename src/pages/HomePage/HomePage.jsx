import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useQuiz} from '../../context/QuizContext/QuizContext'
import './HomePage.css'

function HomePage() {

  const {isGetCategoryLoading,allQuizCategories,getAllQuizCategories} = useQuiz();

  useEffect(()=>{
      getAllQuizCategories()
  },[])

  return (
    <div>
      <h2 className='title_tag'>Popular Quizes</h2>
      {isGetCategoryLoading?<div className='loading__'>
      <div className="spinner-box">
        <div className="circle-border">
          <div className="circle-core"></div>
        </div>  
      </div>
        </div>:
       <div className="list_quizes">
           {allQuizCategories.map((x)=>{
           return(
               <div key={x.id} className="category_card">
                 <section>
                    <Link to={`/quiz/${x.slug}/${x.id}/`}><img  src={x.image} alt="category"/> </Link>
                    <Link to={`/quiz/${x.slug}/${x.id}/`} className="category_link"> <h2 style={{fontWeight:500}}>{x.name}</h2> </Link>
                    <Link to={`/quiz/${x.slug}/${x.id}/`} className="category_link start_"> Start Quiz </Link>
                 </section>
                  
               </div>
           )
       })}
       </div>
       } 
    </div>
  )
}

export default HomePage