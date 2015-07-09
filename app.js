$(document).ready(function() {

  var counter = 1,
      $origInput = $("#orig-input").clone(),
      $firstInput = $("#first-input").clone();

  var fields = [];

  function initOrigField() {
    fields.push({
    $element: $("#orig-input"),
      label: {
        id: "label-0",
        value: null
      },
      type: {
        id: "type-0",
        value: null
      },
      required: {
        id: "required-0",
        value: false
      }
    });
  }

  initOrigField();

// ***** START BUTTONS *****
  // main generator function on submit that calls the other functions to do the heavy lifting
  $("#form-generator").submit(function(e) {
    e.preventDefault();
    counter = 1;
    generateTableData();
    generateForm();
    generateSource();
    $("#view-source").show('slide');
  });

  // reset button - had to ditch using replaceWith() for body el, as it was removing event listeners
  $("#reset").click(function () {
    counter = 1;
    $("ul").empty().append($origInput);
    $("#gen-form").empty().append($firstInput);
    $("tbody").empty();
    $("code").empty();
    $("#data-table").hide('slide');
    $("#generated-form").hide('slide');
    $("#view-source").hide('slide');
    $("#source-block").hide('slide');
    fields = [];
    initOrigField();
    console.log(fields);
  });

  // view source button
  var sourceShow = false;
  $("#view-source").click(function() {
    if (sourceShow === false) {
      $("#source-block").slideDown();
      sourceShow = true;
    }
    else {
      $("#source-block").slideUp();
      sourceShow = false;
    }
  });
// ***** END BUTTONS *****

// clones the original input row and changes the id #s for each input before appending to the list element, pushing IDs into the field object
  $("#new-field").click(function() {
    var newLabelID = "label-" + counter,
        newTypeID = "type-" + counter,
        newRequiredID = "required-" + counter,
        $clonedField = $("#orig-input").clone().removeAttr("id").addClass("cloned");
    $clonedField.find("#label-0").attr("id", newLabelID);
    $clonedField.find("#type-0").attr("id", newTypeID);
    $clonedField.find("#required-0").attr("id", newRequiredID);
    fields.push({
      $element: $clonedField,
      label: {
        id: newLabelID,
        value: null
      },
      type: {
        id: newTypeID,
        value: null
      },
      required: {
        id: newRequiredID,
        value: false
      }
    });
    $clonedField.appendTo($("ul"));
    counter++;
  });

// pushes labelVals, typeVals, and requiredVals into respective arrays, then iterates over one of the arrays to fill data into the table
  function generateTableData() {
    console.log(fields);
    for (var i = 0; i < fields.length; i++) { // labelIDs, typeIDs, and requiredIDs arrays will always be same length
      fields[i].label.value = $("#label-" + i).val();
      fields[i].type.value = $("#type-" + i).val();
      fields[i].required.value = $("#required-" + i).val();
    }
    for (var j = 0; j < fields.length; j++) {
      var html = "<tr>";
      html += "<td>" + fields[j].label.value + "</td>";
      html += "<td>" + fields[j].type.value + "</td>";
      html += "<td>" + fields[j].required.value + "</td>";
      html += "</tr>";
      $("tbody").append(html);
    }
    $("#data-table").show('slide');
  }

// main generate form function
  function generateForm() {
    firstInputSetAttrs();
    clonedInputSetAttrs();
    $("#gen-form").append("<input type='submit'>");
    $("#generated-form").show('slide');
  }

// sets attrributes for first input as the form html, minus attr's, already exists in the html file
  function firstInputSetAttrs() {
    var $firstInput = $("#first-input");
    $firstInput.find('label').attr('for', fields[0].label.value.toLowerCase());
    $firstInput.find('label').text(fields[0].label.value + ": ");
    if (fields[0].type.value === "multiline-text") {
      $firstInput.find('input').replaceWith("<textarea name='" + fields[0].type.value.toLowerCase() + "' id='" + fields[0].type.value.toLowerCase() + "' cols='30' rows='10'>");
      if (fields[0].required.value === "yes") {
        $firstInput.find("textarea").prop("required", true);
      }
    } else {
      if (fields[0].required.value === "yes") {
        $firstInput.find('input').prop({
          type: fields[0].type.value,
          id: fields[0].label.value,
          required: fields[0].required.value
        });
      }
      else {
        $firstInput.find('input').attr({
          type: fields[0].type.value,
          id: fields[0].label.value,
        });
      }
    }
    $firstInput.appendTo($("#gen-form"));
  }

// clones the first input and sets attr's for the cloned inputs before appending to form
  function clonedInputSetAttrs() {
    for (var i = 1; i < fields.length; i++) {
      var $clonedInput = $("#first-input").clone().removeAttr("id").addClass("cloned-input");
      $clonedInput.find("label").attr("for", fields[i].label.value);
      $clonedInput.find("label").text(fields[i].label.value + ": ");
      if (fields[i].type.value === "multiline-text") {
        $clonedInput.find('input').replaceWith("<textarea name='" + fields[i].type.value.toLowerCase() + "' id='" + fields[i].type.value.toLowerCase() + "' cols='30' rows='10'>");
        if (fields[0].required.value === "yes") {
          $clonedInput.find("textarea").prop("required", true);
        }
      } else {
        $clonedInput.find('input').attr({
          type: fields[i].type.value,
          id: fields[i].label.value
        });
        if (fields[0].required.value === "yes") {
          $clonedInput.find("input").prop("required", true);
        } else {
          $clonedInput.find("input").removeAttr("required");
        }
      }
    $clonedInput.appendTo($("#gen-form"));
    }
  }

// clones the generated form and then grabs the html of the form as a string and converts to array. Loops through and replaces < and > for <pre> formatting
  function generateSource() {
    var $clonedForm = $("#generated-form").clone().attr("id", "form-source").html();
    var textArray = $clonedForm.split(''),
        modifiedString;
    for (var i = 0; i < textArray.length; i++) {
      if (textArray[i] === "<") {
        textArray[i] = "&lt;";
      }
      if (textArray[i] === ">") {
        textArray[i] = "&gt;";
      }
      
    }
    modifiedString = textArray.join('');
    $("code").append(modifiedString);
  }

});