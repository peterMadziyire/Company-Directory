var editModeOn = false;
var updateEmployeeID = "No Employee ID";
var updateDepartmentID="No Employee ID";
var updateLocationID="No Employee ID";
var deleteEmployeeID="No Employee ID";
var nameSort= "";
var depSort= "";
var locSort= "";
var emailSort= "";
var depSort2= "";
var locSort2= "";
var locSort3= "";

var sort_order = "asc";

var employeeCount;
var departmentCount;

function test(){

  if($("#filterBy").val()=="employees")  {
    
    $('#addAnEmployee').show();
    $('#addADepartment').hide();
    $('#addAlocation').hide();
              
}//sort

else if($("#filterBy").val()=="departments")  { 
  $('#addAnEmployee').hide();
    $('#addADepartment').show();
    $('#addAlocation').hide();

}

else if($("#filterBy").val()=="locations")  { 

  $('#addAnEmployee').hide();
    $('#addADepartment').hide();
    $('#addAlocation').show();

}


}

function getEmployeeByID() {
    $.ajax({
      url: "libs/php/getPersonnelByID.php",
      type: "POST",
      data: {
        id: updateEmployeeID,
      },
      dataType: "json",
  
      success: function (result) {
        if (result.status.name == "ok") {
          console.log(result);
            
          $("#employeeModalLabel").html(`<span>${result["data"][0]["firstName"]} ${result["data"][0]["lastName"]}</span>`)
          $("#firstNameUpdate").val(result["data"][0]["firstName"]);
          $("#lastNameUpdate").val(result["data"][0]["lastName"]);
          $("#emailUpdate").val(result["data"][0]["email"]);
          $("#jobTitleUpdate").val(result["data"][0]["jobTitle"]);
          $('#departmentUpdate').html(`<option value="${result["data"][0]["departmentID"]}">${result["data"][0]["department"]}</option>`);
          getAllModalDepartments();
          $('#locationUpdate').html(`<option>${result["data"][0]["location"]}</option>`);
          
        }
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  }

//Apend department option
function getAllModalDepartments(){
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (results) {  
        console.log(results)

        results.data.forEach((element)=>{
            $("#departmentUpdate").append("<option value='"+element.id+"'>"+element.name+"</option>")
         
        })

    },
    error: function (request, status, error) {
        console.log(error);
      },
})
}

function getAllModal2Departments(){
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (results) {  
        console.log(results)

        results.data.forEach((element)=>{
            $("#selectDepartment").append("<option value='"+element.id+"'>"+element.name+"</option>")
           
        })

    },
    error: function (request, status, error) {
        console.log(error);
      },
})
}

//Apend update location option
function getAllModalLocations(){
    $.ajax({
      url: "libs/php/getAllLocations.php",
      type: "POST",
      dataType: "json",
      success: function (results) {  
          console.log(results)
  
          results.data.forEach((element)=>{
              $("#Dep-Loc-Update").append("<option value='"+element.id+"'>"+element.name+"</option>")
  
          })
  
      },
      error: function (request, status, error) {
          console.log(error);
        },
  })
  }

  //Apend add department location option
function getAllModal2Locations(){
  $.ajax({
    url: "libs/php/getAllLocations.php",
    type: "POST",
    dataType: "json",
    success: function (results) {  
        console.log(results)

        results.data.forEach((element)=>{
            $("#select-Location").append("<option value='"+element.id+"'>"+element.name+"</option>")

        })

    },
    error: function (request, status, error) {
        console.log(error);
      },
})
}


function validateUpdateEmployeeForm() {
  if (
    $("#firstNameUpdate").val()==""||
    $("#firstNameUpdate").val()==" "||
        $("#lastNameUpdate").val()==""||
        $("#lastNameUpdate").val()==" "||
        $("#emailUpdate").val()==""||
        $("#emailUpdate").val()==" "
    

    
  ) {
    alert("Please ensure all fields are correctly filled out.");
    return false;
  } else {
    return true;
  }
}





  //

  function updateEmployee() {
    $.ajax({
      url: "libs/php/updateEmployee.php",
      type: "POST",
      dataType: "json",
      data: {
        firstName: $("#firstNameUpdate").val(),
        lastName: $("#lastNameUpdate").val(),
        email: $("#emailUpdate").val(),
        jobTitle: $("#jobTitleUpdate").val(),
        departmentID: $("#departmentUpdate").val(),
        id: updateEmployeeID,
      },
  
      success: function (result) {
        if (result.status.name == "ok") {
            console.log($("#departmentUpdate").val())
          alert("Employee successfully updated");
          $("#employeeModal").modal("hide");
          $("#updateModal").modal("hide");
          
          filterAllEmployees();

          $('#empModalCheck').prop("checked", false);
          $('.dis').attr('disabled', 'disabled')
          $('#delete-employee').hide();
          $('#update-employee').hide();
          
        //   self.location.reload();
          
        }
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  }
  


  //Delete Employee

  function deleteEmployee() {
    $.ajax({
      url: "libs/php/deleteEmployeeByID.php",
      type: "POST",
      dataType: "json",
      data: {
        id: updateEmployeeID,
      },
  
      success: function (result) {
        if (result.status.name == "ok") {
          console.log("Employee successfully deleted");
          $("#employeeModal").modal("hide");
            self.location.reload();
            
        }
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  }


  function getDepartmentByID() {
    $.ajax({
      url: "libs/php/getDepartmentByID.php",
      type: "POST",
      data: {
        id: updateDepartmentID,

      },
      dataType: "json",
  
      success: function (result) {
        if (result.status.name == "ok") {
          console.log(result);
            
          $("#departmentModalLabel").html(`<span>${result["data"][0]["name"]}</span>`)
         
          
          $('#Dep-Update').val(result["data"][0]["name"]);
          $('#Dep-Loc-Update').html(`<option value="${result["data"][0]["locationID"]}">${result["data"][0]["locationName"]}</option>`);
          getAllModalLocations()
        }
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  }



  function getLocationByID() {
    $.ajax({
      url: "libs/php/getLocationByID.php",
      type: "POST",
      data: {
        id: updateLocationID,

      },
      dataType: "json",
  
      success: function (result) {
        if (result.status.name == "ok") {
          console.log(result);
            
          $("#locationModalLabel").html(`<span>${result["data"][0]["name"]}</span>`)
         
          
          $('#Loc-Update').val(result["data"][0]["name"]);
          
        }
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  }






  //display employees

  function displyEmployees(){
    $.ajax({
        url: "libs/php/getAllData.php",
        type: "POST",
        dataType: "json",
        success: function (results) {
            console.log(results)

        
            console.log(results.data.length)
           
        var arg= results.data;
               
        
                
            if(arg.length>0){
        
                
                $("#records").html(`<i>Total Records: ${arg.length}</i>`);
     
    

           
            var staff= arg.map((result)=>{
              
        
        
                return  `<tr  id="${result.lastName.charAt(0)}">
        
        <td class="nameClasscol-3 entry55" data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal">
            <div class="d-flex data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal"><div id="initial-cont" class="name-initial align-items-center bg-success">${result.lastName.charAt(0)}</div>  
            <div class="d-flex data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal""><div id="delete-cont" class="name-initial align-items-center bg-danger"><i class="far fa-trash-alt"></i></div>
            ${result.lastName}, ${result.firstName}</div></td>
        <td class="departmentClass col-3 entry55" data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal">${result.department}</td>
        <td class="locationClass col-2  entry55" data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal">${result.location}</td>
        <td class="emailClass col-4 entry55" data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal">${result.email}</td>
        </tr>
        
        `
        
                
            });
        
        
        
        $("#employeeTableBody").html(staff)
        
            }else{
        
                $("#employeeTableBody").html(`<tr><td colspan="4"> No Results Found</td> </td>`)
            }
           

       
            
        },

        

        error: function (request, status, error) {
            console.log(error);
          },
        });

  }



//Display staff on homepage



function displayStaff(arg) {


  console.log(arg.length)

  if(arg.length>0){

    
   if (nameSort!==""){nameSort=="asc"?arg.sort((a,b)=>{return b.lastName.localeCompare(a.lastName)}):arg.sort((a,b)=>{return a.lastName.localeCompare(b.lastName)})};
   if(depSort!==""){depSort=="asc"?arg.sort((a,b)=>{return b.department.localeCompare(a.department)}):arg.sort((a,b)=>{return a.department.localeCompare(b.department)})};
   if(locSort!==""){locSort=="asc"?arg.sort((a,b)=>{return b.location.localeCompare(a.location)}):arg.sort((a,b)=>{return a.location.localeCompare(b.location)})};
   if(emailSort!==""){emailSort=="asc"?arg.sort((a,b)=>{return b.email.localeCompare(a.email)}):arg.sort((a,b)=>{return a.email.localeCompare(b.email)})};


 $("#records").html(`<i>Total Records: ${arg.length}</i>`);
     
 
 


 
 
//  var sorted= sortByLocationName(arg);
 


 
  var staff= arg.map((result)=>{
      // return  `<div class="col-12" id="${result.lastName.charAt(0)}"> ${result.lastName}, ${result.firstName}</div>`

// <td class="nameClass col-3 entry55" data-toggle="modal" data-target="#updateModal"><div class="contact-entry"><div class="name-initial bg-success">t</div><div class="full-name">${result.lastName}, ${result.firstName}</div></div></td>



      return `<tr  id="${result.lastName.charAt(0)}">

<td class="nameClasscol-3 entry55" data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal">
  <div class="d-flex data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal"><div id="initial-cont" class="name-initial align-items-center bg-success">${result.lastName.charAt(0)}</div>  
  <div class="d-flex data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal""><div id="delete-cont" class="name-initial align-items-center bg-danger"><i class="far fa-trash-alt"></i></div>
  ${result.lastName}, ${result.firstName}</div></td>
<td class="departmentClass col-3 entry55" data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal">${result.department}</td>
<td class="locationClass col-2  entry55" data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal">${result.location}</td>
<td class="emailClass col-4 entry55" data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal">${result.email}</td>
</tr>

`

      
  });



$("#employeeTableBody").html(staff)

  }else{

      $("#employeeTableBody").html(`<tr><td colspan="4"> No Results Found</td> </td>`)
  }

}




// Filter Employee

function filterAllEmployees(){

    $("#directoryTable").show()
    $("#departmentHead").hide();
    $("#locationHead").hide()
   

    $.ajax({
        url: "libs/php/getAllData.php",
        type: "POST",
        dataType: "json",
        success: function (results) {
            console.log(results)

            $("#searchBar").attr("placeholder", "Search Employee")

            displayStaff(results.data)
         

     

        $("#searchBar").keyup((e)=>{
            var searchString= e.target.value.toLowerCase();
           var filteredStaff= results.data.filter((result)=>{
               return result.firstName.toLowerCase().includes(searchString)||result.lastName.toLowerCase().includes(searchString)

            });
            console.log(filteredStaff)

            displayStaff(filteredStaff);

            })
        },

        

        error: function (request, status, error) {
            console.log(error);
          },
        });
}


// Display departments

function displayDepartments(arg){
   
  

            if(arg.length>0){
        
                // var sidebar= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
                // sidebar.forEach((letter)=>{
                //     return  $('.alphabet').append(`<div class="text-center text-success"><a href="#${letter}">${letter}</a></div>`)
                   
                // }); 
                $("#records").html(`<i>Total Records: ${arg.length}</i>`);

                
          //  var sorted= arg.sort((a,b)=>a.name-b.name);
          //  console.log(sorted);

          if (depSort2!==""){depSort2=="asc"?arg.sort((a,b)=>{return b.name.localeCompare(a.name)}):arg.sort((a,b)=>{return a.name.localeCompare(b.name)})};
          if (locSort2!==""){locSort2=="asc"?arg.sort((a,b)=>{return b.locationName.localeCompare(a.locationName)}):arg.sort((a,b)=>{return a.locationName.localeCompare(b.locationName)})};
           
            var departments= arg.map((result)=>{
             
        
                return `<tr  id="${result.name.charAt(0)}">
        
        <td class="nameClasscol-3 entry55" data-toggle="modal" data-department-id=${result.id} data-target="#departmentModal">
            <div class="d-flex data-toggle="modal" data-department-id=${result.id} data-target="#departmentModal"><div id="initial-cont" class="name-initial align-items-center bg-success">${result.name.charAt(0)}</div>  
            <div class="d-flex data-toggle="modal" data-department-id=${result.id} data-target="#departmentModal""><div id="delete-cont" class="name-initial align-items-center bg-danger"><i class="far fa-trash-alt"></i></div>
            ${result.name}</div></td>
        <td class="locationClass2 col-3 entry55" data-toggle="modal" data-department-id=${result.id} data-target="#departmentModal">${result.locationName}</td>
        
        </tr>
        
        `
        
                
            });
   
        
        $("#employeeTableBody").html(departments)
        
            }else{
        
                $("#employeeTableBody").html(`<tr><td colspan="4"> No Results Found</td> </td>`)
            }


         
        

}


//Filter all Departments


function filterByDepartment(){

    $("#departmentHead").show();
    $("#locationHead").hide()
    $("#directoryTable").hide()

    $.ajax({
        url: "libs/php/getAllDepartmentsLocations.php",
        type: "POST",
        dataType: "json",
        success: function (results) {
            console.log(results)

            $("#searchBar").attr("placeholder", "Search Department")

            displayDepartments(results.data);

     

        $("#searchBar").keyup((e)=>{
            var searchString= e.target.value.toLowerCase();
           var filteredStaff= results.data.filter((result)=>{
               return result.name.toLowerCase().includes(searchString)

            });
            console.log(filteredStaff)

            displayDepartments(filteredStaff);

            })
        },

        

        error: function (request, status, error) {
            console.log(error);
          },
        });
}



//Display Location

function displayLocations(arg){
   
  

    if(arg.length>0){

        // var sidebar= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        // sidebar.forEach((letter)=>{
        //     return  $('.alphabet').append(`<div class="text-center text-success"><a href="#${letter}">${letter}</a></div>`)
           
        // }); 
        $("#records").html(`<i>Total Records: ${arg.length}</i>`);

        if (locSort3!==""){locSort3=="asc"?arg.sort((a,b)=>{return b.name.localeCompare(a.name)}):arg.sort((a,b)=>{return a.name.localeCompare(b.name)})};
   

   
    var locations= arg.map((result)=>{
     

        return `<tr  id="${result.name.charAt(0)}">

<td class="nameClasscol-3 entry55" data-toggle="modal" data-location-id=${result.id} data-target="#locationModal">
    <div class="d-flex data-toggle="modal" data-location-id=${result.id} data-target="#locationModal"><div id="initial-cont" class="name-initial align-items-center bg-success">${result.name.charAt(0)}</div>  
    <div class="d-flex data-toggle="modal" data-location-id=${result.id} data-target="#locationModal""><div id="delete-cont" class="name-initial align-items-center bg-danger"><i class="far fa-trash-alt"></i></div>
    ${result.name}</div></td>


</tr>

`

        
    });


$("#employeeTableBody").html(locations)

    }else{

        $("#employeeTableBody").html(`<tr><td colspan="4"> No Results Found</td> </td>`)
    }


}



function filterByLocation(){

    $("#departmentHead").hide();
    $("#locationHead").show()
    $("#directoryTable").hide()

    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: "POST",
        dataType: "json",
        success: function (results) {
            console.log(results)

            $("#searchBar").attr("placeholder", "Search Location")

            displayLocations(results.data);

     

        $("#searchBar").keyup((e)=>{
            var searchString= e.target.value.toLowerCase();
           var filteredStaff= results.data.filter((result)=>{
               return result.name.toLowerCase().includes(searchString)

            });
            console.log(filteredStaff)

            displayLocations(filteredStaff);

            })
        },

        

        error: function (request, status, error) {
            console.log(error);
          },
        });
}




// Filter functions
function employeeFilterByDepartment() {
    $.ajax({
      url: "libs/php/employeeFilterByDepartment.php",
      type: "POST",
      dataType: "json",
      data: {
        departmentId: $("#departmentFilter").val(),
        
      },
  
      success: function (results) {
        if (results.status.name == "ok") {
          console.log(results);
          console.log($("#departmentFilter").val())
          $("#searchBar").attr("placeholder", "Search Employee")
          displayStaff(results.data);

   

      $("#searchBar").keyup((e)=>{
          var searchString= e.target.value.toLowerCase();
         var filteredStaff= results.data.filter((result)=>{
             return result.firstName.toLowerCase().includes(searchString)||result.lastName.toLowerCase().includes(searchString)

          });
          console.log(filteredStaff)

          displayStaff(filteredStaff);

          })


     
        }
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  }
  


  function employeeFilterByLocation() {
    $.ajax({
      url: "libs/php/employeeFilterByLocation.php",
      type: "POST",
      dataType: "json",
      data: {
        locationId: $("#locationFilter").val(),
        
      },
  
      success: function (results) {
        if (results.status.name == "ok") {
          console.log(results);
          console.log($("#locationFilter").val())
          $("#searchBar").attr("placeholder", "Search Employee")
          displayStaff(results.data);

   

      $("#searchBar").keyup((e)=>{
          var searchString= e.target.value.toLowerCase();
         var filteredStaff= results.data.filter((result)=>{
             return result.firstName.toLowerCase().includes(searchString)||result.lastName.toLowerCase().includes(searchString)

          });
          console.log(filteredStaff)

          displayStaff(filteredStaff);

          })


     
        }
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  }


  function validateUpdateDepartmentForm() {
    if (
      $("#Dep-Update").val()==""||
      $("#Dep-Update").val()==" "
        
  
      
    ) {
      alert("Please ensure all fields are correctly filled out.");
      return false;
    } else {
      return true;
    }
  }


  //update Department

  function updateDepartment() {

    console.log($("#Dep-Update").val())
    $.ajax({
      url: "libs/php/updateDepartment.php",
      type: "POST",
      dataType: "json",
      data: {
        name: $("#Dep-Update").val(),
        locationID: $("#Dep-Loc-Update").val(),
        id: updateDepartmentID,
      },
  
      success: function (result) {
        if (result.status.name == "ok") {
          console.log("Department successfully updated");
          $("#departmentModal").modal("hide");
          $("#updateDepartmentModal").modal("hide");
          
          filterByDepartment();

          $('.dis').attr('disabled', 'disabled')
          $('#depModalCheck').prop("checked", false);
          $('#delete-department').hide();
          $('#update-department').hide();
        }
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  }


  //update Department

  function deleteDepartment() {

    console.log($("#Dep-Update").val())
    $.ajax({
      url: "libs/php/deleteDepartmentByID.php",
      type: "POST",
      dataType: "json",
      data: {
                id: updateDepartmentID,
      },
  
      success: function (result) {
        if (result.status.name == "ok") {
          console.log("Department successfully deleted");
          // $("#departmentModal").modal("hide");

          $("#departmentModal").modal("hide");
          $("#deleteDepartmentModal").modal("hide");
          
          filterByDepartment();
          $('.dis').attr('disabled', 'disabled')
          $('#depModalCheck').prop("checked", false);
          $('#delete-department').hide();
          $('#update-department').hide();

        }
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  }

  function validateUpdateLocationForm() {
    if (
      $("#Loc-Update").val() == "" ||
      $("#Loc-Update").val() == " "
    ) {
      alert("Please ensure all fields are correctly filled out.");
      return false;
    } else {
      return true;
    }
  }
  



  function updateLocation() {

    console.log($("#Loc-Update").val())
    $.ajax({
      url: "libs/php/updateLocation.php",
      type: "POST",
      dataType: "json",
      data: {
        name: $("#Loc-Update").val(),
        id: updateLocationID,
      },
  
      success: function (result) {
        if (result.status.name == "ok") {
          console.log("Location successfully updated");
          $("#locationModal").modal("hide");
          $("#updateLocationModal").modal('hide')
          
          filterByLocation();
          $('.dis').attr('disabled', 'disabled');
          $('#locModalCheck').prop("checked", false);
          $('#delete-location').hide();
          $('#update-location').hide();

        }
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  }

  function deleteLocation() {

    
    $.ajax({
      url: "libs/php/deleteLocationByID.php",
      type: "POST",
      dataType: "json",
      data: {
        
        id: updateLocationID,
      },
  
      success: function (result) {
        if (result.status.name == "ok") {
          console.log("Location successfully deleted");
          $("#locationModal").modal("hide");
          $("#deleteLocationModal").modal('hide');
         
          filterByLocation();

          $('.dis').attr('disabled', 'disabled');
          $('#locModalCheck').prop("checked", false);
          $('#delete-location').hide();
          $('#update-location').hide();
        }
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  }
  
  function sortByLocationName(arg){
   
      arg.sort((a,b)=>{
        if(sort_order == 'asc') 
        {
        return a.firstName.localeCompare(b.firstName);
        }
        else 
        {
        return b.firstName.localeCompare(a.firstName);
        }
        
      });
    


}

// Validate add form functions
function validateAddEmployeeForm() {
  if (
    $("#addFirstName").val()==""||
    $("#addFirstName").val()==" "||
        $("#addLastName").val()==""||
        $("#addLastName").val()==" "||
        $("#emailInput").val()==""||
        $("#emailInput").val()==" "||
        $("#addEmail").val()==""||
        $("#addEmail").val()==" "||
        $("#selectDepartment").val()=="selectADepartment"||
        $("#selectLocation").val()=="selectALocation"

    
  ) {
    alert("Please ensure all fields are correctly filled out.");
    return false;
  } else {
    return true;
  }
}




function addEmployee(){

  $.ajax({
    url: "libs/php/addEmployee.php",
    type: "POST",
    dataType: "json",
    data: {
      firstName: $("#addFirstName").val(),
      lastName: $("#addLastName").val(),
      jobTitle: $("#addJobTitle").val(),
      email: $("#addEmail").val(),
      departmentID: $("#selectDepartment").val()
       
    },

    success: function (result) {
      if (result.status.name == "ok") {
        alert("Employee successfully added");
        $("#addEmployeeModal").modal("hide");
        
        // filterAllEmployees();
      
        $("#addFirstName").val("");
        $("#addLastName").val("");
        $("#emailInput").val("");
        $("#addJobTitle").val("")
        $("#addEmail").val("");
        $("#selectDepartment").val("selectADepartment");
        $("#selectLocation").empty();
      
        $("#selectLocation").append(
          $("<option>", {
            value: "selectALocation",
            text: "Location",
          })
        );
        $("#employeeConfirmAddCheck").prop("checked", false);
        $("#add-employee").attr("disabled", true);
        
        filterAllEmployees();                         
       
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });



}


// Validate add form functions
function validateAddDepartmentForm() {
  if (
    $("#inputDepartment").val()==""||
    $("#inputDepartment").val()==" "||
        $("#select-Location").val()=="selectALocation"

    
  ) {
    alert("Please ensure all fields are correctly filled out.");
    return false;
  } else {
    return true;
  }
}



//Add Department


function addDepartment() {
  $.ajax({
    url: "libs/php/addDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#inputDepartment").val(),
      locationID: $("#select-Location").val(),
    },

    success: function (result) {
      if (result.status.name == "ok") {
        alert("Department successfully added");
        $("#addDepartmentModal").modal("hide");
        
        $("#inputDepartment").val("");
        $("#select-Location").val("selectALocation");
        $("#departmentConfirmAddCheck").prop("checked", false);
        $("#add-Department").attr("disabled", true);

        filterByDepartment();
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}

// Validatate Location Form function

function validateAddLocationForm() {
  if (
    $("#input-Location").val() == "" ||
    $("#input-Location").val() == " "
  ) {
    alert("Please ensure all fields are correctly filled out.");
    return false;
  } else {
    return true;
  }
}



// Add Location

function addLocation() {
  $.ajax({
    url: "libs/php/addLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#input-Location").val(),
      
    },

    success: function (result) {
      if (result.status.name == "ok") {
        alert("Location successfully added");
        $("#addLocationModal").modal("hide");
        
        $("#input-Location").val("");
        
        $("#locationConfirmAddCheck").prop("checked", false);
        $("#add-Location").attr("disabled", true);

        filterByLocation();
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}



  
// Count employee function
function countEmployeeByDepartmentID() {
  $.ajax({
    url: "libs/php/countEmployeeByDepartmentID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: updateDepartmentID,
    },

    success: function (result) {
      if (result.status.name == "ok") {
        employeeCount = result["data"][0]["COUNT(id)"];
        console.log(employeeCount);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}


// Count department function
function countDepartmentByLocationID() {
  $.ajax({
    url: "libs/php/countDepartmentByLocationID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: updateLocationID,
    },

    success: function (result) {
      if (result.status.name == "ok") {
        departmentCount = result["data"][0]["COUNT(id)"];
        console.log(departmentCount);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}




$( document ).ready(function() {

    

     var sidebar= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
                sidebar.forEach((letter)=>{
                    return  $('.alphabet').append(`<div class="text-center text-success"><a href="#${letter}">${letter}</a></div>`)
                   
                });


           



                $('#nameCol').on('click', ()=>{
                  console.log("clicked")
                  depSort ="";
                  locSort= "";
                  emailSort=""
                  nameSort =="asc";
              if(nameSort=="asc"){
                nameSort = "desc";
                console.log(nameSort)
                filterAllEmployees()
              }else{
                nameSort="asc"
                console.log(nameSort)
                filterAllEmployees()
              }
               
                })

                $('#departmentCol').on('click', ()=>{
                  console.log("clicked")
                  nameSort ="";
                  locSort=""
                  emailSort=""
                  depSort=="asc";
                  
              if(depSort=="asc"){
                depSort = "desc";
                console.log(depSort)
                filterAllEmployees()
              }else{
                depSort="asc"
                console.log(depSort)
                filterAllEmployees()
              }
               
                })

                $('#locationCol').on('click', ()=>{
                  console.log("clicked")
                  nameSort ="";
                  depSort=""
                  emailSort=""
                  locSort=="asc";
                  
              if(locSort=="asc"){
                locSort = "desc";
                console.log(locSort)
                filterAllEmployees()
              }else{
                locSort="asc"
                console.log(locSort)
                filterAllEmployees()
              }
               
                })

                $('#emailCol').on('click', ()=>{
                  console.log("clicked")
                  nameSort ="";
                  depSort=""
                  locSort=""
                  emailSort=="asc";
                  
              if(emailSort=="asc"){
                emailSort = "desc";
                console.log(emailSort)
                filterAllEmployees()
              }else{
                emailSort="asc"
                console.log(emailSort)
                filterAllEmployees()
              }
               
                })

                $('#departmentCol2').on('click', ()=>{
                  console.log("clicked")
                  locSort2 ="";
                  
                  depSort2=="asc";
                  
              if(depSort2=="asc"){
                depSort2 = "desc";
                console.log(depSort2)
                filterByDepartment()
              }else{
                depSort2="asc"
                console.log(depSort2)
                filterByDepartment()
              }
               
                })
               

                $('#locationCol2').on('click', ()=>{
                  console.log("clicked")
                  depSort2 ="";
                  
                  locSort2=="asc";
                  
              if(locSort2=="asc"){
                locSort2 = "desc";
                console.log(locSort2)
                filterByDepartment()
              }else{
                locSort2="asc"
                console.log(locSort2)
                filterByDepartment()
              }
               
                })


                $('#locationCol3').on('click', ()=>{
                  console.log("clicked")
                                    
                  locSort3=="asc";
                  
              if(locSort3=="asc"){
                locSort3 = "desc";
                console.log(locSort3)
                filterByLocation()
              }else{
                locSort3="asc"
                console.log(locSort3)
                filterByLocation()
              }
               
                })




$(".cancel").on('click', ()=>{

    console.log("closed")
    self.location.reload();
})


//location sort

// $('#locationCol').on('click',()=>{
//   console.log('test')
//   sortByLocationName();

// })

//Add Employee on clock

$("#add-employee").on('click',()=>{


  console.log("added")
  addEmployee()

    
  
})

//Add Department on clock

$("#add-Department").on('click',()=>{


  console.log("added")
  addDepartment();

    
  
})


//Add Location on clock

$("#add-Location").on('click',()=>{


  console.log("added")
  addLocation();

    
  
})


//Update Employee on click
// $("#update-employee").on('click', ()=>{

//     updateEmployee();
// })

$("#yesUpdateEmp").on('click', ()=>{

  if(validateUpdateEmployeeForm()){
  updateEmployee();
  } else{

    $('#updateModal').modal('hide');
  }

})

//Delete Employee on click

// $("#delete-employee").on('click', ()=>{
//     deleteEmployee(); 

// })

$("#yesDelete").on('click', ()=>{

  deleteEmployee(); 

})


//Update Department on click

$("#yesUpdateDep").on('click', ()=>{

  if(validateUpdateDepartmentForm()){
  updateDepartment();
  } else{

    $('#updateDepartmentModal').modal('hide');
  }

})


// $("#update-department").on('click', ()=>{

//   updateDepartment();
// })

//Delete Department on click

$("#yesDeleteDep").on('click', ()=>{
  if (employeeCount == 0){
    deleteDepartment();
  }else{
    alert( "You cannot delete this department because it has employee records assigned to it. Please reassign employee records to another department to allow deletion.")
    $('#deleteDepartmentModal').modal('hide');
  }

})

//Update location on click
$("#yesUpdateLoc").on('click', ()=>{
if(validateUpdateLocationForm()){
  updateLocation()} else{

    $('#updateLocationModal').modal('hide');
  }
})

//Delete Department on click

$("#yesDeleteLoc").on('click', ()=>{
 if(departmentCount == 0){
  deleteLocation()
 }else{
alert("You cannot delete this location because it has department records assigned to it. Please reassign department records to another location to allow deletion.")
$('#deleteLocationModal').modal('hide');
 }
})





    $("#empModalCheck").on('change', (event) => {
        if (event.currentTarget.checked) {
            editModeOn=true;
            console.log('Editmode On')
            $('.dis').removeAttr('disabled');
            $('#delete-employee').fadeIn();
            $('#update-employee').fadeIn();
            
            // $('.body-test').hide();

        } else {
            console.log('Editmode Off')
            editModeOn=false;
            $('.dis').attr('disabled', 'disabled')
            // $('.body-test').show();
            $('#empModalCheck').prop("checked", false);
            $('#delete-employee').hide();
            $('#update-employee').hide();
           
            self.location.reload();
        }

      
    })

    $("#depModalCheck").on('change', (event) => {
      if (event.currentTarget.checked) {
          editModeOn=true;
          console.log('Editmode On')
          $('.dis').removeAttr('disabled');
          $('#delete-department').fadeIn();
          $('#update-department').fadeIn();
          // $('.body-test').hide();

      } else {
          console.log('Editmode Off')
          editModeOn=false;
          $('.dis').attr('disabled', 'disabled')
          // $('.body-test').show();
          $('#depModalCheck').prop("checked", false);
          $('#delete-department').hide();
          $('#update-department').hide();
          self.location.reload();
      }

    
  })

  $("#locModalCheck").on('change', (event) => {
    if (event.currentTarget.checked) {
        editModeOn=true;
        console.log('Editmode On')
        $('.dis').removeAttr('disabled');
        $('#delete-location').fadeIn();
        $('#update-location').fadeIn();
        // $('.body-test').hide();

    } else {
        console.log('Editmode Off')
        editModeOn=false;
        $('.dis').attr('disabled', 'disabled')
        // $('.body-test').show();
        $('#locModalCheck').prop("checked", false);
        $('#delete-location').hide();
        $('#update-location').hide();
        self.location.reload();
    }

  
})



    $(".filter-button").on('click',()=>{
        
$(".tog").toggle();
$("#columnTitleWrapper").toggle()
$("#sortByWrapper").toggle()
$("#searchTextWrapper").toggleClass("width", "20vh")
$("#records").toggle()




    })


    

   




    

   


    $("#employeeModal").on("show.bs.modal", function (e) {
        updateEmployeeID = $(e.relatedTarget).data("employee-id");
        console.log(updateEmployeeID);
        getEmployeeByID();
      });

      $("#departmentModal").on("show.bs.modal", function (e) {
        updateDepartmentID = $(e.relatedTarget).data("department-id");
        console.log(updateDepartmentID);
        getDepartmentByID();
        countEmployeeByDepartmentID();
      });

      $("#locationModal").on("show.bs.modal", function (e) {
        updateLocationID = $(e.relatedTarget).data("location-id");
        console.log(updateLocationID);
        getLocationByID()
      });



    // Dynamically populate location select in update employee modal on change of department select
$("#departmentUpdate").change(function () {
    $.ajax({
      url: "libs/php/getDepartmentLocationsByID.php",
      type: "POST",
      data: {
        id: $("#departmentUpdate").val(),
      },
      dataType: "json",
      success: function (result) {
      
        console.log($("#departmentUpdate").val())
         
          $.each(result.data, function (index) {
            $("#locationUpdate").html(
              $("<option>", {
                value: result.data[index].id,
                text: result.data[index].name
                
              })
            );
          });
        
      },
  
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  });

// Dynamically populate location select in add employee modal on change of department select
$("#selectDepartment").change(function () {
  $.ajax({
    url: "libs/php/getDepartmentLocationsByID.php",
    type: "POST",
    data: {
      id: $("#selectDepartment").val(),
    },
    dataType: "json",
    success: function (result) {
    
      console.log($("#selectDepartment").val())

      if($("#selectDepartment").val()=="selectADepartment"){
        $("#selectLocation").html(
          $("<option>", {
            value: "SeletALocation",
            text: "Select Location"
            
          })

        )}
       
        $.each(result.data, function (index) {
          $("#selectLocation").html(
            $("<option>", {
              value: result.data[index].id,
              text: result.data[index].name
              
            })
          );
        });
      
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
});



 

     
    //GET ALL EMPLOYEE DATA

    filterAllEmployees();

    getAllModal2Departments()

    getAllModal2Locations()


        

 
$.ajax({
    url: "libs/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      $.each(result.data, function (index) {
        $("#departmentFilter").append(
          $("<option>", {
            value: result.data[index].id,
            text: result.data[index].name,
          })
        );
      });
    },
  
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });



          // Dynamically populate department select filter - desktop
$.ajax({
  url: "libs/php/getAllLocations.php",
  type: "POST",
  dataType: "json",
  success: function (result) {
    $.each(result.data, function (index) {
      $("#locationFilter").append(
        $("<option>", {
          value: result.data[index].id,
          text: result.data[index].name,
        })
      );
    });
  },

  error: function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown);
  },
});
 
    // Change Filter

    $("#filterBy").change(function () {
       
      
        if ($("#filterBy").val() == "departments") {
            console.log('departments')

            $(".alphabet").hide();
            $("#mainBody").removeClass("results");
            $("#mainBody").addClass("results2");
            $("#departmentFilter").hide();
            $("#locationFilter").hide();
            $('#addAnEmployee').hide();
    $('#addADepartment').show();
    $('#addAlocation').hide();
            
        
        filterByDepartment()
        
        }

        if ($("#filterBy").val() == "locations") {
            console.log('locations')

            $(".alphabet").hide();
            $("#mainBody").removeClass("results");
            $("#mainBody").addClass("results2");
            $("#departmentFilter").hide();
            $("#locationFilter").hide();
            $('#addAnEmployee').hide();
            $('#addADepartment').hide();
            $('#addAlocation').show();

            filterByLocation()
        }


        if ($("#filterBy").val() == "employees") {
            // e.preventDefault();
            // self.location.reload();
           
            $(".alphabet").show();
            $("#mainBody").removeClass("results2");
            $("#mainBody").addClass("results");
            $("#departmentFilter").show();
            $("#locationFilter").show();
            $("#departmentFilter").val("allDepartments");
            $("#departmentFilter").attr("disabled", false);
            $("#locationFilter").val("allLocations");
            $("#locationFilter").attr("disabled", false);
            $('#addAnEmployee').show();
            $('#addADepartment').hide();
            $('#addAlocation').hide();
            
         ;
           

        //     $(".alphabet").hide();
        //     $("#mainBody").removeClass("results");
        //     $("#mainBody").addClass("results2");
        //     // $('#mainBody').addClass(".results2")
        // //   $("#filterByTitle").hide();
        // //   $("#filterByDepartment").hide();
        // //   $("#filterByLocation").hide();
        // //   $(".lineBreak").hide();
        // //   $("#addEmployeeBtn").hide();
        // //   $("#addDepartmentBtn").show();
        // //   $("#addLocationBtn").hide();
        filterAllEmployees();
        }
        
    })

//filter department on change
    $("#departmentFilter").change(function () {
        if ($("#departmentFilter").val() == "allDepartments") {
          $("#locationFilter").attr("disabled", false);
          filterAllEmployees();
        } else {
          $("#locationFilter").attr("disabled", true);
          employeeFilterByDepartment();
          
        }
      });

//filter location on change

      $("#locationFilter").change(function () {
        if ($("#locationFilter").val() == "allLocations") {
          $("#departmentFilter").attr("disabled", false);
          filterAllEmployees();
        } else {
          $("#departmentFilter").attr("disabled", true);
          employeeFilterByLocation();
          
        }
      });


$("#employeeConfirmAddCheck").click(function () {
  if (validateAddEmployeeForm()) {
    if ($(this).is(":checked")) {
      $("#add-employee").attr("disabled", false);
    } else {
      $("#add-employee").attr("disabled", true);
    }
  } else {
    $("#employeeConfirmAddCheck").prop("checked", false);
  }
});


$("#departmentConfirmAddCheck").click(function () {
  if (validateAddDepartmentForm()) {
    if ($(this).is(":checked")) {
      $("#add-Department").attr("disabled", false);
    } else {
      $("#add-Department").attr("disabled", true);
    }
  } else {
    $("#departmentConfirmAddCheck").prop("checked", false);
  }
});

// validate Add Location Form

$("#locationConfirmAddCheck").click(function () {
  if (validateAddLocationForm()) {
    if ($(this).is(":checked")) {
      $("#add-Location").attr("disabled", false);
    } else {
      $("#add-Location").attr("disabled", true);
    }
  } else {
    $("#locationConfirmAddCheck").prop("checked", false);
  }
});
   

});
