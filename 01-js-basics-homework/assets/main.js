const btnAddStudent = document.querySelector(".btn-add-student");
const btnCalcAttendance = document.querySelector(".calculate-attendance");
const btnCreateTeams = document.querySelector(".noOfTeams");
const addStudent = document.querySelector(".list");
const studentFormData = document.querySelector(".form");

const attendancePercentageUi = document.querySelector(".attendance-percentage");
const displayPercentageUi = document.querySelector(".attendance-percentage");

const teamsUi = document.querySelector(".no-teams");
const selectTeams = document.querySelector("#teams");

const errorMsgDiv = document.querySelector(".errorMsg");
const inputErrorMsg = document.querySelector(".inputError");

btnCalcAttendance.style.display = "none";

const students = [];

const getStudent = (name, age, attendance) => {
  return { name, age, attendance };
};

const addStudentToList = () => {
  const dataForm = new FormData(studentFormData);
  const { name, age, attendance } = Object.fromEntries(dataForm.entries());
  console.log(name, age, attendance);

  if (name.length <= 1 || age.length <= 1) {
    errorMsgDiv.style.display = "block";
    inputErrorMsg.textContent = `Provide a valid name and age`;

    return;
  } else if (attendance === null) {
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
    <td>${name}</td>
    <td>${age.replaceAll(" ", "")}</td>
    <td>${getAttendanceDetails(attendance).status}</td>
  </tr>
  `;

  addStudent.insertAdjacentHTML("beforeend", html);
  students.push(getStudent(name, age, getAttendanceDetails(attendance).bool));

  studentFormData.reset();
  addNumberOfTeams();
  attendancePercentageUi.innerText = "";
};

const addNumberOfTeams = () => {
  selectTeams.innerHTML = `<option value="" selected disabled>How many teams?</option>`;
  let html;
  const presentStudents = getPresentStudents().map((student) => student);

  for (let i = 1; i <= presentStudents.length; i++) {
    html = `
    <option value=${i}>${i} ${i == "1" ? "Team" : "Teams"}</option>
    `;
    selectTeams.insertAdjacentHTML("beforeend", html);
  }
};

const getAttendanceDetails = (attendance) => {
  return attendance === "true"
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
      <h2 class="secondary">Team ${teamIndex}</h2>
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

btnCreateTeams.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  createTeams(selectTeams.value || 1);
});

btnCalcAttendance.addEventListener("click", displayCalcPercentage);

studentFormData.addEventListener("submit", (e) => {
  e.preventDefault();
  addStudentToList();
  createTeams(selectTeams.value || 1);
});
