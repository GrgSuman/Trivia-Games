import './App.css';
import QuizContextProvider from './context/QuizContext/QuizContext';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <div className="App">
        <QuizContextProvider>
          <AllRoutes/>
        </QuizContextProvider>
    </div>
  );
}

export default App;
