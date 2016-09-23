var student_array = [];
var studentObj;
var student_name;
var student_course;
var student_grade;
var studentId;
var studentIdArray = [];


function addClicked() {
    console.log("u clicked added");
    addStudent();
    // updateData();
}

function cancelClicked() {
    console.log("you clicked cancel");
    clearAddStudentForm();
}

function addStudent() {
    student_name = $("#studentName").val();
    student_course = $("#course").val();
    student_grade = $("#studentGrade").val();
    if (!isNaN(student_name) || isNaN(student_grade)) {
        console.log("student name is incorrect or student grade is incorrect");
        return
    }
    if (student_name === "" || student_course === "" || student_grade === "") {
        console.log("you have empty inputs incorrect");
        return
    } else {
        studentObj = {
            name: student_name,
            course: student_course,
            grade: student_grade
        };
    }
    addStudentToDataBase();
    clearAddStudentForm();

}

function clearAddStudentForm() {
    console.log("you clicked clear Add student form");
    $("#studentName").val("");
    $("#studentGrade").val("");
    $("#course").val("");
}

function calculateAverage() {
    var total = 0;
    for (var i = 0; i < student_array.length; i++) {
        total += parseInt(student_array[i].grade);
    }
    var avg = Math.floor(total / student_array.length);
    $(".avgGrade").html("");
    $(".avgGrade").append((avg) + "%");
    console.log(avg);
}

function updateData() {
    calculateAverage();
    updateStudentList();
}

function updateStudentList() {
    $(".table_body").html("");
    for (i = 0; i < student_array.length; i++) {
        addStudentToDom(student_array[i]);
    }
}

function addStudentToDom(studentObj) {
    var td = $('<tr>');
    var name_td = $("<td>").html(studentObj.name);
    var course_td = $("<td>").html(studentObj.course);
    var grade_td = $("<td>").html(studentObj.grade);
    var button_td = $("<td><button type='button' class='btn btn-danger'>Delet</button></td>").click(function () {
        var item_clicked = student_array.indexOf(studentObj);
        console.log("you clicked delet", item_clicked);
        td.remove();
        calculateAverage();
        deletStudentFromDataBase(item_clicked);
        removeObj(studentObj);
    });
    td.append(name_td, course_td, grade_td, button_td);
    $(".table_body").append(td);
}

function reset() {
    inputName = "";
    inputCourse = "";
    inputGrade = "";
    student_array = [];
}

function removeObj(studentObj) {
    console.log(student_array.indexOf(studentObj));
    student_array.splice(student_array.indexOf(studentObj), 1);
    console.log(studentObj);
    console.log(student_array);
}

function getDataServer() {

    console.log("running ajax)");
    $.ajax({
        dataType: 'json',
        data: {api_key: "Yd2V1lB6e5"},
        method: "post",
        url: 'http://s-apis.learningfuze.com/sgt/get',
        success: function (response) {
            student_array = [];
            console.log('success call');
            console.log(response);
            student_array = response.data.concat(student_array);
            for (var i in response.data) {
                studentId = response.data[i].id;
                studentIdArray.push(studentId);
                console.log(studentId);
                console.log(studentIdArray);
            }
            updateData();

        }
    })
}
function addStudentToDataBase() {
    console.log('running');

    $.ajax({
        dataType: 'json',
        data: {
            api_key: "Yd2V1lB6e5",
            name: student_name,
            course: student_course,
            grade: student_grade
        },
        method: "post",
        url: 'http://s-apis.learningfuze.com/sgt/create?api_key=Yd2V1lB6e5',
        success: function (response) {
            console.log('success call');
            console.log(response);
            studentId = response.new_id;
            studentObj = {
                name: student_name,
                course: student_course,
                grade: student_grade,
                id: studentId
            }
            console.log(studentObj);
            student_array.push(studentObj);
            console.log(student_array);
            updateData();
        }
    })
}
function deletStudentFromDataBase(item_clicked) {
    console.log('deletinggggg', item_clicked);
    var item = student_array[item_clicked];
    console.log('item', item);
    var data = {
        api_key: "Yd2V1lB6e5",
        student_id: item.id
    }
    $.ajax({
        dataType: 'json',
        data: data,
        method: "post",
        url: 'http://s-apis.learningfuze.com/sgt/delete?api_key=Yd2V1lB6e5',
        success: function (response) {
            console.log('success call');
            console.log(response);
        },
        errors: function () {
            console.log("ERROR")
        }
    })
}
$(document).ready(function () {
    student_name = $("#studentName").val();
    student_course = $("#course").val();
    student_grade = $("#studentGrade").val();

});