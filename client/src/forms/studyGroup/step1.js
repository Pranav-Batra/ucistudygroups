import React, { useState } from "react";
import "../../styles/StepOne.css";

function StepOne({ setProfessors, setCourseInfo, goToNextStep }) {
    const [department, setDepartment] = useState("");
    const [courseCode, setCourseCode] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Department: ", department);
        console.log("Coursecode: ", courseCode);

        setCourseInfo({ department, courseCode });

        const res = await fetch("http://localhost:3000/offerings/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ department, courseCode })
        });

        if (!res.ok) {
            console.log("Failure.");
            return;
        }

        const courses = await res.json();
        var professors = [];
        courses[0].offerings.map((offering) => {
            var cur_instructor = offering.instructor.split(".");
            if (cur_instructor[cur_instructor.length - 1] === "") {
                cur_instructor.pop();
            }
            const exists = professors.some(
                (arr) => JSON.stringify(arr) === JSON.stringify(cur_instructor)
            );
            if (!exists) {
                professors.push([...cur_instructor]);
            }
            setProfessors(professors);
            goToNextStep();
        });
        console.log(professors);
    };

    return (
        <div className="step-one-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="Department">Choose Department</label>
                <select
                    name="Dept"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    <option value=" ALL">Select a Department</option>
                    <option value="AC ENG">AC ENG . . . . . .Academic English</option>
                    <option value="AFAM">AFAM . . . . . . . African American Studies</option>
                    <option value="ANATOMY">ANATOMY . . . .Anatomy and Neurobiology</option>
                    <option value="ANESTH">ANESTH . . . . . Anesthesiology</option>
                    <option value="ANTHRO">ANTHRO . . . . . Anthropology</option>
                    <option value="ARABIC">ARABIC . . . . . .Arabic</option>
                    <option value="ARMN">ARMN . . . . . . .Armenian</option>
                    <option value="ART">ART . . . . . . . . .Art</option>
                    <option value="ART HIS">ART HIS . . . . . .Art History</option>
                    <option value="ARTS">ARTS . . . . . . . Arts</option>
                    <option value="ARTSHUM">ARTSHUM . . . . Arts and Humanities</option>
                    <option value="ASIANAM">ASIANAM . . . . Asian American Studies</option>
                    <option value="ASL">ASL . . . . . . . . .American Sign Language (started 2025 Spg)</option>
                    <option value="BANA">BANA . . . . . . . Business Analytics</option>
                    <option value="BATS">BATS . . . . . . . Biomedical and Translational Science</option>
                    <option value="BIO SCI">BIO SCI . . . . . .Biological Sciences</option>
                    <option value="BIOCHEM">BIOCHEM . . . . Biological Chemistry</option>
                    <option value="BME">BME . . . . . . . . Biomedical Engineering</option>
                    <option value="CAMPREC">CAMPREC . . . .Campus Recreation</option>
                    <option value="CBE">CBE . . . . . . . . Chemical and Biomolecular Engineering</option>
                    <option value="CEM">CEM . . . . . . . . Community and Environmental Medicine</option>
                    <option value="CHC/LAT">CHC/LAT . . . . . Chicano Latino</option>
                    <option value="CHEM">CHEM . . . . . . .Chemistry</option>
                    <option value="CHINESE">CHINESE . . . . .Chinese</option>
                    <option value="CLASSIC">CLASSIC . . . . .Classics</option>
                    <option value="CLT&amp;THY">CLT&amp;THY . . . . .Culture and Theory</option>
                    <option value="COGS">COGS . . . . . . . Cognitive Sciences </option>
                    <option value="COM LIT">COM LIT . . . . . Comparative Literature</option>
                    <option value="COMPSCI">COMPSCI . . . . Computer Science</option>
                    <option value="CRITISM">CRITISM . . . . . Criticism</option>
                    <option value="CRM/LAW">CRM/LAW . . . . Criminology, Law and Society</option>
                    <option value="CSE">CSE . . . . . . . . Computer Science and Engineering</option>
                    <option value="DANCE">DANCE . . . . . . Dance</option>
                    <option value="DATA">DATA . . . . . . . Data Science (started 2022 SS1)</option>
                    <option value="DERM">DERM . . . . . . .Dermatology</option>
                    <option value="DEV BIO">DEV BIO . . . . . Developmental and Cell Biology</option>
                    <option value="DRAMA">DRAMA . . . . . .Drama</option>
                    <option value="EARTHSS">EARTHSS . . . . Earth System Science</option>
                    <option value="EAS">EAS . . . . . . . . East Asian Studies</option>
                    <option value="ECO EVO">ECO EVO . . . . Ecology and Evolutionary Biology</option>
                    <option value="ECON">ECON . . . . . . . Economics</option>
                    <option value="ECPS">ECPS . . . . . . . Embedded and Cyber-Physical Systems</option>
                    <option value="ED AFF">ED AFF . . . . . .Educational Affairs (Sch of Med)</option>
                    <option value="EDUC">EDUC . . . . . . . Education</option>
                    <option value="EECS">EECS . . . . . . . Electrical Engineering and Computer Science</option>
                    <option value="EHS">EHS . . . . . . . . Environmental Health Sciences</option>
                    <option value="ENGLISH">ENGLISH . . . . .English</option>
                    <option value="ENGR">ENGR . . . . . . . Engineering</option>
                    <option value="ENGRCEE">ENGRCEE . . . .Civil and Environmental Engineering</option>
                    <option value="ENGRMAE">ENGRMAE . . . .Mechanical and Aerospace Engineering</option>
                    <option value="ENGRMSE">ENGRMSE . . . .Materials Science and Engineering (until 2020 SS2)</option>
                    <option value="EPIDEM">EPIDEM . . . . . .Epidemiology</option>
                    <option value="ER MED">ER MED . . . . . Emergency Medicine</option>
                    <option value="EURO ST">EURO ST . . . . .European Studies</option>
                    <option value="FAM MED">FAM MED . . . . Family Medicine</option>
                    <option value="FILIPNO">FILIPNO . . . . . .Filipino (started 2025 Spg)</option>
                    <option value="FIN">FIN . . . . . . . . . Finance</option>
                    <option value="FLM&amp;MDA">FLM&amp;MDA . . . .Film and Media Studies</option>
                    <option value="FRENCH">FRENCH . . . . . French</option>
                    <option value="GDIM">GDIM . . . . . . . .Game Design and Interactive Media (started 2021 Fall)</option>
                    <option value="GEN&amp;SEX">GEN&amp;SEX . . . . Gender and Sexuality Studies</option>
                    <option value="GERMAN">GERMAN . . . . .German</option>
                    <option value="GLBL ME">GLBL ME . . . . .Global Middle East Studies</option>
                    <option value="GLBLCLT">GLBLCLT . . . . .Global Cultures</option>
                    <option value="GREEK">GREEK . . . . . . Greek</option>
                    <option value="HEBREW">HEBREW . . . . .Hebrew</option>
                    <option value="HINDI">HINDI . . . . . . . .Hindi</option>
                    <option value="HISTORY">HISTORY . . . . .History</option>
                    <option value="HUMAN">HUMAN . . . . . .Humanities</option>
                    <option value="HUMARTS">HUMARTS . . . . Humanities and Arts</option>
                    <option value="I&amp;C SCI">I&amp;C SCI . . . . . . Information and Computer Science</option>
                    <option value="IN4MATX">IN4MATX . . . . . Informatics</option>
                    <option value="INNO">INNO . . . . . . . .Innovation and Entrepreneurship</option>
                    <option value="INT MED">INT MED . . . . . Internal Medicine</option>
                    <option value="INTL ST">INTL ST . . . . . . International Studies</option>
                    <option value="IRAN">IRAN . . . . . . . .Iranian (started 2020 Fall)</option>
                    <option value="ITALIAN">ITALIAN . . . . . .Italian</option>
                    <option value="JAPANSE">JAPANSE . . . . Japanese</option>
                    <option value="KOREAN">KOREAN . . . . .Korean</option>
                    <option value="LATIN">LATIN . . . . . . . Latin</option>
                    <option value="LAW">LAW . . . . . . . . Law</option>
                    <option value="LIT JRN">LIT JRN . . . . . . Literary Journalism</option>
                    <option value="LPS">LPS . . . . . . . . .Logic and Philosophy of Science</option>
                    <option value="LSCI">LSCI . . . . . . . . Language Science</option>
                    <option value="M&amp;MG">M&amp;MG . . . . . . .Microbiology and Molecular Genetics</option>
                    <option value="MATH">MATH . . . . . . . Mathematics</option>
                    <option value="MED">MED . . . . . . . . Medicine</option>
                    <option value="MED ED">MED ED . . . . . Medical Education</option>
                    <option value="MED HUM">MED HUM . . . . Medical Humanities</option>
                    <option value="MGMT">MGMT . . . . . . .Management</option>
                    <option value="MGMT EP">MGMT EP . . . . Executive MBA</option>
                    <option value="MGMT FE">MGMT FE . . . . Fully Employed MBA</option>
                    <option value="MGMT HC">MGMT HC . . . . Health Care MBA</option>
                    <option value="MGMTMBA">MGMTMBA . . . Management MBA</option>
                    <option value="MGMTPHD">MGMTPHD . . . .Management PhD</option>
                    <option value="MIC BIO">MIC BIO . . . . . .Microbiology</option>
                    <option value="MNGE">MNGE . . . . . . .Master in Management (started 2025 Spg)</option>
                    <option value="MOL BIO">MOL BIO . . . . . Molecular Biology and Biochemistry</option>
                    <option value="MPAC">MPAC . . . . . . .Accounting</option>
                    <option value="MSE">MSE . . . . . . . . Materials Science and Engineering (started 2020 Fall)</option>
                    <option value="MUSIC">MUSIC . . . . . . .Music</option>
                    <option value="NET SYS">NET SYS . . . . .Networked Systems</option>
                    <option value="NEURBIO">NEURBIO . . . . .Neurobiology and Behavior</option>
                    <option value="NEUROL">NEUROL . . . . . Neurology</option>
                    <option value="NUR DNP">NUR DNP . . . . .Nursing Practice (started 2025 Fall)</option>
                    <option value="NUR FNP">NUR FNP . . . . .Nurse Practitioner (started 2025 Fall)</option>
                    <option value="NUR INF">NUR INF . . . . . Nursing Informatics (started 2025 Fall)</option>
                    <option value="NUR SCI">NUR SCI . . . . . Nursing Science</option>
                    <option value="OB/GYN">OB/GYN . . . . . Obstetrics and Gynecology</option>
                    <option value="OPHTHAL">OPHTHAL . . . . Ophthalmology and Visual Sciences</option>
                    <option value="PATH">PATH . . . . . . . Pathology and Laboratory Medicine</option>
                    <option value="PED GEN">PED GEN . . . . Pediatrics Genetics</option>
                    <option value="PEDS">PEDS . . . . . . . Pediatrics</option>
                    <option value="PERSIAN">PERSIAN . . . . .Persian</option>
                    <option value="PHARM">PHARM . . . . . .Pharmacology (started 2020 Fall)</option>
                    <option value="PHILOS">PHILOS . . . . . .Philosophy</option>
                    <option value="PHMD">PHMD . . . . . . .Pharmacy (started 2021 Fall)</option>
                    <option value="PHRMSCI">PHRMSCI . . . . Pharmaceutical Sciences</option>
                    <option value="PHY SCI">PHY SCI . . . . . Physical Science</option>
                    <option value="PHYSICS">PHYSICS . . . . .Physics</option>
                    <option value="PHYSIO">PHYSIO . . . . . .Physiology and Biophysics</option>
                    <option value="PLASTIC">PLASTIC . . . . . Plastic Surgery</option>
                    <option value="PM&amp;R">PM&amp;R . . . . . . .Physical Medicine and Rehabilitation</option>
                    <option value="POL SCI">POL SCI . . . . . Political Science</option>
                    <option value="PORTUG">PORTUG . . . . . Portuguese</option>
                    <option value="PSCI">PSCI . . . . . . . .Psychological Science</option>
                    <option value="PSMD">PSMD . . . . . . .Psychiatry (started 2025 Fall)</option>
                    <option value="PSYCH">PSYCH . . . . . . Psychology (until 2025 SS2)</option>
                    <option value="PUB POL">PUB POL . . . . .Public Policy</option>
                    <option value="PUBHLTH">PUBHLTH . . . . Public Health</option>
                    <option value="RADIO">RADIO . . . . . . .Radiology</option>
                    <option value="REL STD">REL STD . . . . . Religious Studies</option>
                    <option value="ROTC">ROTC . . . . . . . Reserve Officers' Training Corps</option>
                    <option value="RUSSIAN">RUSSIAN . . . . .Russian</option>
                    <option value="SOC SCI">SOC SCI . . . . . Social Science</option>
                    <option value="SOCECOL">SOCECOL . . . . Social Ecology</option>
                    <option value="SOCIOL">SOCIOL . . . . . .Sociology</option>
                    <option value="SPANISH">SPANISH . . . . .Spanish</option>
                    <option value="SPPS">SPPS . . . . . . . Social Policy and Public Service</option>
                    <option value="STATS">STATS . . . . . . .Statistics</option>
                    <option value="SURGERY">SURGERY . . . .Surgery</option>
                    <option value="SWE">SWE . . . . . . . .Software Engineering</option>
                    <option value="TAGALOG">TAGALOG . . . . Tagalog</option>
                    <option value="TOX">TOX . . . . . . . . .Toxicology</option>
                    <option value="UCDC">UCDC . . . . . . . UC Washington DC</option>
                    <option value="UNI AFF">UNI AFF . . . . . .University Affairs</option>
                    <option value="UNI STU">UNI STU . . . . . .University Studies</option>
                    <option value="UPPP">UPPP . . . . . . . Urban Planning and Public Policy</option>
                    <option value="VIETMSE">VIETMSE . . . . .Vietnamese</option>
                    <option value="VIS STD">VIS STD . . . . . .Visual Studies</option>
                    <option value="WRITING">WRITING . . . . . Writing</option>
                    <option value="COMPSCI">COMPSCI - Computer Science</option>
                </select>

                <label htmlFor="Course Number">Enter Course Number</label>
                <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                />

                <button type="submit">Next</button>
            </form>
        </div>
    );
}

export default StepOne;
