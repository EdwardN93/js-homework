console.log("Working...");

const btnOpenForm = document.querySelector(".btn-open-form");
const btnAddStudent = document.querySelector(".btn-add-student");
const form = document.querySelector(".collect-data");
const btnCalcAttendance = document.querySelector(".calculate-attendance");
btnCalcAttendance.style.display = "none";

const students = [
  {
    name: "Bombastic",
    age: 31,
    attendance: true,
  },
  {
    name: "Iso",
    age: 31,
    attendance: false,
  },
  {
    name: "Martin",
    age: 31,
    attendance: true,
  },
  {
    name: "Garrix",
    age: 32,
    attendance: true,
  },
  {
    name: "Edward",
    age: 21,
    attendance: false,
  },
  {
    name: "Aniamls",
    age: 31,
    attendance: true,
  },
  {
    name: "Trixie",
    age: 31,
    attendance: true,
  },
  {
    name: "Fanny",
    age: 31,
    attendance: true,
  },
  {
    name: "Combi",
    age: 31,
    attendance: true,
  },
  {
    name: "Jon",
    age: 31,
    attendance: true,
  },
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

  if (students.length > 0) {
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

  console.log(students);

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

function shuffleStudents(students) {
  const team1 = [];
  const team2 = [];
  const team3 = [];
  const presentStudents = students.filter((e) => e.attendance);
  while (presentStudents.length) {
    let random = presentStudents.splice(
      Math.floor(Math.random() * presentStudents.length)
    );
    console.log(random.name);
  }
  // for (let i = 0; i < presentStudents.length; i++) {
  //   let student = presentStudents.splice();

  //   if (team1.includes(student.name)) {
  //     continue;
  //   } else {
  //     team1[Math.floor(Math.random() * 3)] = student.name;
  //   }
  //   if (team1.length > 3) {
  //     team2.push(student);
  //   } else if (team2.length > 3) {
  //     team3.push(student);
  //   }
  // }

  console.log(team1);
  console.log(team2);
  console.log(team3);
}

shuffleStudents(students);

function displayCalcPercentage() {
  return (document.querySelector(
    ".attendance-percentage"
  ).innerText = `Presence was: ${showAttendancePercentage(students)}`);
}

function hideShowForm() {
  form.classList.toggle("hidden");
  btnOpenForm.textContent = `Hide form`;
  if (form.classList.contains("hidden")) btnOpenForm.textContent = `Show form`;
  // showAttendancePercentage(students);
}

btnOpenForm.addEventListener("click", hideShowForm);
btnCalcAttendance.addEventListener("click", displayCalcPercentage);
btnAddStudent.addEventListener("click", addStudentToList);
