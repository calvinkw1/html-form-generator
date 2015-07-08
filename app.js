$(document).ready(function() {

  var labelIDs = [0],
      typeIDs = [0],
      requiredIDs = [0],
      counter = 1,
      labelVals = [],
      typeVals = [],
      requiredVals = [];

// clones the original input row and changes the id #s for each input before appending to the list element
  $("#new-field").click(function() {
    var newLabelID = "label-" + counter,
        newTypeID = "type-" + counter,
        newRequiredID = "required-" + counter,
        $clonedField = $("#orig-input").clone().removeAttr("id").addClass("cloned");
        $clonedField.find("#label-0").attr("id", newLabelID);
        $clonedField.find("#type-0").attr("id", newTypeID);
        $clonedField.find("#required-0").attr("id", newRequiredID);
        $clonedField.appendTo($("ul"));
    labelIDs.push(newLabelID);
    typeIDs.push(newTypeID);
    requiredIDs.push(newRequiredID);
    counter++;
  });

  $("form").submit(function(e) {
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
    firstInputSetAttrs();
    clonedInputSetAttrs();
    $("#generated-form").show('slide');
  }

  function firstInputSetAttrs() {
    var $firstInput = $("#first-input");
    $firstInput.find('label').attr('for', labelVals[0]);
    $firstInput.find('label').text(labelVals[0]);
    if (typeVals[0] === "multiline-text") {
      $firstInput.find('input').replaceWith("<textarea name='" + labelVals[0].toLowerCase() + "' id='" + labelVals[0].toLowerCase() + "' cols='30' rows='10'>");
      if (requiredVals[0] === "yes") {
        $firstInput.find("textarea").prop("required", true);
      }
    } else {
      if (requiredVals[0] === "yes") {
        $firstInput.find('input').prop({
          type: typeVals[0],
          id: labelVals[0],
          required: true
        });
      }
      else {
        $firstInput.find('input').attr({
          type: typeVals[0],
          id: labelVals[0]
        });
      }
    }
    $firstInput.appendTo($("#generated-form"));
  }

  function clonedInputSetAttrs() {
    for (var i = 1; i < labelVals.length; i++) {
      var $clonedInput = $("#first-input").clone().removeAttr("id").addClass("cloned-input");
      $clonedInput.find("label").attr("for", labelVals[i]);
      $clonedInput.find("label").text(labelVals[i]);
      if (typeVals[i] === "multiline-text") {
        $clonedInput.find('input').replaceWith("<textarea name='" + labelVals[i].toLowerCase() + "' id='" + labelVals[i].toLowerCase() + "' cols='30' rows='10'>");
        if (requiredVals[i] === "yes") {
          $clonedInput.find("textarea").prop("required", true);
        }
      } else {
        $clonedInput.find('input').attr({
          type: typeVals[i],
          id: labelVals[i]
        });
        if (requiredVals[i] === "yes") {
          $clonedInput.find("input").prop("required", true);
        }
      }
    $clonedInput.appendTo($("#generated-form"));
    }
  }

  function genForm() {
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