// var app = angular.module('myApp', []);

app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
    $httpProvider.defaults.cache = false;
    $httpProvider.defaults.datatype = "json";
});


app.factory("myFactory", function ($http, $log, $q) {
    var server = {};
    server.studentArray = [];
    var baseUrl = 'http://s-apis.learningfuze.com/sgt/';
    var apiKey = 'Yd2V1lB6e5';

    server.httpRequest = function (url, data) {  //method to call and return $http
        $log.info("request$http running ");
        return $http({
            method: 'post',
            url: url,
            data: $.param(data)
        })
    };
    server.getData = function () {                            //get data from the server
        var url = baseUrl + 'get';
        var sendData = {api_key: apiKey};
        var defer = $q.defer();
        server.httpRequest(url, sendData)
            .then(function (response) {
                $log.info('Data received: ', response);
                defer.resolve(response.data.data);
                server.studentArray = response.data.data;
                $log.info('Array: ', server.studentArray);
            });
        return defer.promise;

    };
    server.addStudentToDataBase = function (Data) {        //add student to the database on the server
        var url = baseUrl + 'create';
        var sendData = {
            api_key: apiKey,
            name: Data.name,
            course: Data.course,
            grade: Data.grade
        };
        var defer = $q.defer();
        server.httpRequest(url, sendData)
            .then(function (response) {
                $log.info("Data when adding: ", response);

                var obj = {};                          // creating object yo store key value pair and store in the array (the reason to display)
                obj.id = response.data.new_id;
                obj.name = Data.name;
                obj.course = Data.course;
                obj.grade = Data.grade;
                server.studentArray.push(obj);
                $log.info('New array after adding items: ', server.studentArray);
                defer.resolve(response.data.new_id);
            });
        return defer.promise;
    };
    server.deletStudentFromDataBase = function (index) {              // delet student from the databse, from the server
        var url = baseUrl + 'delete';
        var defer = $q.defer();
        var item = server.studentArray[index];
        var sendData = {
            api_key: apiKey,
            student_id: item.id
        };
        $log.info('Index selected ', item);
        server.httpRequest(url, sendData)
            .then(function (response) {
                $log.info('Data after deleting: ', response.data);
                if (response.data.success) {
                    defer.resolve(response.data);
                    server.studentArray.splice(index, 1);
                    $log.info('new array after deleting: ', server.studentArray);
                } else {
                    defer.reject(response.data);
                    $log.info('You cannto delet');
                }
            });
        return defer.promise;
    };
    return server;
});








