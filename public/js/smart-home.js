$( document ).ready( function() {

    console.log("HEY HEY HEY");

    $.ajax({
          type: "GET",
          url: "/smart-home/lights",
          dataType: "json"
    }).done (function (data) {
        console.log("DATA",data);
    });

    $('#lights-table tbody tr').each( function () {
        var id = $(this)[0].id.replace("light-", "");
        var lightState = $(this).find('td.light-state').html();

        $(this).find('button.on-off').click( function (){
            console.log("LIGHT STATE", lightState);
            $.ajax({
                type: "GET",
                url: "/smart-home/bulb/" + id + "/toggle",
                dataType: "json"
            }).done(function (data) {
                console.log("DONE");
            });

            console.log("CLICK", id);
        });
    })

    $('#group1Toggle').click( function () {
        console.log("THIS", $(this));
        $.ajax({
            type: "GET",
            url: "/smart-home/group/" + 2 + "/toggle",
            dataType: "json"
        }).done(function (data) {
            console.log(data);
        });
    })

    //$('#lights-table tbody')

});
