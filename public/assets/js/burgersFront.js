$(document).ready(() => {
  $("#burger-name-text").keydown(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      this.form.submit();
    }
  });

  $(document).on("click", "#add-to-menu-burger", function(e) {
    e.preventDefault();

    let id = $(this).data("id");

    let newIDObj = {
      newID: id,
      devouredValue: 0
    };

    $.ajax("/api/burgers/", {
      type: "PUT",
      data: newIDObj
    }).then(() => {
      console.log("changed devour");
      location.reload();
    });
  });

  $(document).on("click", "#devour-burger", function(e) {
    e.preventDefault();

    let id = $(this).attr("data-id");

    // Data that is being send to the actual put request in burgers_controller
    let newIDObj = {
      newID: id,
      devouredValue: 1
    };

    $.ajax("/api/burgers/", {
      type: "PUT",
      data: newIDObj
    }).then(() => {
      console.log("changed devour");
      location.reload();
    });
  });
});
