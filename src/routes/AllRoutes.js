import React from 'react'
import {Routes,Route} from "react-router-dom";
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import QuizGames from '../pages/QuizGames/QuizGames';
import QuizGame from '../pages/QuizGame/QuizGame';
import ShowLink from '../pages/ShowLink/ShowLink';
import QuizUserQuestions from '../pages/QuizUserQuestions/QuizUserQuestions';
import HomePage from '../pages/HomePage/HomePage';
import Header from '../layout/Header/Header';

function AllRoutes() {
  return (
    <div>
    <Header/>
    <div className='main_container'>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/games" element={<QuizGames/>}/>
          <Route path="/quiz/:quizSlug/:quizId" element={<QuizGame/>}/>
          <Route path="/:quizId" element={<ShowLink/>}/>
          <Route path="answer/:userQID" element={<QuizUserQuestions/>}/>
          <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
    </div>
  )
}

export default AllRoutes