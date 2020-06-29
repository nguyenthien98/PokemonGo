$(document).ready(function () {
  //=====Login Form Request=============================================
  $("#loginForm").click(function () {

    event.preventDefault();
    var uname = $("#uname").val();
    var upass = $("#upass").val();
    var loginData = { 'uname': uname, 'upass': upass };
    $.ajax({
      type: "post",
      url: "/loginmap",
      data: loginData,
      dataType: "json",
      success: function (response) {
        console.log(response);
        if (response.done) {
          if (response.role == 1) {
            window.location.href = "/admin";
          }
          else {
            window.location.href = "/map";
          }
        }
        else {
          window.location.href = "/login"
        }

      }
    });
  });
  $("#regForm").click(function () {
    var uname = $("#uname").val();
    var upass = $("#upass").val();
    var email = $("#email").val();
    // var phone = $("#phone").val();
    // var education = $("#education").val();
    // var aoi = $("#aoi").val();
    // var name = $("#name").val();
    // var pass = $("#pass").val();
   
    var regData = { 'uname': uname, 'upass': upass, 'email': email };
    $.ajax({
      type: "post",
      url: "/insertpokemon",
      data: regData,
      dataType: "json",
      success: function (response) {
        if (response.done) {
          window.location.href = "/map";
        }
        else {
          window.location.href = "/login"
        }

      }
    });
  });
});