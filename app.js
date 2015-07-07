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

  var labelVals = [],
      typeVals = [],
      requiredVals = [];
  $("#generate").click(function(e) {
    e.preventDefault();
    // counter = 1; // reset counter in case generate button is clicked again
    $("tbody").empty(); // clear table's tbody in case generate button is clicked again
    generateTableData();
    generateSource();
  });  



  function generateTableData() {
    for (var i = 0; i < labelIDs.length; i++) { // labelIDs, typeIDs, and requiredIDs arrays will always be same length
      labelVals.push($("#label-" + i).val());
      typeVals.push($("#type-" + i).val());
      requiredVals.push($("#required-" + i).val());
    }
    console.log(labelVals);
    console.log(typeVals);
    console.log(requiredVals);
    for (var j = 0; j < labelVals.length; j++) { // labelVals, typeVals, and requiredVals arrays will always be same length
      var html = "<tr>";
      html += "<td>" + labelVals[j] + "</td>";
      html += "<td>" + typeVals[j] + "</td>";
      html += "<td>" + requiredVals[j] + "</td>";
      html += "</tr>";
      $("tbody").append(html);
    }
  }

  function generateSource() {
    var html;
    for (var i = 0; i < labelVals.length; i++) {
      $("pre").append("    &lt;label for='" + labelVals[i].toLowerCase() + "'>" + labelVals[i] + ": &lt;label><br>");
      if (requiredVals[i] === "yes") {
        $("pre").append("    &lt;input type='" + typeVals[i] + "' id='" + labelVals[i].toLowerCase() + "' required><br>");
      } else {
        $("pre").append("    &lt;input type='" + typeVals[i] + "'><br>");
      }
    }
    $("pre").append("    &lt;input type='submit'><br>");
    $("pre").append("  &lt;/form>");
  }

});