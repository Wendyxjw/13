var myApp = angular.module("exampleApp", [])
    .controller("defaultCtrl", function ($scope) {
        $scope.city = "London";
        $scope.cities = ["London", "New York", "Paris"];
        $scope.getCountry = function (city) {
            switch (city) {
                case "London":
                    return "UK";
                case "New York":
                    return "USA";
            }
        }

    })
    .service("ZipCodes", function ($rootScope) {
        return {
            setZipCode: function (type, zip) {
                this[type] = zip;
                $rootScope.$broadcast("zipCodeUpdated", {
                    type: type, zipCode: zip
                });
            }
        }
    })
    .controller("simpleCtrl", function ($scope, ZipCodes) {
        $scope.$on("zipCodeUpdated", function (event, args) {
            $scope[args.type] = args.zipCode;
        })
        $scope.setAddress = function (type, zip) {
            ZipCodes.setZipCode(type, zip);
            console.log("Type:" + type + " zipCode:" + zip);
        }
        $scope.copyAddress = function () {
            $scope.zip = $scope.billingZip;
        }
    })

    .controller("topCtrl", function ($scope) {
        // $scope.dataValue = "Hello,Adam";原型链和作用域
        $scope.data = {
            dataValue: "Hello,Adam"
        }
        $scope.reverseText = function () {
            $scope.data.dataValue = $scope.data.dataValue.split("").reverse().join("");
        }
        $scope.changeCase = function () {
            var result = [];
            angular.forEach($scope.data.dataValue.split(""), function (char, index) {
                result.push(index % 2 == 1 ? char.toString().toUpperCase() : char.toString().toLowerCase());
            })
            $scope.data.dataValue = result.join("");
        }
    })
    .controller("firstCtrl", function ($scope) {
        $scope.changeCase = function () {
            $scope.data.dataValue = $scope.data.dataValue.toUpperCase();
        }
    })
    .controller("secondCtrl", function ($scope) {
        $scope.changeCase = function () {
            $scope.data.dataValue = $scope.data.dataValue.toLowerCase();
        }
        $scope.shiftFour = function () {
            var result = [];
            angular.forEach($scope.data.dataValue.split(""), function (char, index) {
                result.push(index < 4 ? char.toUpperCase() : char);
            })
            $scope.data.dataValue = result.join("");
        }

    })
    .controller("jquiCtrl", function ($scope) {
        $scope.buttonEnabled=true;
        $scope.clickCounter=0;
        $scope.handleClick=function(){
            $scope.clickCounter++;
        }
        $scope.$watch('buttonEnabled',function(newValue){
            $("#jqui button").button({
                disabled:!newValue
            })
        })
    })