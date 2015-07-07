$(document).ready(function() {

  var labelIDs = [0],
      typeIDs = [0],
      requiredIDs = [0];

  var counter = 1;
  // $("#new-field").click(function() {
  //   var html = '';
  //   labelIDs.push(counter);
  //   html += "<li>";
  //   html += "<label for='label'> Input Label: </label>";
  //   html += "<input type='text' class='labels' id='label-" + counter + "' required autofocus>";
  //   html += "<label for='type'> Type: </label>";
  //   html += "<select name='type' class='types' id='type-" + counter + "'>";
  //   html += "<option value='text' selected>Text</option>";
  //   html += "<option value='multiline-text'>Multiline-Text</option>";
  //   html += "<option value='date'>Date</option>";
  //   html += "<option value='email'>Email</option>";
  //   html += "<option value='password'>Password</option>";
  //   html += "<option value='username'>Username</option>";
  //   html += "</select>";
  //   html += "<label for='required'> Required Field? </label>";
  //   html += "<select name='required' class='required' id='required-" + counter + "'>";
  //   html += "<option value='yes'>Yes</option>";
  //   html += "<option value='no'>No</option>";
  //   html += "</select>";
  //   // html += "<input type='button' class='remove' value='Remove'";
  //   html += "</li>";
  //   $("ul").append(html);
  //   counter += 1;
  //   // $('.remove').click(function() {
  //   //   console.log(this);
  //   // });
  // });

// ^^ above function is the same as below function, but refactored based on Martin's suggestion

// clones the original input row and changes the id #s for each input before appending to the list element
  $("#new-field").click(function() {
    var newLabelID = "label-" + counter,
        newTypeID = "type-" + counter,
        newRequiredID = "required-" + counter,
        $clonedElement = $("#orig-input").clone().removeAttr("id").addClass("cloned");
        $clonedElement.find("#label-0").attr("id", newLabelID);
        $clonedElement.find("#type-0").attr("id", newTypeID);
        $clonedElement.find("#required-0").attr("id", newRequiredID);
        $clonedElement.appendTo($("ul"));
    counter += 1;
  });

  var labelVals = [],
      typeVals = [],
      requiredVals = [];
  $("#generate").click(function(e) {
    e.preventDefault();
    // counter = 1; // reset counter in case generate button is clicked again
    $("tbody").empty(); // clear table's tbody in case generate button is clicked again
    generateTableData();
    generateForm();
    generateSource();
  });

  $("#view-source").click(function() {
    $("#source-block").slideDown();
  });


  function generateTableData() {
    for (var i = 0; i < labelIDs.length; i++) { // labelIDs, typeIDs, and requiredIDs arrays will always be same length
      labelVals.push($("#label-" + i).val());
      typeVals.push($("#type-" + i).val());
      requiredVals.push($("#required-" + i).val());
    }
    for (var j = 0; j < labelVals.length; j++) { // labelVals, typeVals, and requiredVals arrays will always be same length
      var html = "<tr>";
      html += "<td>" + labelVals[j] + "</td>";
      html += "<td>" + typeVals[j] + "</td>";
      html += "<td>" + requiredVals[j] + "</td>";
      html += "</tr>";
      $("tbody").append(html);
    }
    $("#data-table").show('slide');
  }

  function generateForm() {
    var html = "";
    for (var i = 0; i < labelVals.length; i++) {
      html += "<form action='#'>";
      html += "<label for='" + labelVals[i] + "'>" + labelVals[i] + ": </label>";
      if (typeVals[i] === "multiline-text") {
        html += "<textarea name='" + labelVals[i].toLowerCase() + "' id='" + labelVals[i].toLowerCase() + "' cols='30' rows='10'";
        if (requiredVals[i] === "yes") {
          html += "required></textarea><br>";
        } else {
          html += "></textarea><br>";
        }
      } else {
        if (requiredVals[i] === "yes") {
          html += "<input type='" + typeVals[i] + "' id='" + labelVals[i].toLowerCase() + "' required><br>";
        } else {
          html += "<input type='" + typeVals[i] + "'><br>";
        }
      }
    }
    html += "<input type='submit'></form>";
    $("#generated-form").append(html);
    $("#generated-form").show('slide');
  }

  function generateSource() {
    for (var i = 0; i < labelVals.length; i++) {
      $("pre").append("    &lt;label for='" + labelVals[i].toLowerCase() + "'>" + labelVals[i] + ": &lt;label><br>");
      if (typeVals[i] === "multiline-text") {
        var html = "    &lt;textarea name='" + labelVals[i].toLowerCase() + "' id='" + labelVals[i].toLowerCase() + "' cols='30' rows='10'";
        console.log(html);
        if (requiredVals[i] === "yes") {
          $("pre").append(html + " required>&lt;/textarea><br>");
        } else {
          $("pre").append(html + ">&lt;/textarea></br>");
        }
      } else {
        if (requiredVals[i] === "yes") {
          $("pre").append("    &lt;input type='" + typeVals[i] + "' id='" + labelVals[i].toLowerCase() + "' required><br>");
        } else {
          $("pre").append("    &lt;input type='" + typeVals[i] + "'><br>");
        }
      }
    }
    $("pre").append("    &lt;input type='submit'><br>");
    $("pre").append("  &lt;/form>");
  }

});