var app = angular.module('myApp', []);

// app.config(function(myProviderProvider){
//     myProviderProvider.config.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
// });


app.factory("myFactory", function ($http) {
    var server = {};
    server.studentArray = [];

    server.getDataServer = function () {                            //get data from the server
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
                    server.studentArray = response.data.data;
                });
    };
    server.addStudentToDataBase = function (Data) {        //add student to the database on the server
        $http({
            datatype: "json",
            method: "post",
            url: 'http://s-apis.learningfuze.com/sgt/create?api_key=Yd2V1lB6e5',
            cache: false,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
                api_key: "Yd2V1lB6e5",
                name: Data.name,
                course: Data.course,
                grade: Data.grade
            })
        })
            .then(
                function (response) {
                    var obj={};
                    console.log(response);
                    obj.id = response.data.new_id;
                    obj.name = Data.name;
                    obj.course = Data.course;
                    obj.grade = Data.grade;
                    server.studentArray.push(obj);

                    console.log(server.studentArray);
                })
    };

    server.deletStudentFromDataBase = function (index) {              // delet student from the databse, from the server
        var item = server.studentArray[index];
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
                    server.studentArray.splice(index, 1);
                    console.log(server.studentArray);
                    // server.calculateAverage();
                })
    };
    return server;
});

app.controller("myController", function (myFactory) {
    this.calculateAverage = function () {
        var average = 0;
        var total = 0;
        for (var i = 0; i < myFactory.studentArray.length; i++) {
            total += parseInt(myFactory.studentArray[i].grade);
        }
        average = Math.floor(total / myFactory.studentArray.length);
        return average
    };

});

app.controller("formController", function (myFactory) {      //adding
    var self = this;
    this.studentName = "";
    this.studentCourse = "";
    this.studentGrade = "";
    this.getDataServer = function () {
        myFactory.getDataServer();
    };
    this.addClicked = function () {                               //add new student to the database
        if (!isNaN(self.studentName) || isNaN(self.studentGrade)) {
            console.log("student name is incorrect or student grade is incorrect");
            return
        }
        if (self.studentName === "" || self.studentCourse === "" || self.studentGrade === "") {
            console.log("you have empty inputs incorrect");
            return
        } else {
            var data = {
                name: self.studentName,
                course: self.studentCourse,
                grade: self.studentGrade
            };
            console.log(data);
        }
        myFactory.addStudentToDataBase(data);
        this.cancelClicked();
    };
    this.cancelClicked = function () {                            //clear the input forms
        this.studentName = "";
        this.studentCourse = "";
        this.studentGrade = "";
    };
});

app.controller("bodyController", function (myFactory) {

    this.studentArray = function () {
        return myFactory.studentArray;
    };
    this.deletStudentFromDataBase = function (index) {
        myFactory.deletStudentFromDataBase(index);
    }
});






