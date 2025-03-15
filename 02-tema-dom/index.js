/**
 * To do
 * get names from input
 * change random color as default when reload page
 *
 */

const studentName = document.querySelector("#student-name");
const studentColor = document.querySelector("#student-color");

// BUTTONS RERERENCE
const btnAddStudent = document.querySelector("#add-student-btn");

// FUNCTIONS

const randomStudentColor = () => {
  const specter = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += specter[Math.floor(Math.random() * specter.length)];
  }
  console.log(color);
  return color;
};

const getStudentName = () => {
  const html = `
    <tr>
        <td>
            <img
                src="https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${studentName.value}
                alt="avatar"
                class="img-thumbnail me-2"
            />
                    ${studentName.value}
        </td>
        <td class="text-end">
            <button class="btn btn-outline-secondary btn-sm">
                delete
            </button>
        </td>
    </tr>
  `;
  document.querySelector("#student-list").insertAdjacentHTML("beforeend", html);
  studentColor.value = randomStudentColor();

  //   document.querySelector(".btn").addEventListener("click", (e) => {
  //     console.log(e.target);
  //     console.log("anything");
  //   });
};

btnAddStudent.addEventListener("click", (e) => {
  e.preventDefault();
  getStudentName();
});
