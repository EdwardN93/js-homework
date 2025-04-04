const defaultAvatar = `https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg`;

const studentNameInput = document.querySelector("#student-name");
const studentColor = document.querySelector("#student-color");

const pickedStudentDiv = document.querySelector("#picked-student-div");
const pickedStudentImg = document.querySelector("#picked-student-img");
const tbody = document.querySelector("tbody");

// BUTTONS RERERENCE
const btnAddStudent = document.querySelector("#add-student-btn");
const btnClearList = document.querySelector(".btn-clear-list");
const btnPickStudent = document.querySelector("#pick-student-btn");

// FUNCTIONS

const randomStudentColor = () => {
  const specter = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += specter[Math.floor(Math.random() * specter.length)];
  }
  return color;
};

studentColor.value = randomStudentColor();
btnClearList.disabled = true;

const getStudentName = (e) => {
  e.preventDefault();

  const studentName = studentNameInput.value.trim();
  if (studentName.length < 1) return alert("Provide a valid name");

  btnClearList.disabled = false;

  const student = {
    name: studentName,
    color: studentColor.value,
  };

  appendStudentToDOM(student);
  addToStorage(student);
  studentColor.value = randomStudentColor();
  studentNameInput.value = "";
};

const appendStudentToDOM = (student) => {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td class='name-list' data-student-name="${encodeURIComponent(
          student.name
        )}">
            <img
                data-border-clr="${student.color}"
                src="https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${
                  student.name
                }"
                alt="avatar"
                class="img-thumbnail me-2"      
            />${student.name}<div class='student-color'></div></td>
        <td class="text-end">
            <button class="delete-btn btn btn-outline-secondary btn-sm">
                delete
            </button>
        </td>
  `;
  tbody.appendChild(row);

  studentsColor(row, student.color);

  const deleteBtn = row.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteFromStorage(row.querySelector(".name-list").dataset.studentName);
    row.remove();
    checkStudentsList();
  });
};

const studentsColor = (row, color) => {
  const newImage = row.querySelector("[data-border-clr]");
  const newColor = row.querySelector(".student-color");

  newImage.style.borderColor = `${color}`;
  newColor.style.backgroundColor = `${color}`;
};

const checkStudentsList = () => {
  if (tbody.children.length === 0) {
    resetPickedStudent();
  }
};

const resetPickedStudent = () => {
  changeDetails();

  btnClearList.disabled = true;
};

const changeDetails = (
  text = `Press the Button to pick a student`,
  border = `1px solid #dee2e6`,
  source = defaultAvatar
) => {
  pickedStudentDiv.innerText = text;
  pickedStudentImg.style.border = border;
  pickedStudentImg.src = source;
};

function addToStorage(student) {
  const fakeDb = JSON.parse(localStorage.getItem("students")) || [];
  fakeDb.push(student);
  localStorage.setItem("students", JSON.stringify(fakeDb));
}

function deleteFromStorage(name) {
  const fakeDb = JSON.parse(localStorage.getItem("students")) || [];
  const index = fakeDb.findIndex(
    (student) => student.name === decodeURIComponent(name)
  );

  if (index !== -1) {
    fakeDb.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(fakeDb));
  }
}

function loadStudentsFromStorage() {
  const fakeDb = JSON.parse(localStorage.getItem("students")) || [];
  fakeDb.forEach((student) => appendStudentToDOM(student));

  if (fakeDb.length > 0) {
    btnClearList.disabled = false;
  }
}

// EVENT HANDLERS

btnAddStudent.addEventListener("click", getStudentName);

btnPickStudent.addEventListener("click", () => {
  const students = tbody.querySelectorAll(".name-list");
  const studentsLength = students.length;

  if (studentsLength === 0) return alert("No students to pick");

  const randomStudent = students[Math.floor(Math.random() * studentsLength)];
  const studentImg = randomStudent.querySelector("img");
  const studentName = randomStudent.dataset.studentName;

  changeDetails(
    studentName,
    `5px solid ${studentImg.dataset.borderClr}`,
    studentImg.src
  );
});

btnClearList.addEventListener("click", (e) => {
  tbody.innerHTML = "";
  localStorage.removeItem("students");
  e.target.disabled = true;
  resetPickedStudent();
});

loadStudentsFromStorage();
