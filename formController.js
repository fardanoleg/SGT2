app.controller('formController', function (myFactory, $log) {
    var self = this;
    this.studentName = "";
    this.studentCourse = "";
    this.studentGrade = "";


    this.getDataServer = function () {
        myFactory.getData().then(function (response) {
            $log.info('Obtained data in form controller: ', response);
        })
    };
    this.addClicked = function () {
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
        myFactory.addStudentToDataBase(data).then(function (response) {
            $log.info('Data from the formController of added item: ', response)
        });
        this.cancelClicked();
    };
    this.cancelClicked = function () {
        this.studentName = "";
        this.studentCourse = "";
        this.studentGrade = "";
    }

});