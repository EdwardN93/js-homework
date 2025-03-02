console.log("Working...");

// const btnOpenForm = document.querySelector(".btn-open-form");
const btnAddStudent = document.querySelector(".btn-add-student");
const form = document.querySelector(".collect-data");
const btnCalcAttendance = document.querySelector(".calculate-attendance");
const btnShuffleTeams = document.querySelector(".btn-shuffle");
const btnCreateTeams = document.querySelector(".noOfTeams");

btnShuffleTeams.style.display = "none";
btnCalcAttendance.style.display = "none";

const students = [
  //   {
  //     name: "Bombastic",
  //     age: 31,
  //     attendance: true,
  //   },
  //   {
  //     name: "Iso",
  //     age: 31,
  //     attendance: false,
  //   },
  //   {
  //     name: "Martin",
  //     age: 31,
  //     attendance: true,
  //   },
  //   {
  //     name: "Garrix",
  //     age: 32,
  //     attendance: true,
  //   },
  //   {
  //     name: "Edward",
  //     age: 21,
  //     attendance: false,
  //   },
  //   {
  //     name: "Aniamls",
  //     age: 31,
  //     attendance: true,
  //   },
  //   {
  //     name: "Trixie",
  //     age: 31,
  //     attendance: true,
  //   },
  //   {
  //     name: "Fanny",
  //     age: 31,
  //     attendance: true,
  //   },
  //   {
  //     name: "Combi",
  //     age: 31,
  //     attendance: true,
  //   },
  //   {
  //     name: "Jon",
  //     age: 31,
  //     attendance: true,
  //   },
];

function getStudent(name, age, attendance) {
  return {
    name: name,
    age: age,
    attendance: attendance,
  };
}

function addStudentToList(e) {
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
  } else {
    document.querySelector(".errorMsg").style.display = "none";
  }

  if (students.length > 1) {
    btnCalcAttendance.style.display = "block";
    // btnShuffleTeams.style.display = "block";
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
}

function showAttendancePercentage(students) {
  let attendance = 0;

  for (let i = 0; i < students.length; i++) {
    if (students[i].attendance === "true") attendance++;
  }
  if (attendance > 0) {
    return ((attendance / students.length) * 100).toFixed() + "%";
  } else {
    return;
  }
}

function shuffleStudents(numTeams) {
  let teams = new Array(numTeams).fill([]);
  const presentStudents = students.filter((e) => e.attendance === "true");

  let nameOfStudents = presentStudents.map((student) => student.name);

  nameOfStudents = nameOfStudents.sort(() => Math.random() - 0.5);

  const teamSize = Math.floor(nameOfStudents.length / numTeams);
  const remainingStudents = nameOfStudents.length % numTeams;

  for (let i = 0; i < numTeams; i++) {
    const extraStudent = i < remainingStudents ? 1 : 0;
    teams[i] = nameOfStudents.splice(0, teamSize + extraStudent);
  }

  const noTeams = document.querySelector(".no-teams");
  noTeams.innerHTML = "";

  teams.forEach((team, index) => {
    const div = document.createElement("div");
    div.classList.add(`team-${index + 1}`);

    const h2 = document.createElement("h2");
    h2.textContent = `Team ${index + 1}`;
    div.appendChild(h2);

    const ul = document.createElement("ul");
    div.appendChild(ul);

    team.forEach((student) => {
      const li = document.createElement("li");
      li.textContent = student;
      ul.appendChild(li);
    });

    noTeams.appendChild(div);
  });
}

function displayList(list, listNr = 1) {
  for (let i = 0; i < list.length; i++) {
    let html = `
    <li class="list-student">${list[i]}</li>
    `;
    document
      .querySelector(`.team${listNr}`)
      .insertAdjacentHTML("beforeend", html);
  }
}

function displayCalcPercentage() {
  return (document.querySelector(
    ".attendance-percentage"
  ).innerText = `Presence was: ${showAttendancePercentage(students)}`);
}

function hideShowForm() {
  form.classList.toggle("hidden");
  btnOpenForm.textContent = `Hide form`;
  if (form.classList.contains("hidden")) btnOpenForm.textContent = `Show form`;
}

btnCreateTeams.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  const numTeams = document.querySelector(".numTeams");
  shuffleStudents(numTeams.value || 3);
  numTeams.value = "";
});

// btnOpenForm.addEventListener("click", hideShowForm);
btnCalcAttendance.addEventListener("click", displayCalcPercentage);
btnAddStudent.addEventListener("click", addStudentToList);
btnShuffleTeams.addEventListener("click", shuffleStudents);
