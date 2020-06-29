var express = require("express");
 
var app = express();
 
app.use(express.static("public"));
 
app.set("view engine", "ejs");
app.set("views", "./views");
 
app.listen(3000);
 
app.get("/", function(request, response)  {
    
    response.render("index");
});
 
app.get("/left-sidebar", function(request, response)  {
    
    response.render("left-sidebar");
});
// trả về đường dẫn như bên file js