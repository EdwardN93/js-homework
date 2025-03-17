const studentNameInput = document.querySelector("#student-name");
const studentColor = document.querySelector("#student-color");

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
  const html = `
    <tr>
        <td class='name-list'>
            <img
                src="https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${studentName}
                alt="avatar"
                class="img-thumbnail me-2"      
            />${studentName}<div class='student-color'></div></td>
        <td class="text-end">
            <button class="delete-btn btn btn-outline-secondary btn-sm">
                delete
            </button>
        </td>
    </tr>
  `;
  const tbody = document.querySelector("tbody");
  tbody.insertAdjacentHTML("beforeend", html);

  const newImage = document.querySelector("tbody tr:last-child .img-thumbnail");
  newImage.style.borderColor = `${studentColor.value}`;
  const newColor = document.querySelector("tbody tr:last-child .student-color");
  newColor.style.backgroundColor = `${studentColor.value}`;

  studentColor.value = randomStudentColor();
  studentNameInput.value = "";
};

const checkStudentsList = () => {
  if (document.querySelectorAll(".name-list").length === 0) {
    resetPickedStudent();
  }
};

const resetPickedStudent = () => {
  document.querySelector(
    "#picked-student-div"
  ).innerText = `Press the Button to pick a student`;

  document.querySelector(".img-thumbnail").style.border = `1px solid #dee2e6`;
  const defaultAvatar = `https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg`;
  document.querySelector("#picked-student-img").src = defaultAvatar;
  btnClearList.disabled = true;
};

// EVENT HANDLERS

btnAddStudent.addEventListener("click", getStudentName);

document.querySelector("tbody").addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("delete-btn")) {
    const row = e.target.closest("tr");
    row.remove();
    checkStudentsList();
  }
});

btnPickStudent.addEventListener("click", () => {
  const students = document.querySelectorAll(".name-list");

  if (students.length === 0) return alert("No students to pick");

  const randomStudent = students[Math.floor(Math.random() * students.length)];
  const randomStudentImg = randomStudent.querySelector("img");

  document.querySelector("#picked-student-div").innerText =
    randomStudent.innerText;
  document.querySelector(
    ".img-thumbnail"
  ).style.border = `5px solid ${randomStudentImg.style.borderColor}`;
  document.querySelector("#picked-student-img").src = randomStudentImg.src;
});

btnClearList.addEventListener("click", (e) => {
  document.querySelector("tbody").innerHTML = "";
  e.target.disabled = true;
  resetPickedStudent();
});
