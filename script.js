var app = angular.module('myApp', []);

app.controller("myController", function ($http) {

    var self = this;
    this.data = {};
    this.studentArray = [];
    this.studentName = "";
    this.studentCourse = "";
    this.studentGrade = "";
    this.average = 0;

    this.addClicked = function () {                               //add new student to the database
        if (!isNaN(self.studentName) || isNaN(self.studentGrade)) {
            console.log("student name is incorrect or student grade is incorrect");
            return
        }
        if (self.studentName === "" || self.studentCourse === "" || self.studentGrade === "") {
            console.log("you have empty inputs incorrect");
            return
        } else {
            self.data = {
                name: self.studentName,
                course: self.studentCourse,
                grade: self.studentGrade
            };
        }
        console.log(self.data);

        this.addStudentToDataBase();
        this.cancelClicked();
    };

    this.getDataServer = function () {                            //get data from the server
        $http({
            datatype: "json",
            data: $.param({api_key: "Yd2V1lB6e5"}),
            method: "post",
            url: 'http://s-apis.learningfuze.com/sgt/get',
            cache: false,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(
                function (response) {
                    console.log(response);
                    console.log(response.data.data);
                    self.studentArray = response.data.data;
                    console.log(self.studentArray);
                    self.calculateAverage();
                });

    };

    this.addStudentToDataBase = function () {                //add student to the database on the server
        $http({
            datatype: "json",
            method: "post",
            url: 'http://s-apis.learningfuze.com/sgt/create?api_key=Yd2V1lB6e5',
            cache: false,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
                api_key: "Yd2V1lB6e5",
                name: self.studentName,
                course: self.studentCourse,
                grade: self.studentGrade
            })
        })
            .then(
                function (response) {
                    self.data.id = response.data.new_id;
                    self.studentArray.push(self.data);
                    console.log(self.studentArray);
                    self.calculateAverage();
                })
    };

    this.deletStudentFromDataBase = function (index) {              // delet student from the databse, from the server
        console.log('deletinggggg', index);
        var item = self.studentArray[index];
        console.log('item', item);
        $http({
            dataType: 'json',
            method: "post",
            url: 'http://s-apis.learningfuze.com/sgt/delete',
            cache: false,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
                api_key: "Yd2V1lB6e5",
                student_id: item.id
            })

        })
            .then(
                function (response) {
                    console.log('success call: ', response);
                    self.studentArray.splice(index, 1);
                    console.log(self.studentArray);
                    self.calculateAverage();
                })
    };

    this.calculateAverage = function () {
        var total = 0;
        for (var i = 0; i < self.studentArray.length; i++) {
            total += parseInt(self.studentArray[i].grade);
        }
        self.average = Math.floor(total / self.studentArray.length);
        console.log(self.average);
    };

    this.cancelClicked = function () {                            //clear the input forms
        this.studentName = "";
        this.studentCourse = "";
        this.studentGrade = "";
    };
});

app.controller("formController", function () {      //adding

});
app.controller("bodyController", function () {       // deleting

});






