window.addEventListener("load", function() {

  var form = document.getElementById("nl_signup");

  if (form) {
      //take over validation
      form.setAttribute("novalidate", "novalidate");

      form.addEventListener("submit", function(event) {

          //array element consists of: id of input, id of error span, error message, id of div to highlight
          var checks = [
              ["nl_firstname", "nl_firstnameError", "Please enter your first name", "nl_firstnameGroup"],
              ["nl_email", "nl_emailError", "Please enter a valid email address", "nl_emailGroup"],
              ["nl_agree_1", "nl_tcError", "Please confirm you agree to our terms of service", "nl_confirmGroup"],
              ["nl_agree_2", "nl_tcError_2", "Please confirm you agree to our terms of service", "nl_confirmGroup_2"],
              ["nl_agree_3", "nl_tcError_3", "Please confirm you agree to our terms of service", "nl_confirmGroup_3"],
          ];

          var numErrs = 0;

          for (var i = 0; i < checks.length; i++) {
              if (!checkInput(checks[i][0], checks[i][1], checks[i][2], checks[i][3])) {
                  numErrs++;
              }
          }

          if (numErrs !== 0) {
              // Prevent form being sent
              event.preventDefault();
          }

      }, false);

      function checkInput(inputId, spanId, errorMsg, divId) {
          var errorSpan = document.getElementById(spanId);
          errorSpan.innerHTML = "";
          errorSpan.removeAttribute("style");

          var errorDiv = document.getElementById(divId);
          errorDiv.className = "";

          var input = document.getElementById(inputId);
          if (!input.validity.valid) {
              errorSpan.innerHTML = errorMsg;
              errorSpan.setAttribute("style", "display: list-item; list-style-position: inside; margin-bottom: 16px;");

              errorDiv.className = "form__panel--error";
              return false;
          } else {
              return true;
          }
      }
  }
})
