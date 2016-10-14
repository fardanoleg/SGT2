app.controller("tableController", function (myFactory, $log) {

    this.studentArray = function () {
        return myFactory.studentArray;
    };
    this.deletStudentFromDataBase = function (index) {
        myFactory.deletStudentFromDataBase(index).then(function (response) {
                $log.info('Data from the controller of deleting item:', response)
            }, function (response) {
                $log.info('Data from the controller of deleting item: ', response);
            });
    }
});
