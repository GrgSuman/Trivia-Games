import React,{useState,useEffect,useContext, createContext} from 'react'
import instance from '../../utils/axiosRequest'
import Endpoint from '../../utils/endpoint'

const QuizContext = createContext();
export const useQuiz = () => useContext(QuizContext);

const QuizContextProvider = ({children})=>{

    const[userInfo,setUserInfo] = useState(null)

    useEffect(()=>{
        // getUserFromLS() && getUser(getUserFromLS())
    },[])

    useEffect(()=>{
       console.log(userInfo)
    },[userInfo])

    async function getUser(id){

        try{
            const res = await instance.get(Endpoint.QUIZ_USER+id)
            if(res?.status===200&&res?.data){
                setUserInfo(res.data)
                console.log("ALL User Details of Localstorage")
                console.log(res.data)
            }
        }
        catch(e){
            console.log(e)
        }
    }


    //all states for quiz
    const[allQuizCategories,setAllQuizCategories] = useState([])

    //loading indicators
    const[isGetCategoryLoading,setIsGetCategoryLoading] = useState(false)
    const[isQuizFormLoading,setIsQuizFormLoading] = useState(false)


    const setUserToLS=(value)=>{
        localStorage.setItem('rc_id_',value)
    }

    const getUserFromLS=()=>{
       const user = localStorage.getItem('rc_id_')
       return JSON.parse(user)
    }


    const getAllQuizCategories = async() =>{

        try{
            console.log(Endpoint.QUIZ_CATEGORY)
            setIsGetCategoryLoading(true)
            const res = await instance.get(Endpoint.QUIZ_CATEGORY)
            if(res?.status===200&&res?.data){
                setAllQuizCategories(res.data)
                console.log("ALL QUIZ CCATEGORIES")
                console.log(res.data)
            }
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsGetCategoryLoading(false)
        }
       
    }

    const getQuizQuestionAndAnswers = async(id) =>{

        try{
            console.log(`${Endpoint.QUIZ_CATEGORY}/${id}/`)
            const res = await instance.get(`${Endpoint.QUIZ_CATEGORY}${id}/`)
            if(res?.status===200&&res?.data){
                console.log("QUIZ QUESTION AND ANSWERS")
                console.log(res.data)
                return res.data
            }
        }
        catch(e){
            console.log("CATCH ERROR")
            console.log(e.response?.data?.detail)
            return "ERROR"
        }
    }

    const postUserQNA =async (values) =>{
        setIsQuizFormLoading(true)
        try{
            console.log(`${Endpoint.QUIZ_USER_QNA}`)
            console.log(values)
            const res = await instance.post(Endpoint.QUIZ_USER_QNA,values)
            if(res?.status===200&&res?.data){
                console.log("QUIZ USER QNA CREATED")
                console.log(res.data)
                // setUserToLS(res.data.id)
                // setUserInfo(res.data)
                return res.data
            }
        }
        catch(e){
            console.log("CATCH ERROR")
            console.log(e)
            console.log(e.response?.data?.detail)
            return "ERROR"
        }
        finally{
            setIsQuizFormLoading(false)
        }

    }

    //get questions of user by link id
    const getQuestionsFromUser = async(id) =>{

        try{
            console.log(`${Endpoint.QUIZ_USER_QUESTIONS}/${id}/`)
            const res = await instance.get(`${Endpoint.QUIZ_USER_QUESTIONS}${id}/`)
            if(res?.status===200&&res?.data){
                console.log("QUIZ QUESTION AND ANSWERS")
                console.log(res.data)
                return res.data
            }
        }
        catch(e){
            console.log("CATCH ERROR")
            console.log(e.response?.data?.detail)
            return "ERROR"
        }
    }


    // userQNA

    const value = {
        //quiz state values
        allQuizCategories,
        getAllQuizCategories,
        getQuizQuestionAndAnswers,
        postUserQNA,
        getQuestionsFromUser,

        //quiz loading state values
        isGetCategoryLoading,
        isQuizFormLoading,
    }
    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export default QuizContextProvider