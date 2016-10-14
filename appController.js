app.controller("appController", function (myFactory) {
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

