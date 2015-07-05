$(document).ready(function() {

    var html = '';
    html += "<li>";
    html += "<label for='label'> Input Label: </label>";
    html += "<input type='text' required autofocus>";
    html += "<label for='type'> Type: </label>";
    html += "<select name='type' id='type'>";
    html += "<option value='text' selected>Text</option>";
    html += "<option value='multiline-text'>Multiline-Text</option>";
    html += "<option value='date'>Date</option>";
    html += "<option value='email'>Email</option>";
    html += "<option value='password'>Password</option>";
    html += "<option value='username'>Username</option>";
    html += "</select>";
    html += "<label for='required'> Required Field? </label>";
    html += "<select name='required' id='required'>";
    html += "<option value='yes'>Yes</option>";
    html += "<option value='no'>No</option>";
    html += "</select>";
    html += "</li>";
    
  $("#new-field").click(function() {
    $("ul").append(html);
  });








});