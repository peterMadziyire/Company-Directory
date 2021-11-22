var editModeOn = false;
var updateEmployeeID = "No Employee ID";
var updateDepartmentID="No Employee ID";
var updateLocationID="No Employee ID";
var deleteEmployeeID="No Employee ID";

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

//Apend location option
function getAllLocations(){
    $.ajax({
      url: "libs/php/getAllLocations.php",
      type: "POST",
      dataType: "json",
      success: function (results) {  
          console.log(results)
  
          results.data.forEach((element)=>{
              $("#locationUpdate").append("<option value='"+element.id+"'>"+element.name+"</option>")
  
          })
  
      },
      error: function (request, status, error) {
          console.log(error);
        },
  })
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
          console.log("Employee successfully updated");
          $("#employeeModal").modal("hide");
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
            


        //   $("#deleteEmployeeModal").modal("hide");
        //   $(document).ready(function () {
        //     getAllEmployees();
        //   });
        //   $("#employeeConfirmDeleteCheck").prop("checked", false);
        //   $("#employeeConfirmDeleteBtn").attr("disabled", true);
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
           var sorted= arg.sort((a,b)=>{return a.firstName - b.firstName; });
           console.log(sorted);
        
          
    

           
            var staff= arg.map((result)=>{
                // return  `<div class="col-12" id="${result.lastName.charAt(0)}"> ${result.lastName}, ${result.firstName}</div>`
        
        // <td class="nameClass col-3 entry55" data-toggle="modal" data-target="#updateModal"><div class="contact-entry"><div class="name-initial bg-success">t</div><div class="full-name">${result.lastName}, ${result.firstName}</div></div></td>
        
        
        
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

        // var sidebar= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        // sidebar.forEach((letter)=>{
        //      $('.alphabet').append(`<div class="text-center text-success"><a href="#${letter}">${letter}</a></div>`)
           
        // }); 
        $("#records").html(`<i>Total Records: ${arg.length}</i>`);
   var sorted= arg.sort((a,b)=>{return a.firstName - b.firstName; });
   console.log(sorted);

   
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
            displayStaff(results.data);

     

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

                
           var sorted= arg.sort((a,b)=>a.name-b.name);
           console.log(sorted);
        
           
            var departments= arg.map((result)=>{
             
        
                return `<tr  id="${result.name.charAt(0)}">
        
        <td class="nameClasscol-3 entry55" data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal">
            <div class="d-flex data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal"><div id="initial-cont" class="name-initial align-items-center bg-success">${result.name.charAt(0)}</div>  
            <div class="d-flex data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal""><div id="delete-cont" class="name-initial align-items-center bg-danger"><i class="far fa-trash-alt"></i></div>
            ${result.name}</div></td>
        <td class="locationClass2 col-3 entry55" data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal">${result.locationID}</td>
        
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
        url: "libs/php/getAllDepartments.php",
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

        
   var sorted= arg.sort();
   console.log(sorted);

   
    var locations= arg.map((result)=>{
     

        return `<tr  id="${result.name.charAt(0)}">

<td class="nameClasscol-3 entry55" data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal">
    <div class="d-flex data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal"><div id="initial-cont" class="name-initial align-items-center bg-success">${result.name.charAt(0)}</div>  
    <div class="d-flex data-toggle="modal" data-employee-id=${result.id} data-target="#employeeModal""><div id="delete-cont" class="name-initial align-items-center bg-danger"><i class="far fa-trash-alt"></i></div>
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


$( document ).ready(function() {

    

     var sidebar= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
                sidebar.forEach((letter)=>{
                    return  $('.alphabet').append(`<div class="text-center text-success"><a href="#${letter}">${letter}</a></div>`)
                   
                });


               

// Modal buttons events

    $(".close").on('click', ()=>{

    console.log("closed")
    self.location.reload();
})


$(".cancel").on('click', ()=>{

    console.log("closed")
    self.location.reload();
})


//Update Employee on click
$("#update-employee").on('click', ()=>{

    updateEmployee();
})

//Delete Employee on click

$("#delete-employee").on('click', ()=>{
    deleteEmployee(); 

})

    $("#modalCheck").on('change', (event) => {
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
            $('#modalCheck').prop("checked", false);
            $('#delete-employee').hide();
            $('#update-employee').hide();
            self.location.reload();
        }

      
    })


    $(".filter-button").on('click',()=>{
        
$(".tog").toggle();
$("#columnTitleWrapper").toggle()
$("#sortByWrapper").toggle()
$("#searchTextWrapper").toggleClass("width", "20vh")
$("#records").toggle()
// $(".expand").css("text-align", "center")
// $("#searchTextWrapper").css("margin", "auto")
// $('#initial-cont').toggle();
// $('#delete-cont').toggle();

// if ($('#delete-cont').css({"display":"none"})){
//     return $('#delete-cont').css({"display":"flex"})
// }else if(
//     $('#delete-cont').css({"display":"flex"})
// ){
//     return $('#delete-cont').css({"display":"none"})
// }



    })


    // $(".entry55").on('click', ()=>{


    // })

    // $.ajax({
    //     url: "libs/php/getAllData.php",
    //     type: "POST",
    //     dataType: "json",
    //     success: function (results) {  
    //         console.log(results)


    //     },
    //     error: function (request, status, error) {
    //         console.log(error);
    //       },





    // })

   




    // $.ajax({
    //     url: "libs/php/getAllDepartments.php",
    //     type: "POST",
    //     dataType: "json",
    //     success: function (results) {  
    //         console.log(results)

    //         results.data.forEach((element)=>{
    //             $("#departmentUpdate").append("<option value='"+element.id+"'>"+element.name+"</option>")

    //         })

    //     },
    //     error: function (request, status, error) {
    //         console.log(error);
    //       },





    // })


    $("#employeeModal").on("show.bs.modal", function (e) {
        updateEmployeeID = $(e.relatedTarget).data("employee-id");
        console.log(updateEmployeeID);
        getEmployeeByID();
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


    // $.ajax({
    //     url: "libs/php/getAllLocations.php",
    //     type: "POST",
    //     dataType: "json",
    //     success: function (results) {  
    //         console.log(results)

    //         results.data.forEach((element)=>{
    //             $("#locationUpdate").append("<option value='"+element.id+"'>"+element.name+"</option>")

    //         })

    //     },
    //     error: function (request, status, error) {
    //         console.log(error);
    //       },


   


    // })
   
    //GET ALL EMPLOYEE DATA

    filterAllEmployees();
    // displyEmployees()
        
        // $.ajax({
        // url: "libs/php/getAllData.php",
        // type: "POST",
        // dataType: "json",
        // success: function (results) {
        //     console.log(results)

        
        //     displayStaff(results.data);

     

        // $("#searchBar").keyup((e)=>{
        //     var searchString= e.target.value.toLowerCase();
        //    var filteredStaff= results.data.filter((result)=>{
        //        return result.firstName.toLowerCase().includes(searchString)||result.lastName.toLowerCase().includes(searchString)

        //     });
        //     console.log(filteredStaff)

        //     displayStaff(filteredStaff);

        //     })
        // },

        

        // error: function (request, status, error) {
        //     console.log(error);
        //   },
        // });




        // Dynamically populate department select filter - desktop
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
 
    // Change Filter

    $("#filterBy").change(function () {
       
      
        if ($("#filterBy").val() == "departments") {
            console.log('departments')

            $(".alphabet").hide();
            $("#mainBody").removeClass("results");
            $("#mainBody").addClass("results2");
            $("#departmentFilter").hide();
            $("#locationFilter").hide();
            
            // $('#mainBody').addClass(".results2")
        //   $("#filterByTitle").hide();
        //   $("#filterByDepartment").hide();
        //   $("#filterByLocation").hide();
        //   $(".lineBreak").hide();
        //   $("#addEmployeeBtn").hide();
        //   $("#addDepartmentBtn").show();
        //   $("#addLocationBtn").hide();
        
        filterByDepartment()
        
        }

        if ($("#filterBy").val() == "locations") {
            console.log('locations')

            $(".alphabet").hide();
            $("#mainBody").removeClass("results");
            $("#mainBody").addClass("results2");
            $("#departmentFilter").hide();
            $("#locationFilter").hide();

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

});
