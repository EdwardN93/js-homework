console.log("Working...");

// const btnOpenForm = document.querySelector(".btn-open-form"); // optional for hiding and showing form ?
const btnAddStudent = document.querySelector(".btn-add-student");
const form = document.querySelector(".collect-data");
const btnCalcAttendance = document.querySelector(".calculate-attendance");
const btnCreateTeams = document.querySelector(".noOfTeams");

btnCalcAttendance.style.display = "none";

const students = [
  // {
  //   name: "Bombastic",
  //   age: 31,
  //   attendance: true,
  // },
  // {
  //   name: "Iso",
  //   age: 31,
  //   attendance: false,
  // },
  // {
  //   name: "Martin",
  //   age: 31,
  //   attendance: true,
  // },
  // {
  //   name: "Garrix",
  //   age: 32,
  //   attendance: true,
  // },
  // {
  //   name: "Edward",
  //   age: 21,
  //   attendance: false,
  // },
  // {
  //   name: "Aniamls",
  //   age: 31,
  //   attendance: true,
  // },
  // {
  //   name: "Trixie",
  //   age: 31,
  //   attendance: true,
  // },
  // {
  //   name: "Fanny",
  //   age: 31,
  //   attendance: true,
  // },
  // {
  //   name: "Combi",
  //   age: 31,
  //   attendance: true,
  // },
  // {
  //   name: "Jon",
  //   age: 31,
  //   attendance: true,
  // },
];

const getStudent = (name, age, attendance) => {
  return { name, age, attendance };
};

const addStudentToList = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const name = document.querySelector(".name");
  const age = document.querySelector(".age");
  const attendance = document.querySelector("input[name=attendance]:checked");
  const addStudent = document.querySelector(".list");

  if (name.value.length <= 1 || age.value.length <= 1) {
    document.querySelector(".errorMsg").style.display = "block";
    document.querySelector(
      ".inputError"
    ).textContent = `Provide a valid name and age`;
    return;
  } else if (!attendance) {
    document.querySelector(".errorMsg").style.display = "block";
    document.querySelector(".inputError").textContent =
      "Please select attendance";
    return;
  } else {
    document.querySelector(".errorMsg").style.display = "none";
  }

  if (students.length > 1) {
    btnCalcAttendance.style.display = "block";
  }
  const html = `
  <tr>
    <td>${name.value}</td>
    <td>${age.value.replaceAll(" ", "")}</td>
    <td>${attendance.value == "true" ? "Present" : "Absent"}</td>
  </tr>
  `;

  addStudent.insertAdjacentHTML("beforeend", html);
  students.push(getStudent(name.value, age.value, attendance.value));

  document.querySelector(".attendance-percentage").innerText = "";
  name.value = "";
  age.value = "";
};

const getPresentStudents = () => {
  return students.filter((student) => student.attendance === "true");
};

const showAttendancePercentage = (students) => {
  const attendance = getPresentStudents().length;

  return ((attendance / students.length) * 100).toFixed() + "%";
};

const shuffleStudents = (numOfTeams) => {
  const presentStudents = getPresentStudents();
  document.querySelector(".no-teams").innerHTML = "";

  if (numOfTeams > getPresentStudents().length) {
    let teamHTML = `
  <div class='error'>
    <p>Max number of teams you can create: ${getPresentStudents().length}</p>
  </div>
  `;
    document
      .querySelector(".no-teams")
      .insertAdjacentHTML("beforeend", teamHTML);

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

    document
      .querySelector(".no-teams")
      .insertAdjacentHTML("beforeend", teamHTML);
  });
};

const displayCalcPercentage = () => {
  document.querySelector(
    ".attendance-percentage"
  ).innerText = `Presence was: ${showAttendancePercentage(students)}`;
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

  const numTeams = document.querySelector(".numTeams");
  shuffleStudents(numTeams.value || 1);
  numTeams.value = "";
});

// btnOpenForm.addEventListener("click", hideShowForm); // Optional for hiding and showing form?
btnCalcAttendance.addEventListener("click", displayCalcPercentage);
btnAddStudent.addEventListener("click", addStudentToList);
