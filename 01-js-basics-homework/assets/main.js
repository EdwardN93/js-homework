console.log("Working...");

const btnOpenForm = document.querySelector(".btn-open-form");
const btnAddStudent = document.querySelector(".btn-add-student");
const form = document.querySelector(".collect-data");
const btnCalcAttendance = document.querySelector(".calculate-attendance");
btnCalcAttendance.style.display = "none";

const students = [];

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
    <td>${age.value}</td>
    <td>${attendance.value == "true" ? "Present" : "Absent"}
    </td>
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
