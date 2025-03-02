console.log("Working...");

const btnOpenForm = document.querySelector(".btn-open-form");
const btnAddStudent = document.querySelector(".btn-add-student");
const form = document.querySelector(".collect-data");

const students = [];

btnOpenForm.addEventListener("click", function () {
  //   form.classList.remove("hidden");
  showAttendancePercentage(students);
});

btnAddStudent.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  const name = document.querySelector(".name");
  const age = document.querySelector(".age");
  const attendance = document.querySelector("input[name=attendance]:checked");
  const addStudent = document.querySelector(".list");
  let html = `
  <li class="list-item">
  <p>Name: ${name.value}</p>
  <p>Age: ${age.value}</p> 
  <p>Attendance: ${attendance.value == "true" ? "present" : "absent"}</p>
  
  </li>`;

  addStudent.insertAdjacentHTML("beforeend", html);

  students.push(getStudent(name.value, age.value, attendance.value));

  console.log(students);

  name.value = "";
  age.value = "";
  html = "";
});

function getStudent(name, age, attendance) {
  return {
    name: name,
    age: age,
    attendance: attendance,
  };
}

// NOT WORKING YET IT'S LATE
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
