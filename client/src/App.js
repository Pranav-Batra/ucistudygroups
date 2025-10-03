import NewStudyGroup from "./forms/studyGroup/newStudyGroup";
function App() {
  return (
    <div className="App">
      <a href="http://localhost:3000/auth/google">
        Sign in With Google
      </a>
      <NewStudyGroup />
    </div>
  );
}

export default App;
