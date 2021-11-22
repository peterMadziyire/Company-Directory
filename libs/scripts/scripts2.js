
function displayStaff(arg) {
   var sorted= arg.sort((a,b)=>{return a.firstName - b.firstName; });
   console.log(sorted);
    var staff= arg.map((result)=>{
        return  `<div class="col-12" id="${result.lastName.charAt(0)}"> ${result.lastName}, ${result.firstName}</div>`







        
    })

    $("#searchResults").html(staff)

}


$( document ).ready(function() {

    $(".filter-button").on('click',()=>{
$(".tog").toggle();

    })

    $.ajax({
        url: "libs/php/getAll.php",
        type: "POST",
        dataType: "json",
        success: function (results) {
            console.log(results)

        

            var sidebar= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
            sidebar.forEach((letter)=>{
                return  $('.alphabet').append(`<div class="text-center"><a href="#${letter}">${letter}</a></div>`)
               
            })
            displayStaff(results.data);

        //    var staffDiv= results.data.map((result)=>{
        //     return   `<div class="col-6">${result.firstName} ${result.lastName}</div>`
        //    })

        //    console.log(staffDiv)

        //    $("#searchResults").append(staffDiv)

        //    var filteredStaff= results.data.filter((result)=>{
        //     return( 
        //         result.laa
        //     )

        //    })

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

 
    // Your code here.

});
