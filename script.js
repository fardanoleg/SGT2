var student_array = [];
var studentObj = {
    name: "",
    course: "",
    grade: ""
};
var student_name = null;
var student_course = null;
var student_grade = null;

function addClicked() {
    console.log("u clicked added");
    addStudent();
    updateData();
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked() {
    console.log("you clicked cancel");
    clearAddStudentForm();
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent() {
    student_name = $("#studentName").val();
    student_course = $("#course").val();
    student_grade = $("#studentGrade").val();

    studentObj = {
        name: student_name,
        course: student_course,
        grade: student_grade
    };

    console.log(studentObj);
    student_array.push(studentObj);
    console.log(student_array);
    clearAddStudentForm();
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm() {
    console.log("you clicked clear Add student form");
    $("#studentName").val("");
    $("#studentGrade").val("");
    $("#course").val("");
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage() {
    var total = 0;
    for (var i = 0; i < student_array.length; i++) {
        total += parseInt(student_array[i].grade);
    }
    console.log(total);
    var avg = Math.floor(total / student_array.length);
    $(".avgGrade").html("");
    $(".avgGrade").append(avg);
    console.log(avg);
}
/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData() {
    calculateAverage();
    updateStudentList();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {
    $(".table_body").html("");
    for (i = 0; i < student_array.length; i++) {
        addStudentToDom(student_array[i]);
    }
}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(studentObj) {
    var td = $('<tr>');
    var name_td = $("<td>").html(studentObj.name);
    var course_td = $("<td>").html(studentObj.course);
    var grade_td = $("<td>").html(studentObj.grade);
    var button_td = $("<td><button type='button' class='btn btn-danger'>Delet</button></td>").click(function () {
        td.remove();
        removeObj();
        calculateAverage();
    });
    td.append(name_td, course_td, grade_td, button_td);
    $(".table_body").append(td);
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset() {
    inputName = "";
    inputCourse = "";
    inputGrade = "";
    student_array = [];
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
function removeObj(studentObj) {
    student_array.splice(student_array.indexOf(studentObj), 1);
    console.log(studentObj);
    console.log(student_array);
}
// function getDataServer(){
//     $.ajax({
//       dataType: 'json',
//         method: "get",
//         url: 's-apis.learningfuze.com/sgt/get',
//         api_key: ''
//         success: function(response){
//           console.log('success call');
//         }
//     })
// }