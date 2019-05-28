window.addEventListener("load", function() {

  var form = document.getElementById("ds_signup");

  if (form) {
      //take over validation
      form.setAttribute("novalidate", "novalidate");

      form.addEventListener("submit", function(event) {

          var checks = [
              ["cd_FIRSTNAME", "ds_firstnameError", "Please enter your first name", "ds_firstnameGroup"],
              ["cd_LASTNAME", "ds_lastnameError", "Please enter your last name", "ds_lastnameGroup"],
              ["Email", "ds_emailError", "Please enter a valid email address", "ds_emailGroup"],
              ["cd_DEMENTIAINFO", "ds_statusError", "Please give more detail", "ds_statusGroup"],
              ["agree_terms", "ds_tcError", "Please confirm you agree to our terms of service", "ds_confirmGroup"],
              ["agree_terms_2", "ds_tcError_2", "Please confirm you agree to our terms of service", "ds_confirmGroup_2"],
          ];

          var numErrs = 0;

          for (var i = 0; i < checks.length; i++) {
              if (!checkInput(checks[i][0], checks[i][1], checks[i][2], checks[i][3])) {
                  numErrs++;
              }
          }

          //Check if additional details input visible, it has been filled
          var statusDetail = document.getElementById("ds_status_detail");
          if (document.getElementById("ds_statusDetailGroup").style.display == "block") {
              statusDetail.required = true;
              if (!checkInput("status_detail", "ds_statusError", "Please give more detail", "ds_statusGroup")) {
                  numErrs++;
              }
          } else {
              statusDetail.required = false;
          }

          if (numErrs === 0) {
              //If additional 'Other' details entered send instead of 'Other'
              if (statusDetail.value.length > 0) {
                  document.getElementById("ds_status_3").value = statusDetail.value
              }
          } else {

              // Prevent form being sent
              event.preventDefault();

          }

      }, false);

      var radioButtons = document.getElementsByClassName("nhsuk-radios__input");
      for (var i = 0; i < radioButtons.length; i++) {
          radioButtons[i].addEventListener("click", function(event) {
              if (document.getElementById("ds_status_3").checked) {
                  document.getElementById("ds_statusDetailGroup").style.display = "block";
              } else {
                  document.getElementById("ds_statusDetailGroup").style.display = "none";
              }
          }, false);
      }

      function checkInput(inputName, spanId, errorMsg, divId) {
          var errorSpan = document.getElementById(spanId);
          errorSpan.innerHTML = "";
          errorSpan.removeAttribute("style");

          var errorDiv = document.getElementById(divId);
          errorDiv.className = "";

          var input = document.getElementsByName(inputName)[0];
          if (!input.validity.valid) {
              errorSpan.innerHTML = errorMsg;

              errorDiv.classList.add("nhsuk-form-group");
              errorDiv.classList.add("nhsuk-form-group--error");
              return false;
          } else {
              return true;
          }
      }
  }
})
