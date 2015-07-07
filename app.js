$(document).ready(function() {

  var labelIDs = [0],
      typeIDs = [0],
      requiredIDs = [0];

  var counter = 1;
  $("#new-field").click(function() {
    var html = '';
    labelIDs.push($(counter));
    html += "<li>";
    html += "<label for='label'> Input Label: </label>";
    html += "<input type='text' class='labels' id='label-" + counter + "' required autofocus>";
    html += "<label for='type'> Type: </label>";
    html += "<select name='type' class='types' id='type-" + counter + "'>";
    html += "<option value='text' selected>Text</option>";
    html += "<option value='multiline-text'>Multiline-Text</option>";
    html += "<option value='date'>Date</option>";
    html += "<option value='email'>Email</option>";
    html += "<option value='password'>Password</option>";
    html += "<option value='username'>Username</option>";
    html += "</select>";
    html += "<label for='required'> Required Field? </label>";
    html += "<select name='required' class='required' id='required-" + counter + "'>";
    html += "<option value='yes'>Yes</option>";
    html += "<option value='no'>No</option>";
    html += "</select>";
    // html += "<input type='button' class='remove' value='Remove'";
    html += "</li>";
    $("ul").append(html);
    counter += 1;
    // $('.remove').click(function() {
    //   console.log(this);
    // });


  });

  $("#generate").click(function(e) {
    e.preventDefault();
    counter = 1; // reset counter on click of generate button
    generateTableData();
    // generateSource();
  });  



  function generateTableData() {
    var labelVals = [],
        typeVals = [],
        requiredVals = [];
    for (var i = 0; i < labelIDs.length; i++) {
      labelVals.push($("#label-" + i).val());
      typeVals.push($("#type-" + i).val());
      requiredVals.push($("#required-" + i).val());
    }
    console.log(labelVals);
    console.log(typeVals);
    console.log(requiredVals);
    for (var j = 0; j < labelVals.length; j++) {
      var html = "<tr>";
      html += "<td>" + labelVals[j] + "</td>";
      html += "<td>" + typeVals[j] + "</td>";
      html += "<td>" + requiredVals[j] + "</td>";
      html += "</tr>";
      $("tbody").append(html);
    }
  }

  function generateSource() {

  }



});