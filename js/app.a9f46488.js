(function () {
    'use strict';

    angular.module('selfService')
        .directive('apiValidate', ['$compile', apiValidate]);

    function apiValidate($compile) {
        return {
            restrict: 'E',
            link: function (scope, elm) {
                var template = '<div class="required" ng-show="respERROR">' +
                    '<div ng-repeat="errorArray in respERROR.data.errors">' +
                    '<label><i class="fa fa-exclamation-circle"></i> ' +
                    '{{' + 'errorArray.userMessageGlobalisationCode' + ' | translate:error.args }}' +
                    '</label>' +
                '</div></div></div><br/>';
                elm.html('').append($compile(template)(scope));
            }
        };
    }

})();
(function(){
	'use strict';

	angular.module('selfService')
		.controller('ReviewBeneficiaryDialogCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$filter', '$mdDialog', '$mdToast', 'addBeneficiaryFormData', 'BeneficiariesService', ReviewBeneficiaryDialogCtrl])

	function ReviewBeneficiaryDialogCtrl($scope, $rootScope, $state, $stateParams, $filter, $mdDialog, $mdToast, addBeneficiaryFormData, BeneficiariesService) {
		
		var vm = this;
		vm.addBeneficiaryFormData = Object.assign({}, addBeneficiaryFormData);
		vm.cancel = cancel;
		vm.accountType = accountType;
		vm.add = add;
		
		function cancel() {
			$mdDialog.cancel();
		}

		function accountType(id) {
					if (1 == id) {
						return 'Loan Account';
					} else {
						return 'Savings Account';
					}
			}

		function add() {
			// Sending
			BeneficiariesService.beneficiary().save(vm.addBeneficiaryFormData).$promise.then(function () {
					$mdDialog.hide("success");
					$mdToast.show(
						$mdToast.simple()
							.textContent('Beneficiary Added Successfully')
							.position('top right')
					);
					vm.clearForm();
			}, function (resp) {
				var errors = '';
				if (resp.data) {
					errors = resp.data.errors.map(function (data) {
						return data.defaultUserMessage;
					});
					errors.join(' ');
				}
				$mdToast.show(
					$mdToast.simple()
						.textContent('Error in Adding Beneficiary: ' + errors)
						.position('top right')
				);
				$mdDialog.hide("error");
			});
		}
	}
})();
(function () {
    'use strict';

    angular.module('selfService')
        .controller('VerificationCtrl', ['$scope', '$state', '$mdToast', 'AuthService', '$location',  VerificationCtrl]);


    function VerificationCtrl($scope, $state, $mdToast, AuthService, $location) {
        var vm = this;
        vm.verifyData = {};

      /*  function clearForm() {
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            vm.verifyData={};

        }*/

        $scope.submit = function() {
            AuthService.verifyUser(vm.verifyData).then(function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('User has been successfully registered')
                        .position('top right')
                );
                $location.path('/login');
                vm.clearForm();
            }, function (resp) {
                var errors = '';
                if(resp.data){
                    errors = resp.data.errors.map(function (data) {
                        return data.defaultUserMessage;
                    });
                    errors.join(' ');
                }
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error in creating user: ' + errors)
                        .position('top right')
                );

            });

        }

    }

})();

(function(){
    'use strict';

    angular.module('selfService')
        .controller('ReviewTransferDialogCtrl', ['$scope', '$rootScope', '$stateParams', '$filter', '$mdDialog', '$mdToast', 'transferFormData', 'AccountTransferService', ReviewTransferDialogCtrl]);

    function ReviewTransferDialogCtrl($scope, $rootScope, $stateParams, $filter, $mdDialog, $mdToast, transferFormData, AccountTransferService) {

        var vm = this;
        vm.transferFormData = Object.assign({}, transferFormData);
        vm.cancel = cancel;
        vm.transfer = transfer;

        vm.transferFormData.transferDate = $filter('DateFormat')(transferFormData.transferDate);

        function cancel() {
            $mdDialog.cancel();
        }

        function transfer() {
            // Transforming Request Data
            var transferData = {
                fromOfficeId: vm.transferFormData.fromAccount.officeId,
                fromClientId: vm.transferFormData.fromAccount.clientId,
                fromAccountType: vm.transferFormData.fromAccount.accountType.id,
                fromAccountId: vm.transferFormData.fromAccount.accountId,
                toOfficeId: vm.transferFormData.toAccount.officeId,
                toClientId: vm.transferFormData.toAccount.clientId,
                toAccountType: vm.transferFormData.toAccount.accountType.id,
                toAccountId: vm.transferFormData.toAccount.accountId,
                dateFormat: "dd MMMM yyyy",
                locale: "en",
                transferDate: vm.transferFormData.transferDate,
                transferAmount: "" + vm.transferFormData.amount,
                transferDescription: vm.transferFormData.remark
            }
            // Sending
            AccountTransferService.transfer().save(transferData).$promise.then(function () {
               $mdDialog.hide("success");
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Transfer Completed Successfully')
                        .position('top right')
                );
            }, function (resp) {
                var errors = '';
                if(resp.data){
                    errors = resp.data.errors.map(function (data) {
                        return data.defaultUserMessage;
                    });
                    errors.join(' ');
                }
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error in Completing Transfer: ' + errors)
                        .position('top right')
                );
                $mdDialog.hide("error");

            });

        }
    }
})();
(function(){
    'use strict';

    angular.module('selfService')
        .controller('ReviewTPTDialogCtrl', ['$scope', '$rootScope', '$stateParams', '$filter', '$mdDialog', '$mdToast', 'transferFormData', 'AccountTransferService', ReviewTPTDialogCtrl]);

    function ReviewTPTDialogCtrl($scope, $rootScope, $stateParams, $filter, $mdDialog, $mdToast, transferFormData, AccountTransferService) {

        var vm = this;
        vm.transferFormData = Object.assign({}, transferFormData);
        vm.cancel = cancel;
        vm.transfer = transfer;

        vm.transferFormData.transferDate = $filter('DateFormat')(transferFormData.transferDate);

        function cancel() {
            $mdDialog.cancel();
        }

        function transfer() {
            // Transforming Request Data
            var transferData = {
                fromOfficeId: vm.transferFormData.fromAccount.officeId,
                fromClientId: vm.transferFormData.fromAccount.clientId,
                fromAccountType: vm.transferFormData.fromAccount.accountType.id,
                fromAccountId: vm.transferFormData.fromAccount.accountId,
                toOfficeId: vm.transferFormData.toAccount.officeId,
                toClientId: vm.transferFormData.toAccount.clientId,
                toAccountType: vm.transferFormData.toAccount.accountType.id,
                toAccountId: vm.transferFormData.toAccount.accountId,
                dateFormat: "dd MMMM yyyy",
                locale: "en",
                transferDate: vm.transferFormData.transferDate,
                transferAmount: "" + vm.transferFormData.amount,
                transferDescription: vm.transferFormData.remark
            }
            // Sending
            AccountTransferService.transfer().save({type: "tpt"},transferData).$promise.then(function () {
               $mdDialog.hide("success");
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Transfer Completed Successfully')
                        .position('top right')
                );
            }, function (resp) {
                var errors = '';
                if(resp.data){
                    errors = resp.data.errors.map(function (data) {
                        return data.defaultUserMessage;
                    });
                    errors.join(' ');
                }
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error in Completing Transfer: ' + errors)
                        .position('top right')
                );
                $mdDialog.hide("error");

            });

        }
    }
})();

(function () {
    'use strict';

    angular.module('selfService')
        .controller('ViewReportsCtrl', ['$scope', '$rootScope', '$state','$location', ViewReportsCtrl]);

    function ViewReportsCtrl($scope, $rootScope, $state, $location) {
        var vm = this;
        vm.selected = [];
        vm.routeTo = routeTo;

        function routeTo(report) {
            $location.path('/run_report/' + report.reportName + '/' + report.id + '/' + report.reportType);
        }

        vm.reports = [];

    }

})();
(function () {
    'use strict';

    angular.module('selfService')
        .service('RunReportService', ['$q', '$http', '$rootScope', '$state', '$resource', 'BASE_URL', RunReportService]);

    function RunReportService($q, $http, $rootScope, $state, $resource, BASE_URL) {

        this.reports = function () {

            return $resource(BASE_URL + "/self/runreports/:reportName" + '?R_officeId='+ ':id', {reportName: '@reportName', id: '@id'});


        }

    }

})();
(function () {
    'use strict';

    angular.module('selfService')
        .controller('RunReportCtrl', ['$http', '$scope', '$rootScope','$state', '$stateParams', '$resource', '$location', 'dateFilter', 'BASE_URL', '$sce', 'RunReportService', RunReportCtrl]);

    function RunReportCtrl($http, $scope, $rootScope, $state, $stateParams, $resource, $location, dateFilter, BASE_URL, $sce, RunReportService) {
        var vm = this;


        vm.reportName = $stateParams.name;
        vm.id = $stateParams.id;
        vm.reportData = {};
        vm.reportData.columnHeaders = [];

        vm.isDecimal = isDecimal


        RunReportService.reports().get({reportName: vm.reportName, id: vm.id}).$promise.then(function(data) {
            vm.reportData = data;
            vm.reportData.columnHeaders = data.columnHeaders;
        });

        function isDecimal (index) {
            if(vm.reportData.columnHeaders && vm.reportData.columnHeaders.length > 0){
                for(var i=0; i<vm.reportData.columnHeaders.length; i++){
                    if(vm.reportData.columnHeaders[index].columnType == 'DECIMAL'){
                        return true;
                    }
                }
            }
            return false;
        }

    }

})();

(function () {
    'use strict';

    angular.module('selfService')
        .directive('translateHelper', translateHelper);

    function translateHelper() {
        var directive = {
            restrict: 'E',
            controller: 'translateHelperCtrl',
            controllerAs: 'vm',
            scope: {},
            templateUrl: 'src/common/translate-helper/translate-helper.html'
        }

        return directive;
    }

})();

(function () {
    'use strict';

    angular.module('selfService')
        .controller('translateHelperCtrl', ['$scope', '$rootScope', '$translate', translateHelperCtrl]);

    function translateHelperCtrl($scope, $rootScope, $translate) {
        var vm = this;
        vm.langCode = getLangCode();
        vm.updateLang = updateLang;

        function getLangCode() {
            return $translate.use();
        }

        function updateLang() {
            $translate.use(vm.langCode);
        }
    }

})();

(function () {
    'use strict';

    angular.module('selfService')
        .factory('APIRequestInterceptor', ['$rootScope', '$q', APIRequestInterceptor]);

    function APIRequestInterceptor($rootScope, $q) {
        return {
            request: function(config) {
                $rootScope.blockUI = true;
                $rootScope.respERROR = null;
                return $q.resolve(config);
            },
            requestError: function (rejection) {
                $rootScope.blockUI = false;
                $rootScope.respERROR = null;
                return $q.reject(rejection);
            },
            response: function(response) {
                $rootScope.blockUI = false;
                $rootScope.respERROR = null;
                return $q.resolve(response);
            },
            responseError: function(response) {
                $rootScope.blockUI = false;
                $rootScope.respERROR = response;
                return $q.reject(response);
            }
        }
    }

})();

(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesListCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$mdDialog', '$mdToast', 'BeneficiariesService', BeneficiariesListCtrl]);

    function BeneficiariesListCtrl($scope, $rootScope, $state, $stateParams, $mdDialog, $mdToast, BeneficiariesService) {

        var vm = this;
        vm.loadingBeneficiaries = true;
        vm.beneficiaries = [];
        vm.beneficiariesFilter = "";
        vm.page = 1;
        vm.query = {
            limit: 5,
            offset: 0
        }

        vm.getBeneficiaries = getBeneficiaries();
        vm.addBeneficiary = addBeneficiary;
        vm.goToEdit = goToEdit;
        vm.deleteConfirm = deleteConfirm;

        function getBeneficiaries() {
            BeneficiariesService.getBeneficiaries().query().$promise.then(function(data) {
                vm.beneficiaries = data;
                vm.loadingBeneficiaries = false;
            });
        }

        function addBeneficiary() {
            $state.go('app.addbeneficiary');
        }

        function goToEdit(beneficiary) {
            $state.go('app.editbeneficiary',{
                id: beneficiary.id,
                data: beneficiary
            });
        }

        function deleteConfirm(ev, beneficiary) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete?')
                .textContent('This beneficiary will be removed from your account')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Delete!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
               BeneficiariesService.beneficiary().delete({
                   id: beneficiary.id
               }, function() {
                   $mdToast.show(
                       $mdToast.simple()
                           .textContent('Beneficiary Deleted Successfully')
                           .position('top right')
                   );
                   vm.beneficiaries = vm.beneficiaries.filter(function (benef) {
                       return benef.id !== beneficiary.id
                   });
               });
            }, function() {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error in Deleting Beneficiary')
                        .position('top right')
                );
            });
        }
    }
})();
(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesEditCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$mdToast', 'BeneficiariesService', BeneficiariesEditCtrl]);

    function BeneficiariesEditCtrl($scope, $rootScope, $state, $stateParams, $mdToast, BeneficiariesService) {

        var vm = this;
        vm.editBeneficiaryFormData = {
            "locale": "en_GB"
        };
        vm.beneficiary = $stateParams.data;
        vm.accountTypeOptions = [];
        vm.getBeneficiaryTemplate = getBeneficiaryTemplate();
        vm.clearForm = clearForm;
        vm.submit = submit;

        function getBeneficiaryTemplate() {
            BeneficiariesService.template().get().$promise.then(function (data) {
                vm.accountTypeOptions = data.accountTypeOptions;
            });

            if(vm.beneficiary !== null) {
                vm.editBeneficiaryFormData.accountType = vm.beneficiary.accountType.id;
                vm.editBeneficiaryFormData.accountNumber = vm.beneficiary.accountNumber;
                vm.editBeneficiaryFormData.officeName = vm.beneficiary.officeName;
                vm.editBeneficiaryFormData.transferLimit = vm.beneficiary.transferLimit;
                vm.editBeneficiaryFormData.name = vm.beneficiary.name;
            }
        }

        function clearForm() {
            vm.editBeneficiaryFormData = {
                "locale": "en_GB"
            };
            $scope.editBeneficiaryForm.$setPristine();
            $scope.addBeneficiaryForm.$setUntouched();
        }

        function submit() {
            var data = {
                name: vm.editBeneficiaryFormData.name,
                transferLimit: vm.editBeneficiaryFormData.transferLimit
            }

            BeneficiariesService.beneficiary().update({id: vm.beneficiary.id}, data).$promise.then(function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Beneficiary Updated Successfully')
                        .position('top right')
                );
            }, function (resp) {
                var errors = '';
                if(resp.data){
                    errors = resp.data.errors.map(function (data) {
                        return data.defaultUserMessage;
                    });
                    errors.join(' ');
                }
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error in Adding Beneficiary: ' + errors)
                        .position('top right')
                );

            });
        }
    }
})();
(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesAddCtrl', ['$scope', '$state', '$stateParams', '$filter', '$mdDialog', '$mdToast', 'BeneficiariesService', BeneficiariesAddCtrl]);

    function BeneficiariesAddCtrl($scope, $state, $stateParams, $filter, $mdDialog, $mdToast, BeneficiariesService) {

        var vm = this;
        vm.addBeneficiaryFormData = {
            "locale": "en_GB"
        };
        vm.accountTypeOptions = [];
        vm.getBeneficiaryTemplate = getBeneficiaryTemplate();
        vm.clearForm = clearForm;
        vm.submit = submit;

        function getBeneficiaryTemplate() {
            BeneficiariesService.template().get().$promise.then(function (data) {
                vm.accountTypeOptions = data.accountTypeOptions;
            })
        }

        function clearForm() {
            $scope.addBeneficiaryForm.$setPristine();
            $scope.addBeneficiaryForm.$setUntouched();
            vm.addBeneficiaryFormData = {
                "locale": "en_GB"
            };
        }

        function submit(ev) {
            $mdDialog.show({
                controller: 'ReviewBeneficiaryDialogCtrl',
                controllerAs: 'vm',
                templateUrl: 'src/beneficiaries/beneficiaries-add/review-beneficiary-dialog/review-beneficiary-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {addBeneficiaryFormData: vm.addBeneficiaryFormData},
                clickOutsideToClose: true
            }).then(function (result) {
                if (result === "success"){
                    clearForm();
                }
            }, function() {
                clearForm();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Add Beneficiary Cancelled')
                        .position('top right')
                );
            });
        }
    }
})();
(function () {
    'use strict';

    angular.module('selfService')
        .controller('RegisterCtrl', ['$scope', '$state', '$mdToast', 'AuthService', '$location',  RegisterCtrl]);

    /**
     * @module RegisterCtrl
     * @description
     * Handles Registration of self service user
     */
    function RegisterCtrl($scope, $state, $mdToast, AuthService, $location) {
        var vm = this;
        vm.clearForm = clearForm;

        vm.form={
            "authenticationMode" :"email"
        };


        function clearForm() {
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            vm.form = {
                "authenticationMode" :"email"
            };

        }

        $scope.submit = function() {
            AuthService.register(vm.form).then(function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Confirmation email is sent')              // The success part is not working as the response
                        .position('top right')                                  // is not in JSON format
                );
                vm.clearForm();
            }, function (resp) {
                var errors = '';
                if(resp.data){
                    errors = resp.data.errors.map(function (data) {
                        return data.defaultUserMessage;
                    });
                    errors.join(' ');
                }if(errors!=''){
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Error in creating user: ' + errors)
                            .position('top right')
                    );
                }
                else{
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Confirmation email is sent')
                            .position('top right')
                    );
                    $location.path('/verify');
                    vm.clearForm();
                }


            });

        }
    }

})();

(function () {
    'use strict';

    angular.module('selfService')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$mdToast', 'AUTH_EVENTS', 'AuthService', 'AccountService', LoginCtrl]);

    function LoginCtrl($scope, $rootScope, $state, $mdToast, AUTH_EVENTS, AuthService, AccountService) {

        var vm = this;
        vm.authenticating = false;

        /**
         * @method doLogin
         * @description To perform the login action on the page
         */
        $scope.doLogin = function () {
            vm.authenticating = true;
            AuthService.doLogin($scope.loginData).save().$promise
                .then(function (result) {
                    AuthService.setUser(result);
                    AccountService.getClients().get().$promise
                        .then(function (res) {
                            vm.authenticating = false;
                            if (res.pageItems.length !== 0) {
                                AccountService.setClientId(res.pageItems[0].id);
                                $mdToast.show(
                                    $mdToast.simple()
                                        .content("Successful Login")
                                        .hideDelay(2000)
                                        .position('top right')
                                );
                                $state.go("app.dashboard");
                            } else {
                                $mdToast.show(
                                    $mdToast.simple()
                                        .content("No Clients Found")
                                        .hideDelay(2000)
                                        .position('top right')
                                );
                                AuthService.logout();
                            }
                        })
                        .catch(function () {
                            vm.authenticating = false;
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Not a Self Service User")
                                    .hideDelay(2000)
                                    .position('top right')
                            );
                            AuthService.logout();
                        })
                }).catch(function () {
                    vm.authenticating = false;
                    $mdToast.show(
                        $mdToast.simple()
                            .content("Invalid Login Credentials")
                            .hideDelay(2000)
                            .position('top right')
                    );
                })
        }

    }

})();

(function () {
    'use strict';

    angular.module('selfService')
        .controller('ForgotPwdCtrl', ['$scope', '$state', '$mdToast', 'AuthService', 'AccountService', ForgotPwdCtrl]);

    /**
     * @module ForgotPwdCtrl
     * @description
     * Handles Forgot Password
     */
    function ForgotPwdCtrl() {

    }

})();

(function () {
    'use strict';
    //@todo Move this service to the common folder
    angular.module('selfService')
        .service('SavingsAccountService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', SavingsAccountService]);

    function SavingsAccountService($q, $http, $rootScope, $resource, BASE_URL) {

        this.savingsAccount = function () {
            return $resource(BASE_URL + '/self/savingsaccounts/:id',{id: '@id'});
        }
    }

})();


(function(){
	'use strict';

		angular.module('selfService')
			.controller('SavingsAccountViewCtrl', ['$state', '$stateParams', '$filter', 'SavingsAccountService', SavingsAccountViewCtrl]);
		
		/**
		 * @module SavingsAccountViewCtrl
		 * @description
		 * Handles the individial savings account detail page
		 */
		function SavingsAccountViewCtrl($state, $stateParams, $filter, SavingsAccountService) {

			var vm = this;
			vm.loadingSavingsAccount = true;

            /**
			 * @name statusClass
             * @type {string}
			 * @description Stores the status class of savings account
             */
            vm.statusClass = '';

            /**
			 * @name savingsAccountDetails
			 * @type {object}
			 * @description Stores the savings account details from server
             */
			vm.savingsAccountDetails = getSavingsDetail($stateParams.id);

            /**
			 * @name transactions
             * @type {Array}
             */
			vm.transactions = [];

			vm.getStatusClass = getStatusClass;
			vm.deposit = deposit;
			vm.transfer = transfer;

            /**
			 * @method getSavingsDetail
			 * @description Gets savings account detail from server
			 * @param id {number} Savings Account id
             */
			function getSavingsDetail(id) {
                SavingsAccountService.savingsAccount().get({id: id, associations: 'transactions,charges'}).$promise.then(function(res) {
					vm.loadingSavingsAccount = false;
					vm.savingsAccountDetails = res;
					vm.transactions = res.transactions;
					getStatusClass();
				});
			}

			function getStatusClass() {
                var statusClass = $filter('StatusLookup')(vm.savingsAccountDetails.status.code);
                statusClass = 'bg_' + statusClass;
                if(vm.savingsAccountDetails.subStatus.id !== 0) {
                    statusClass = $filter('StatusLookup')(vm.savingsAccountDetails.status.code+vm.savingsAccountDetails.subStatus.value);
				}

				vm.statusClass = statusClass;
			}

			function deposit() {
				$state.go('app.transfers', {
					toAccount: vm.savingsAccountDetails
				});
			}

			function transfer() {
				$state.go('app.transfers', {
					fromAccount: vm.savingsAccountDetails
				});
			}
		}
})();
(function () {
    'use strict';
    //@todo Move this service to the common folder
    angular.module('selfService')
        .service('LoanAccountService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', LoanAccountService]);

    function LoanAccountService($q, $http, $rootScope, $resource, BASE_URL) {

        this.loanAccount = function () {
            return $resource(BASE_URL + '/self/loans/:id',{id: '@id'});
        }
    }

})();


(function () {
    'use strict';

    angular.module('selfService')
        .controller('LoanAccountViewCtrl', ['$state', '$stateParams', '$filter', 'LoanAccountService', LoanAccountViewCtrl]);

    /**
     * @module LoanAccountViewCtrl
     * @description
     * Handles the Loan Account Details Page.
     */
    function LoanAccountViewCtrl($state, $stateParams, $filter, LoanAccountService) {

        var vm = this;

        /**
         * @name loadingLoanAccountInfo
         * @description flag to check whether account info is loaded or not
         * @type {boolean}
         */
        vm.loadingLoanAccountInfo = true;

        /**
         * @name loanAccountDetails
         * @type {object}
         * @description To store the loan Account details returned by server
         */
        vm.loanAccountDetails = getLoanDetails($stateParams.id);

        /**
         * @name statusClass
         * @type {string}
         * @description To store the css class for loan status [active, pending, ...]
         */
        vm.statusClass = '';

        vm.repaymentSchedule = {};

        vm.makePayment = makePayment;

        /**
         * @method getLoanDetails
         * @description To get the loan details from the server
         * @param id {number} Loan Account id
         */
        function getLoanDetails(id) {
            LoanAccountService.loanAccount().get({
                id: id,
                associations:'repaymentSchedule,transactions'
            }).$promise.then(function (res) {
                vm.loadingLoanAccountInfo = false;
                vm.loanAccountDetails = res;
                getStatusClass();
            });
        }

        /**
         * @method getStatusClass
         * @description To get the loan account status through the status lookup filter
         */
        function getStatusClass() {
            var statusClass = $filter('StatusLookup')(vm.loanAccountDetails.status.code);
            statusClass = 'bg_' + statusClass;
            if (vm.loanAccountDetails.inArrears) {
                statusClass += 'overdue';
            }
            vm.statusClass = statusClass;
        }

        function makePayment() {
            $state.go('app.transfers', {
                toAccount: vm.loanAccountDetails
            });
        }
    }
})();

(function () {
    'use strict';

    angular.module('selfService')
        .controller('AccountCtrl', ['$scope', '$rootScope', '$state', 'AccountService', 'AuthService', AccountCtrl]);

    function AccountCtrl($scope, $rootScope, $state, AccountService, AuthService) {

        var vm = this;
        vm.selected = [];
        vm.getAccounts = getAccounts;
        vm.onPaginate = onPaginate;
        vm.onReorder = onReorder;
        vm.routeTo = routeTo;
        vm.userData = AuthService.getUser();
        vm.clientId = getClient();//@todo check if this is behind the 2 calls
        vm.accounts = [];
        vm.loanAccounts = [];
        vm.savingsAccounts = [];
        vm.shareAccounts = [];
        vm.loadingAccountInfo = true;
        vm.tabIndex = sessionStorage.getItem("tab");

        vm.query = {
            limit: 5,
            offset: 1
        };

        function getClient() {
            AccountService.getClientId().then(function (clientId) {
                vm.clientId = clientId;
                getAccounts(clientId);
            });
        }

        function getAccounts(accountNo) {
            AccountService.getAllAccounts(accountNo).get().$promise.then(function (res) {
                vm.loanAccounts = res.loanAccounts;
                vm.savingsAccounts = res.savingsAccounts;
                vm.shareAccounts = res.shareAccounts;
                vm.loadingAccountInfo = false;
            });
        }

        function onPaginate(offset, limit) {
            getAccounts(angular.extend({}, vm.query, {offset: offset, limit: limit}));
        }

        function onReorder(order) {
            getAccounts(angular.extend({}, vm.query, {order: order}));
        }

        function routeTo(accountType, id) {
            var routingSlug = 'viewloanaccount';
            if ('savings' == accountType) {
                routingSlug = 'viewsavingsaccount';
                sessionStorage.setItem("tab", "1");
            } else if ('loan' == accountType) {
                routingSlug = 'viewloanaccount';
                sessionStorage.setItem("tab", "0");
            } else {
                routingSlug = 'viewshareaccount';
                sessionStorage.setItem("tab", "2");
            }
            $state.go('app.'+routingSlug, {id: id});
        }
    }

})();

(function () {
    'use strict';
    angular.module('selfService')
        .service('AccountTransferService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', AccountTransferService]);

    function AccountTransferService($q, $http, $rootScope, $resource, BASE_URL) {

        this.getTransferTemplate = function () {
            return $resource(BASE_URL + '/self/accounttransfers/template');
        }

        this.transfer = function () {
            return $resource(BASE_URL + '/self/accounttransfers');
        }

    }

})();

(function () {
    'use strict';

    angular.module('selfService')
        .controller('AccountTransferCtrl', ['$scope', '$stateParams', '$filter', '$mdDialog', '$mdDateLocale', '$mdToast', 'AccountTransferService', AccountTransferCtrl]);

    /**
     * @module AccountTransferCtrl
     * @description
     * Account Transfer Controller
     */
    function AccountTransferCtrl($scope, $stateParams, $filter, $mdDialog, $mdDateLocale, $mdToast, AccountTransferService) {

        var vm = this;
        vm.fromAccountOptions = [];
        vm.toAccountOptions = [];
        vm.transferFormData = getTransferFormDataObj()

        vm.disabledToAccount = false;
        vm.disabledfromAccount = false;

        vm.transferFormData = getTransferFormDataObj();
        vm.getTransferTemplate = getTransferTemplate();
        vm.clearForm = clearForm;
        vm.submit = submit;

        // FORMAT THE DATE FOR THE DATEPICKER
        $mdDateLocale.formatDate = function (date) {
            return $filter('date')(date, "dd-MM-yyyy");
        };

        function getTransferFormDataObj() {
            return {
                transferDate: new Date()
            };
        }

        function getTransferTemplate() {
            AccountTransferService.getTransferTemplate().get(function (data) {
                vm.fromAccountOptions = data.fromAccountOptions;
                vm.toAccountOptions = data.toAccountOptions;

                if($stateParams.toAccount) {
                    var i = 0;
                    for(i=0; i < vm.toAccountOptions.length; i++) {
                        if(vm.toAccountOptions[i].accountNo == $stateParams.toAccount.accountNo) {
                            vm.transferFormData.toAccount = vm.toAccountOptions[i];
                            vm.disabledToAccount = true;
                            break;
                        }
                    }
                }

                if($stateParams.fromAccount) {
                    for(i=0; i < vm.fromAccountOptions.length; i++) {
                        if(vm.fromAccountOptions[i].accountNo == $stateParams.fromAccount.accountNo) {
                            vm.transferFormData.fromAccount = vm.fromAccountOptions[i];
                            vm.disabledfromAccount = true;
                            break;
                        }
                    }
                }

            });
        }

        function clearForm() {
            vm.transferFormData = getTransferFormDataObj();
            $scope.transferForm.$setPristine();
            $scope.transferForm.$setUntouched();
        }

        function submit(ev) {
            $mdDialog.show({
                controller: 'ReviewTransferDialogCtrl',
                controllerAs: 'vm',
                templateUrl: 'src/transfers/review-transfer-dialog/review-transfer-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {transferFormData: vm.transferFormData},
                clickOutsideToClose: true
            }).then(function (result) {
                if(result === "success"){
                    clearForm();
                }
            }, function () {
                clearForm();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Transfer Cancelled')
                        .position('top right')
                );
            });
        }


    }
})();
(function () {
    'use strict';

    angular.module('selfService')
        .controller('TPTCtrl', ['$scope', '$rootScope', '$stateParams', '$filter', '$mdDialog', '$mdDateLocale', '$mdToast', 'AccountTransferService', TPTCtrl]);

    function TPTCtrl($scope, $rootScope, $stateParams, $filter, $mdDialog, $mdDateLocale, $mdToast, AccountTransferService) {

        var vm = this;
        vm.fromAccountOptions = [];
        vm.toAccountOptions = [];
        vm.transferFormData = getTransferFormDataObj()

        vm.getTransferTemplate = getTransferTemplate();
        vm.clearForm = clearForm;
        vm.submit = submit;

        // FORMAT THE DATE FOR THE DATEPICKER
        $mdDateLocale.formatDate = function (date) {
            return $filter('date')(date, "dd-MM-yyyy");
        };

        function getTransferFormDataObj() {
            return {
                transferDate: new Date()
            };
        }

        function getTransferTemplate() {
            AccountTransferService.getTransferTemplate().get({type: "tpt"},function (data) {
                vm.fromAccountOptions = data.fromAccountOptions;
                vm.toAccountOptions = data.toAccountOptions;
            });
        }

        function clearForm() {
            vm.transferFormData = getTransferFormDataObj();
            $scope.transferForm.$setPristine();
            $scope.transferForm.$setUntouched();
        }

        function submit(ev) {
            $mdDialog.show({
                controller: 'ReviewTPTDialogCtrl',
                controllerAs: 'vm',
                templateUrl: 'src/tpt/review-tpt-dialog/review-tpt-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {transferFormData: vm.transferFormData},
                clickOutsideToClose: true
            }).then(function (result) {
                if(result === "success"){
                    clearForm();
                }
            }, function () {
                clearForm();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Transfer Cancelled')
                        .position('top right')
                );
            });
        }


    }
})();
(function() {
    'use strict';

    angular.module('selfService')
        .service('SharesApplicationService', ['$resource', 'BASE_URL', SharesApplicationService]);

    /**
     * @module SharesApplicationService
     * @description
     * Service required for Shares Application
     */
    function SharesApplicationService() {


    }

})();
(function(){
    'use strict';

    angular.module('selfService')
        .controller('SharesApplicationCtrl', ['$scope', '$filter', '$mdToast', 'AccountService', 'SharesApplicationService', SharesApplicationCtrl]);

    /**
     * @module SharesApplicationCtrl
     * @description
     * Controls Application for Shares
     */
    function SharesApplicationCtrl($scope) {
        var vm = this;

        vm.clearForm = clearForm;
        vm.submit = submit;
        vm.form = {};

        function clearForm() {
            $scope.shareApplicationForm.$setPristine();
            $scope.shareApplicationForm.$setUntouched();
            vm.form = {};
        }

        function submit() {

        }

    }
})();
(function() {
    'use strict';

    angular.module('selfService')
        .service('SavingsApplicationService', ['$resource', 'BASE_URL', SavingsApplicationService]);

    /**
     * @module SavingsApplicationService
     * @description
     * Service required for Savings Application
     */
    function SavingsApplicationService() {


    }

})();
(function(){
    'use strict';

    angular.module('selfService')
        .controller('SavingsApplicationCtrl', ['$scope', '$filter', '$mdToast', 'AccountService', 'SavingsApplicationService', SavingsApplicationCtrl]);

    /**
     * @module SavingsApplicationCtrl
     * @description
     * Controls Application for Savings
     */
    function SavingsApplicationCtrl($scope) {
        var vm = this;
        vm.form = {};

        vm.clearForm = clearForm;
        vm.submit = submit;
        vm.form = {};

        function clearForm() {
            $scope.savingsApplicationForm.$setPristine();
            $scope.savingsApplicationForm.$setUntouched();
            vm.form = {};
        }

        function submit() {

        }
    }
})();
(function () {
    'use strict';
    angular.module('selfService')
        .service('TransactionService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', TransactionService]);

    function TransactionService($q, $http, $rootScope, $resource, BASE_URL) {

        this.getClientTransactions = function (clientId) {
            return $resource(BASE_URL + '/self/clients/' + clientId + '/transactions')
        }

    }

})();

(function(){
    'use strict';

    angular.module('selfService')
        .controller('RecentTransactionCtrl', ['$scope', '$rootScope', '$stateParams', 'AccountService', 'TransactionService', RecentTransactionCtrl]);

    function RecentTransactionCtrl($scope, $rootScope, $stateParams, AccountService, TransactionService) {

        var vm = this;
        vm.loadingTransactions 	= true;
        vm.recenttransactions = {};
        vm.onPaginate = onPaginate;
        vm.page = 1;
        vm.query = {
            limit: 5,
            offset: 0
        }

        vm.getTransactions = getTransactions(vm.query);

        function getTransactions(query){
            AccountService.getClientId().then(function (clientId){
                TransactionService.getClientTransactions(clientId).get(query).$promise.then(function (res) {
                    vm.loadingTransactions = false;
                    vm.recenttransactions = res;
                });
            });
        }

        function onPaginate(offset,limit) {
            getTransactions(angular.extend({}, vm.query, {offset: (offset - 1) * limit, limit: limit}));
        }

    }
})();
(function() {
    'use strict';

    angular.module('selfService')
        .service('LoanApplicationService', ['$resource', 'BASE_URL', LoanApplicationService]);

    /**
     * @module LoanApplicationService
     * @description
     * Service required for Loan Application
     */
    function LoanApplicationService($resource, BASE_URL) {

        this.template = function() {
            return $resource(BASE_URL + '/self/loans/template');
        }

        this.loan = function() {
            return $resource(BASE_URL + '/self/loans');
        }
    }

})();
(function(){
    'use strict';

    angular.module('selfService')
        .controller('LoanApplicationCtrl', ['$scope', '$filter', '$mdToast', 'AccountService', 'LoanApplicationService', LoanApplicationCtrl]);

    /**
     * @module LoanApplicationCtrl
     * @description
     * Controls Application for Loan
     */
    function LoanApplicationCtrl($scope, $filter, $mdToast, AccountService, LoanApplicationService) {
        var vm = this;

        vm.form = {
            locale: 'en_GB',
            dateFormat: 'dd MMMM yyyy',
            loanType: 'individual'
        };
        vm.template = {};
        vm.clientId = null;

        vm.init = init;
        vm.getLoanTemplate = getLoanTemplate;
        vm.clearForm = clearForm;
        vm.submit = submit;

        init();

        function init() {
            AccountService.getClientId().then(function (clientId) {
                vm.clientId = clientId;
                getLoanTemplate(clientId, null);
            });
        }

        function getLoanTemplate(clientId, productId) {
            LoanApplicationService.template().get({
                templateType: 'individual',
                clientId: clientId,
                productId: productId
            }).$promise.then(function(template) {
                vm.template = template;
                vm.form.principal = vm.template.principal;
                vm.form.submittedOnDate = $filter('date','dd MMMM yyyy')(new Date(), 'dd MMMM yyyy');
                vm.form.expectedDisbursementDate = $filter('date')(new Date(), 'dd MMMM yyyy');
            });
        }

        function clearForm() {
            $scope.loanApplicationForm.$setPristine();
            $scope.loanApplicationForm.$setUntouched();
            vm.template = {};
            vm.form = {
                locale: 'en_GB',
                dateFormat: 'dd MMMM yyyy',
                loanType: 'individual'
            };
            init();
        }

        function submit() {
            var loanTemp = {
                clientId: vm.clientId,
                loanTermFrequency: vm.template.termFrequency,
                loanTermFrequencyType: vm.template.termPeriodFrequencyType.id,
                numberOfRepayments: vm.template.numberOfRepayments,
                repaymentEvery: vm.template.repaymentEvery,
                repaymentFrequencyType: vm.template.repaymentFrequencyType.id,
                interestRatePerPeriod: vm.template.interestRatePerPeriod,
                amortizationType: vm.template.amortizationType.id,
                interestType: vm.template.interestType.id,
                interestCalculationPeriodType: vm.template.interestCalculationPeriodType.id,
                transactionProcessingStrategyId: vm.template.transactionProcessingStrategyId
            };
            var data = Object.assign({}, loanTemp, vm.form);
            LoanApplicationService.loan().save(data).$promise.then(function() {
                clearForm();
                $mdToast.show(
                    $mdToast.simple()
                        .content("Loan Application Submitted Successfully")
                        .hideDelay(2000)
                        .position('top right')
                );
            }, function(){
                $mdToast.show(
                    $mdToast.simple()
                        .content("Error Creating Loan Application")
                        .hideDelay(2000)
                        .position('top right')
                );
            });
        }
    }
})();
(function () {
    'use strict';

    angular.module('selfService')
        .service('HelpService', ['$q', '$http', '$rootScope', '$state', '$resource', HelpService]);

    function HelpService ($q, $http, $rootScope, $state, $resource) {

        this.getFAQ = function () {
            return $resource(''); // enter the URL of the FAQ
        }



    }
})();
(function () {
    'use strict';

    angular.module('selfService')
        .controller('HelpCtrl', ['$scope', '$rootScope', '$state', '$stateParams','HelpService', HelpCtrl]);

    function HelpCtrl ($scope, $rootscope, $state, $stateParams, HelpService) {
        var vm=this;

        vm.faqData=[];
        vm.getfaq = getfaq;

        function getfaq() {
            HelpService.getFAQ().get().$promise.then(function (data) {
                vm.faqData = data;

            })
        }

    }
})();
(function(){
    'use strict';

    angular.module('selfService')
        .controller('DashboardCtrl', ['$filter', 'AccountService', 'LoanAccountService', 'SavingsAccountService', DashboardCtrl]);

    function DashboardCtrl($filter, AccountService, LoanAccountService, SavingsAccountService) {
        var vm = this;
        vm.accountTypeOptions = ['Loan', 'Savings', 'Shares'];
        vm.accountno;
        vm.accountType='';
        vm.paymentTypes;
        vm.showTransactionGraph = false;
        vm.transactionDatas = [];
        vm.selectPayment = selectPayment;
        vm.submit = submit;
        vm.dashboardData = {};
        vm.options = {
            chart: {
                type: 'pieChart',
                height: 300,
                showLabels: false,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                duration: 500,
                labelSunbeamLayout: true,
            }
        };

        vm.options2 = {
            chart: {
                type: 'discreteBarChart',
                height: 400,
                x: function(a){return a.label;},
                y: function(a){return a.value;},
                showValues: false,
                showXAxis: false,
                staggerLabels: true,
                duration: 200,
                xAxis: {
                    axisLabel: 'Date of Transaction'
                },
                yAxis: {
                    axisLabel: 'Money in your currency',
                    axisLabelDistance: -5
                }
            }
        };

        vm.getDashboardData = getDashboardData();

        function getDashboardData() {
            AccountService.getClientId().then(function (clientId) {
                AccountService.getAllAccounts(clientId).get().$promise.then(function(data) {
                    vm.dashboardData.loanAccounts = data.loanAccounts;
                    vm.dashboardData.savingsAccounts = data.savingsAccounts;
                    vm.dashboardData.shareAccounts = data.shareAccounts;
                    vm.dashboardData.totalAccounts = vm.dashboardData.loanAccounts.length + vm.dashboardData.savingsAccounts.length + vm.dashboardData.shareAccounts.length
                    vm.dashboardData.totalSavings = data.savingsAccounts.reduce(getTotalSavings, 0).toFixed(2);
                    vm.dashboardData.totalLoan = data.loanAccounts.reduce(getTotalLoan, 0).toFixed(2);
                    vm.dashboardData.loanAccountsOverview = getChartData(data.loanAccounts);
                    vm.dashboardData.savingsAccountsOverview = getChartData(data.savingsAccounts);
                    vm.dashboardData.shareAccountsOverview = getChartData(data.shareAccounts);
                });
            })
        }

        function getTotalSavings(total, acc) {
            if(acc.accountBalance) {
                return total + acc.accountBalance;
            } else {
                return total;
            }
        }

        function getTotalLoan(total, acc) {
            if(acc.loanBalance) {
                return total + acc.loanBalance;
            } else {
                return total;
            }
        }

        function getChartData(accounts) {
            var chartObj = {};
            accounts.map(function(acc) {
               chartObj[acc.status.value] = (chartObj[acc.status.value]) ? chartObj[acc.status.value] + 1: 1;
            });
            var chartData  = [];
            var keys = Object.keys(chartObj);
            for (var i in keys) {
                chartData.push({
                    key: keys[i],
                    y: chartObj[keys[i]]
                });
            }
            return chartData;
        }

        function getLoanDetails(id,payType) {
            LoanAccountService.loanAccount().get({
                id: id,
                associations: 'transactions'
            }).$promise.then(function (res) {
                vm.loanAccountDetails = res;

                var chartData = [];
                var values2=[];
                vm.paymentTypes =[];
                for(var j in vm.loanAccountDetails.transactions){
                   vm.paymentTypes.push(vm.loanAccountDetails.transactions[j].type.value);
                }
                vm.paymentTypes = remove_duplicates(vm.paymentTypes);

                    for (var i in vm.loanAccountDetails.transactions){

                        if(vm.loanAccountDetails.transactions[i].type.value == payType){
                            var transactionDate = $filter('date')( new Date(vm.loanAccountDetails.transactions[i].date), 'dd MMMM yyyy');
                            values2.push({
                                label: transactionDate,
                                value: vm.loanAccountDetails.transactions[i].amount
                            });
                        }
                    }
                    chartData.push({
                        key: 'transactions',
                        values: values2
                    });
                    vm.transactionDatas=chartData;

            });
        }

        function getSavingsDetail(id,payType) {
            SavingsAccountService.savingsAccount().get({id: id, associations: 'transactions'}).$promise.then(function(res) {
                vm.savingsAccountDetails = res;
                vm.transactions = res.transactions;

                var chartData = [];
                var values2=[];
                vm.paymentTypes =[];
                for(var j in vm.savingsAccountDetails.transactions){
                    vm.paymentTypes.push(vm.savingsAccountDetails.transactions[j].transactionType.value);
                }
                vm.paymentTypes = remove_duplicates(vm.paymentTypes);

                for (var i in vm.savingsAccountDetails.transactions){

                    if(vm.savingsAccountDetails.transactions[i].transactionType.value == payType){
                        var transactionDate = $filter('date')( new Date(vm.savingsAccountDetails.transactions[i].date), 'dd MMMM yyyy');
                        values2.push({
                            label: transactionDate,
                            value: vm.savingsAccountDetails.transactions[i].amount
                        });
                    }
                }
                chartData.push({
                    key: 'transactions',
                    values: values2
                });
                vm.transactionDatas=chartData;

            });
        }



        function remove_duplicates(arr) {
            var seen = {};
            var ret_arr = [];
            for (var i = 0; i < arr.length; i++) {
                if (!(arr[i] in seen)) {
                    ret_arr.push(arr[i]);
                    seen[arr[i]] = true;
                }
            }
            return ret_arr;

        }

        function selectPayment(payType) {
            if(vm.accountType=='Loan'){
                getLoanDetails(vm.accountno, payType);
            }
            if(vm.accountType=='Savings'){
                getSavingsDetail(vm.accountno,payType);
            }
        }

        function submit(payType) {
            if(vm.accountType=='Loan'){
                getLoanDetails(vm.accountno, payType);
                vm.showTransactionGraph=true;
            }
            if(vm.accountType=='Savings'){
                getSavingsDetail(vm.accountno,payType);
                vm.showTransactionGraph=true;
            }


        }



    }
})();

(function(){
  'use strict';

  angular.module('selfService')
    .service('storageService', ['$q', storageService]);

  function storageService($q){

    return {
        getItem: function (key) {
            return $q.when(window.localStorage.getItem(key));
        },
        setItem: function (key, value) {
            window.localStorage.setItem(key, value);
        },
        getObject: function (key) {
            return $q.when(JSON.parse(window.localStorage.getItem(key)));
        },
        setObject: function (key, value) {
            value = JSON.stringify(value);
            window.localStorage.setItem(key, value);
        },
        clear: function () {
            window.localStorage.clear();
        }
    };
  }

})();
(function(){
  'use strict';

  angular.module('selfService')
    .service('navService', ['$q', navService]);

  function navService($q){
    var menuItems = [
      {
        name: 'Dashboard',
        icon: 'view_module',
        sref: '.dashboard'
      },
      {
        name: 'Accounts',
        icon: 'account_balance_wallet',
        sref: '.clients'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
(function () {
    'use strict';

    angular.module('selfService')
        .filter('DateFormat', function (dateFilter) {
            return function (input) {
                if (input) {
                    var tDate = new Date(input);
                    return dateFilter(tDate, 'dd MMMM yyyy');//@todo Add this format to localstorage
                }
                return '';
            };
        })
        .filter('StatusLookup', function () {
            return function (input) {
                var cssClassNameLookup = {
                    "true": "statusactive",
                    "false": "statusdeleted",
                    "Active": "statusactive",
                    "loanStatusType.submitted.and.pending.approval": "statuspending",
                    "loanStatusType.approved": "statusApproved",
                    "loanStatusType.active": "statusactive",
                    "loanStatusType.overpaid": "statusoverpaid",
                    "savingsAccountStatusType.submitted.and.pending.approval": "statuspending",
                    "savingsAccountStatusType.approved": "statusApproved",
                    "savingsAccountStatusType.active": "statusactive",
                    "savingsAccountStatusType.activeInactive": "statusactiveoverdue",
                    "savingsAccountStatusType.activeDormant": "statusactiveoverdue",
                    "savingsAccountStatusType.matured": "statusmatured",
                    "loanProduct.active": "statusactive",
                    "clientStatusType.pending": "statuspending",
                    "clientStatusType.closed":"statusclosed",
                    "clientStatusType.rejected":"statusrejected",
                    "clientStatusType.withdraw":"statuswithdraw",
                    "clientStatusType.active": "statusactive",
                    "clientStatusType.submitted.and.pending.approval": "statuspending",
                    "clientStatusTYpe.approved": "statusApproved",
                    "clientStatusType.transfer.in.progress": "statustransferprogress",
                    "clientStatusType.transfer.on.hold": "statustransferonhold",
                    "groupingStatusType.active": "statusactive",
                    "groupingStatusType.pending": "statuspending",
                    "groupingStatusType.submitted.and.pending.approval": "statuspending",
                    "groupingStatusType.approved": "statusApproved",
                    "shareAccountStatusType.submitted.and.pending.approval": "statuspending",
                    "shareAccountStatusType.approved": "statusApproved",
                    "shareAccountStatusType.active": "statusactive",
                    "shareAccountStatusType.rejected": "statusrejected",
                    "purchasedSharesStatusType.applied": "statuspending",
                    "purchasedSharesStatusType.approved": "statusApproved",
                    "purchasedSharesStatusType.rejected": "statusrejected"
                }

                return cssClassNameLookup[input];
            }
        })

})();		


(function () {

    angular.module('selfService')
        .controller('MainCtrl', ['navService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$state', '$mdToast', '$scope', 'AuthService', 'AccountService', MainCtrl]);

    function MainCtrl(navService, $mdSidenav, $mdBottomSheet, $log, $q, $state, $mdToast, $scope, AuthService, AccountService) {
        var vm = this;

        vm.menuItems = [];
        vm.profileImage = null;

        vm.selectItem = selectItem;
        vm.toggleItemsList = toggleItemsList;
        vm.toggleRightSidebar = toggleRightSidebar;
        vm.logout = logout;

        vm.profile = getUserData();


        navService.loadAllItems().then(function (menuItems) {
            vm.menuItems = [].concat(menuItems);
        });

        function toggleRightSidebar() {
            $mdSidenav('right').toggle();
        }

        function toggleItemsList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }

        function selectItem(itemName) {
            vm.title = itemName;
            vm.toggleItemsList();
        }

        function getUserData() {
            AccountService.getClientId().then(function (clientId) {
                vm.clientId = clientId;
                getClient(clientId);
                getClientImage(clientId);
            });
        }

        function getClient(clientId) {
            AccountService.getClient(clientId).get().$promise.then( function (data) {
                vm.profile = data;
            })
        }

        function getClientImage(clientId) {
            AccountService.getClientImage(clientId).then( function (resp) {
                vm.profileImage = resp.data;
            }).catch(function() {
                // Not Found Profile image
                vm.profileImage = null;
            });
        }

        function logout() {
            AuthService.logout();
        }

    }

})();

(function () {
    'use strict';
    //@todo Move this service to the common folder
    angular.module('selfService')
        .service('AccountService', ['$http', '$resource', 'BASE_URL', 'storageService', AccountService]);

    function AccountService($http, $resource, BASE_URL, storageService) {

        /**
         * Get the clients associated with the current user's account.
         *
         */
        this.getClients = function () {
            return $resource(BASE_URL + '/self/clients/');
        };

        this.getAllAccounts = function (clientId) {//@todo rename this getClientAccounts
            //@todo update this to return $resource(BASE_URL+'/self/clients/'+id+'/accounts'); and test
            return $resource(BASE_URL + '/self/clients/' + clientId + '/accounts');
        };

        this.getClient = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id);
        }

        this.getClientImage = function (id) {
            return $http({
                method: 'GET',
                url: BASE_URL + '/self/clients/' + id + '/images'
            });
        }

        this.getClientCharges = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id + '/charges?pendingPayment=true');
        }

        this.getClientAccounts = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id + '/accounts');
        }

        this.getLoanAccount = function (id) {
            return $resource(BASE_URL + '/self/loans/' + id);
        }

        this.setClientId = function (id) {
            storageService.setObject('client_id', id);
        }

        this.getClientId = function () {
            return storageService.getItem('client_id');
        }

    }

})();

(function () {
    'use strict';
    angular.module('selfService')
        .service('ChargesService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', ChargesService]);

    function ChargesService($q, $http, $rootScope, $resource, BASE_URL) {

        this.getClientCharges = function (clientId) {
            return $resource(BASE_URL + '/self/clients/' + clientId + '/charges')
        }

    }

})();

(function(){
    'use strict';

    angular.module('selfService')
        .controller('ChargesCtrl', ['$scope', '$rootScope', '$stateParams', 'AccountService', 'ChargesService', ChargesCtrl]);

    function ChargesCtrl($scope, $rootScope, $stateParams, AccountService, ChargesService) {

        var vm = this;
        vm.loadingCharges = true;
        vm.charges = {};
        vm.onPaginate = onPaginate;
        vm.page = 1;
        vm.query = {
            limit: 5,
            offset: 0
        }

        vm.getCharges = getCharges(vm.query);

        function getCharges(query){
            AccountService.getClientId().then(function (clientId){
                ChargesService.getClientCharges(clientId).get(query).$promise.then(function (res) {
                    vm.loadingCharges = false;
                    vm.charges = res;
                });
            });
        }

        function onPaginate(offset,limit) {
            getCharges(angular.extend({}, vm.query, {offset: (offset - 1) * limit, limit: limit}));
        }

    }
})();
(function() {
    'use strict';

    angular.module('selfService')
        .service('BeneficiariesService', ['$q', '$http', '$rootScope', '$state', '$resource', 'BASE_URL', BeneficiariesService]);

    function BeneficiariesService($q, $http, $rootScope, $state, $resource, BASE_URL) {

        this.getBeneficiaries = function () {
            return $resource(BASE_URL + '/self/beneficiaries/tpt');
        };

        this.template = function() {
            return $resource(BASE_URL + '/self/beneficiaries/tpt/template');
        }

        this.beneficiary = function () {
            return $resource(BASE_URL + '/self/beneficiaries/tpt/:id',{id: '@id'},{
                update: {
                    method: 'PUT'
                }
            });
        }
    }

})();
(function(){
  'use strict';

    angular.module('selfService')
        .service('AuthService', ['$q', '$http', '$rootScope', '$state', '$resource', 'storageService', 'BASE_URL', 'USER_ROLES', AuthService]);

    function AuthService($q, $http, $rootScope, $state, $resource, storageService, BASE_URL, USER_ROLES) {

        var role            = '',
            userData        = '',       
            isAuthenticated = false;

        // Set Access Token to requests
        var setAccessToken = function (token) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
        }

        storageService.getObject("user_profile").then(function (data) {
            if (data) {
                isAuthenticated = true;
                role = USER_ROLES.user;
                userData = data;
                setAccessToken(userData.base64EncodedAuthenticationKey);
            }
        })

        this.setUser = function (res) {
            storageService.setObject('user_profile', res);
            isAuthenticated = true;
            userData = res;
            role = USER_ROLES.user;
            setAccessToken(res.base64EncodedAuthenticationKey);
        }

        this.getUser = function() {
            return userData;
        }

        this.isAuthenticated = function () {
            return isAuthenticated;
        };

        this.role = function () {
            return role;
        }

        this.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (this.isAuthenticated() && authorizedRoles.indexOf(role) !== -1);
        }

        //Resource for REST APIs
        this.doLogin = function(data) {
            return $resource(BASE_URL +'/self/authentication', data);
        }

        this.logout = function() {
            role = '';
            userData = '';
            isAuthenticated = false;
            setAccessToken('');
            storageService.clear();
            $state.go('login');
        }

        this.register = function(data) {
            return $http.post(BASE_URL + '/self/registration',data);
        }

        this.verifyUser = function(data){
            return $http.post(BASE_URL + '/self/registration/user',data);
        }

    }

})();

(function (){
    'use strict';

    angular.module('selfService')
        .service('AboutUsService', ['$q', '$http', '$rootScope', '$state', '$resource', AboutUsService]);

    function AboutUsService($q,$http,$rootScope,$state,$resource){

        this.getOrgDetails = function () {
            return $resource(''); // enter the URL of the organisations details.
        };
    }
})();
(function () {
    'use strict';

    angular.module('selfService')
        .controller('AboutUsCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'AboutUsService', AboutUsCtrl]);

    function AboutUsCtrl ($scope, $rootScope, $state, $stateParams, AboutUsService) {

        var vm=this;
        vm.org = null; // it is an array, when data is available then vm.org = {JSON data};
        vm.getDetails = getDetails;

        function getDetails() {
            AboutUsService.getOrgDetails.get().$promise.then(function (data){
                vm.org =data;
            })
        }
    }
})();
