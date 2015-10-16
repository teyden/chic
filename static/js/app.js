var app = angular.module("ChicApp", [
      'ngRoute'
]);


//////////////////////////
///// Controllers ///////
/////////////////////////

///// MainController /////
app.controller('MainController', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.address = 'http://gen-app-1982.herokuapp.com/';
  $scope.twentythreeandme = 'https://api.23andme.com/authorize/?redirect_uri=http://gen-app-1982.herokuapp.com/api/receive_code/&response_type=code&client_id=e1c168d2cbd3383adeab1705880617b0&scope=genomes';

  $scope.plusOne = function(index) { 
    $scope.categories[index].likes += 1; 
  };

  $scope.minusOne = function(index) {
    $scope.categories[index].dislikes += 1; 
  };

  $scope.sendSuggest = function() {
    var postObj = ({
      "#msgVal": $scope.msg,
      "#emailVal": $scope.email
    });

    $scope.submit_msg = JSON.stringify(postObj);

    $http({
      url: '/api/sources',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: $scope.submit_msg
    }).
    success(function(data) {
      $("#msg-success-alert").fadeIn().slideDown();
      window.setTimeout(function() {
        $("#msg-success-alert").fadeOut().slideUp();
      }, 3000);
    }).
    error(function(data) {
      $("#msg-error-alert").fadeIn().slideDown();
      window.setTimeout(function() {
        $("#msg-error-alert").fadeOut().slideUp();
      }, 3000);
    });
  };
}]);
  

///// SignupController /////
app.controller('SignupController', ['$scope', '$location', '$http', function($scope, $location, $http) { 
  $scope.request_newUser = function() {
    // Create POST object
    var postObj = ({
      "#firstnameVal": $scope.first_name,
      "#lastnameVal": $scope.last_name,
      "#emailVal": $scope.email,
      "#passwordVal_1": $scope.password1,
      "#passwordVal_2": $scope.password2
    });

    $scope.new_user = JSON.stringify(postObj);

    // Send POST request to validate new user input
    $http({
      url: '/api/signup',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: $scope.new_user
    }).
    success(function(data) {
      $("#signup-success-alert").fadeIn().slideDown();
      window.setTimeout(function() {
        $("#signup-success-alert").fadeOut().slideUp();
      }, 9000);
    }).
    error(function(data) {
      $("#signup-error-alert").fadeIn().slideDown();
      window.setTimeout(function() {
        $("#signup-error-alert").fadeOut().slideUp();
      }, 9000);
    });
  };
}]);


///// LoginController /////
app.controller('AppointmentController', ['$scope', '$location', '$http', function($scope, $location, $http) {

  $scope.request_appointment = function() {
    // Create POST object
    var postObj = ({
      "#email": $scope.email,
      "#number": $scope.number,
      "#service": $scope.service,
      "#date": $scope.date,
      "#time": $scope.time
    });

    $scope.appt_request = JSON.stringify(postObj);

    // Send POST request to validate login input
    $http({
      url: '/api/request_appt',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: $scope.appt_request
    }).
    success(function(data) {
      $("#appt_request-success-alert").fadeIn().slideDown();
      window.setTimeout(function() {
        $("#appt_request-success-alert").fadeOut().slideUp();
      }, 3000);
    }).
    error(function(data) {
      $("#appt_request-error-alert").fadeIn().slideDown();
      window.setTimeout(function() {
        $("#appt_request-error-alert").fadeOut().slideUp();
      }, 3000);
    });

    var options = {
      url: '/api/dashboard',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      data: $scope.appt_request
    };

    // Send request to determine redirect path
    $http(options).
    success(function(data) {
      window.location = '/account';
    }).
    error(function(data) {
      window.location = '/';
    });
  };

}]);


// ///// ImportController /////
app.controller('ImportController', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.addData_fromImport = function() {
    // Create POST object
    var postObj = ({
      "#inputdataVal": $scope.inputData,
      "#emailVal": $scope.email,
      "#passwordVal": $scope.password
    });

    $scope.user_data_input = JSON.stringify(postObj);

    // Send POST request to validate genetic data input
    $http({
      url: '/api/import',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: $scope.user_data_input
    }).
    success(function(data) {
      $("#inputDataSave-success-alert").fadeIn().slideDown();
      window.setTimeout(function() {
        $("#inputDataSave-success-alert").fadeOut().slideUp();
      }, 12000);
    }).
    error(function(data) {
      $("#inputDataSave-error-alert").fadeIn().slideDown();
      window.setTimeout(function() {
        $("#inputDataSave-error-alert").fadeOut().slideUp();
      }, 12000);
    });
  };
}]);

///// DataController /////
app.controller('DataController', ['$scope', function($scope) {
  var name = 'name';

  $scope.get_snpCollection = function() {
    // Create POST object
    var postObj = ({
      'RSID': $scope.rsid,
      'DESCRIPTION': $scope.description,
      'CHROMOSOME': $scope.chromosome,
      'GENE': $scope.gene,
      'ALLELES': $scope.alleles,
      'DATE': $scope.date
    });

    $scope.an_snp = JSON.stringify(postObj);

    // Send POST request to grab from DB
    $http({
      url: '/api/data',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      data: $scope.an_snp
    }).
    success(function(data) {

      $("#inputDataSave-success-alert").fadeIn().slideDown();
      window.setTimeout(function() {
        $("#inputDataSave-success-alert").fadeOut().slideUp();
      }, 12000);
    }).
    error(function(data) {
      $("#inputDataSave-error-alert").fadeIn().slideDown();
      window.setTimeout(function() {
        $("#inputDataSave-error-alert").fadeOut().slideUp();
      }, 12000);
    });

  };

  $scope.logged_in_user = {
    name: "Sammy"
  };
  
  $scope.snps = [
    { rsid: 'rs324650', description: 'intelligence', chromosome: 7, gene: 'CHRM2', alleles: ['AA', 'AT', 'TT'] },
    { rsid: 'rs2061174', description: 'intelligence', chromosome: 7, gene: 'CHRM2', alleles: ['AA', 'AT', 'TT'] },
    { rsid: 'rs3213207', description: 'intelligence + cognitive abilities, attention, and memory', chromosome: 6, gene: 'DTNBP1', alleles: ['CC', 'CT', 'TT'] }, 
    { rsid: 'rs1799990', description: 'memory (long-term; logical)', chromosome: 22, gene: 'PRNP', alleles: ['AA', 'AG', 'GG'] }, 
    { rsid: 'rs4680', description: 'memory (traumatic)', chromosome: 22, gene: 'COMT', alleles: ['AA', 'AG', 'GG'] }, 
    { rsid: 'rs1801260', description: 'sleeping time (later)', chromosome: 4, gene: 'CLOCK', alleles: ['AA', 'AG', 'GG'] }
  ];

  $scope.users_rsID_matches = {'rs324650': 'TT',
                              'rs2061174': 'AG',
                              'rs3213207': 'TT',
                              'rs1801260': 'AA',
                              'rs1799990': 'AA',
                              'rs4680': 'GG'};

  // Structure for snp
  var snp_seed = {
    'rsid': '',
    'chromosome': '',
    'position': '',
    'genotype': ''
  };

  // All rsIDs without categorization
  rsIDs = {};

  // All collected rsIDs for each category
  var rsIDs_collection = {
    'category': {
      'neuropsychological': rsIDs,
      'psychosocial': rsIDs,
      'neurodegenerative': rsIDs,
      'gender-specific': rsIDs
    }
  };

  $scope.find_RSID_match = function(rsIDs) {
    // Input (rsIDs) containts array of rsID's scraped from online DB's 
    // on specific genes/traits. Function stores user's data for an rsID
    // if it matches with one in rsIDs array

    var genData_text = document.getElementById('data-input').value;
    var lines = genData_text.split(/\r?\n/);
    var collect = {};

    lines.forEach(function (line) {
      if (!line.startsWith("#")) {
        var lineArr = line.split(/\s+/);
        var rsid = lineArr[0],
          chromosome = lineArr[1],
          position = lineArr[2],
          genotype = lineArr[3];
        if (rsIDs[rsid] == null) {
          return "";
        } else {
          alert('matched! ' + rsIDs[rsid].description);
          collect[rsID] = lineArr; 
          // Save lineArr in collect
        };
      };
    });
  };

}]);



// ///// AccountController /////
// app.controller('AccountController', ['$scope', '$location', '$http', function($scope, $location, $http) {
//     $scope.user_profile = {};

//     $scope.viewUserProfile = function(user) {
//       $scope.user_profile = angular.copy(user);

//       // Clear page
//       $scope.user_profile = {};
//     };

//     // UPDATE ***

//     $http.get("/api/user/").success(function(data) {
//       $scope.USER_info = data; 
//     });

//     $http.get("/api/mySNPs/").success(function(data){
//       $scope.SNP_report = data;
//     });

//     $http.get("/api/myGenome/").success(function(data){
//       $scope.GENOME_report = data;
//     });

// }]);
