console.log("Working...");

// const btnOpenForm = document.querySelector(".btn-open-form"); // optional for hiding and showing form ?
const btnAddStudent = document.querySelector(".btn-add-student");
const form = document.querySelector(".collect-data");
const btnCalcAttendance = document.querySelector(".calculate-attendance");
const btnCreateTeams = document.querySelector(".noOfTeams");
const addStudent = document.querySelector(".list");
const studentFormData = document.querySelector(".form");

const attendancePercentageUi = document.querySelector(".attendance-percentage");
const displayPercentageUi = document.querySelector(".attendance-percentage");

const teamsUi = document.querySelector(".no-teams");
const numTeams = document.querySelector(".numTeams");

const errorMsgDiv = document.querySelector(".errorMsg");
const inputErrorMsg = document.querySelector(".inputError");

btnCalcAttendance.style.display = "none";

const students = [];

const getStudent = (name, age, attendance) => {
  return { name, age, attendance };
};

const addStudentToList = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const name = document.querySelector(".name");
  const age = document.querySelector(".age");
  const attendance = document.querySelector("input[name=attendance]:checked");

  if (name.value.length <= 1 || age.value.length <= 1) {
    errorMsgDiv.style.display = "block";
    inputErrorMsg.textContent = `Provide a valid name and age`;

    return;
  } else if (!attendance) {
    errorMsgDiv.style.display = "block";
    inputErrorMsg.textContent = "Please select attendance";

    return;
  } else {
    errorMsgDiv.style.display = "none";
  }

  if (students.length > 1) {
    btnCalcAttendance.style.display = "block";
  }

  const html = `
  <tr class="${getAttendanceDetails(attendance).class}">
    <td>${name.value}</td>
    <td>${age.value.replaceAll(" ", "")}</td>
    <td>${getAttendanceDetails(attendance).status}</td>
  </tr>
  `;

  addStudent.insertAdjacentHTML("beforeend", html);
  students.push(
    getStudent(name.value, age.value, getAttendanceDetails(attendance).bool)
  );

  studentFormData.reset();
  attendancePercentageUi.innerText = "";
};

const getAttendanceDetails = (attendance) => {
  return attendance.value === "true"
    ? { status: "Present", class: "green", bool: true }
    : { status: "Absent", class: "red", bool: false };
};

const getPresentStudents = () => {
  return students.filter((student) => student.attendance);
};

const showAttendancePercentage = (students) => {
  const attendance = getPresentStudents().length;

  return ((attendance / students.length) * 100).toFixed() + "%";
};

const createTeams = (numOfTeams) => {
  const presentStudents = getPresentStudents();
  teamsUi.innerHTML = "";

  if (numOfTeams > getPresentStudents().length) {
    let teamHTML = `
  <div class='error'>
    <p>Max number of teams you can create: ${getPresentStudents().length}</p>
  </div>
  `;
    teamsUi.insertAdjacentHTML("beforeend", teamHTML);

    return;
  } else if (numOfTeams == 0 || numOfTeams < 0) {
    let teamHTML = `
  <div class='error'>
    <p>Not an option. Add students and provide a positive value</p>
  </div>
  `;
    teamsUi.insertAdjacentHTML("beforeend", teamHTML);
    return;
  }

  let teams = new Array(numOfTeams).fill([]);

  let nameOfStudents = presentStudents.map((student) => student.name);

  nameOfStudents = nameOfStudents.sort(() => Math.random() - 0.5);

  const teamSize = Math.floor(nameOfStudents.length / numOfTeams);
  const remainingStudents = nameOfStudents.length % numOfTeams;

  for (let i = 0; i < numOfTeams; i++) {
    const extraStudent = i < remainingStudents ? 1 : 0;
    teams[i] = nameOfStudents.splice(0, teamSize + extraStudent);
  }

  teams.forEach((team, index) => {
    const teamIndex = index + 1;
    let teamHTML = `
      <div class="team-${teamIndex}">
      <h2>Team ${teamIndex}</h2>
      <ul>
      ${team.map((student) => `<li>${student}</li>`).join("")}
      </ul>
      </div>
      `;

    teamsUi.insertAdjacentHTML("beforeend", teamHTML);
  });
};

const displayCalcPercentage = () => {
  displayPercentageUi.innerText = `Class attendance: ${showAttendancePercentage(
    students
  )}`;
};

// Optional for hiding and showing form?
// function hideShowForm() {
//   form.classList.toggle("hidden");
//   btnOpenForm.textContent = `Hide form`;
//   if (form.classList.contains("hidden")) btnOpenForm.textContent = `Show form`;
// }

btnCreateTeams.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  createTeams(numTeams.value || 1);
  // numTeams.value = "";
});

// btnOpenForm.addEventListener("click", hideShowForm); // Optional for hiding and showing form?
btnCalcAttendance.addEventListener("click", displayCalcPercentage);
btnAddStudent.addEventListener("click", addStudentToList);
