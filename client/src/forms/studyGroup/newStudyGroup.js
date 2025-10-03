import React, { useState } from 'react';
import StepOne from './step1';
import StepTwo from './step2';

function NewStudyGroup() {
  const [professors, setProfessors] = useState([]);
  const [courseInfo, setCourseInfo] = useState({department: '', courseCode: ''})
  const [step, setStep] = useState(1);

  return (
    <div className="App">
      {step === 1 && (
        <StepOne
          setProfessors={setProfessors}
          setCourseInfo={setCourseInfo}
          goToNextStep={() => setStep(2)}
        />
      )}
      {step === 2 && <StepTwo professors={professors} courseInfo={courseInfo} />}
    </div>
  );
}

export default NewStudyGroup