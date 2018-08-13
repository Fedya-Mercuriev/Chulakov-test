  function validateForm() {
    var errors = 0;

    /*
    This function is responsible for validating card number,
    if the data written by the user doesn't meet the requirements,
    then the function returns the elements' class name that
    will be used to add red border later
    */

    // This function adds red border to fields that had errors in their input data
    function addErrorBorder(element) {
      element.style.borderColor = "#ff0000";
    }

    function checkCardExpiration() {
      // Getting current date
      var currentDate = new Date(),
          monthInput = document.getElementById('valid-thru-month'),
          yearInput = document.getElementById('valid-thru-year');
      // If user typed current year in a year input, then we check if
      // the month number, that user typed in a month input is less than current
      // month, then we return, taht the card has expired
      if (yearInput.value == currentDate.getFullYear().toString()) {
        if (monthInput.value <= currentDate.getMonth().toString()) return true;
      }
      return false;
    }

    (function checkCardNumber() {
      var baseId = "card-number",
          namePostfixes = ["first", "second", "third", "fourth"],
          n = 0;
      for (var i = 0; i < namePostfixes.length; i++) {
        var cardNumberInput = document.getElementById(baseId + "-" + namePostfixes[i]);
        if (cardNumberInput.value.length == 4) {
          if (cardNumberInput.style.border) {
            cardNumberInput.removeAttribute("style");
          }
          continue;
        } else {
          while (n < namePostfixes.length) {
            cardNumberInput = document.getElementById(baseId + "-" + namePostfixes[n]);
            addErrorBorder(cardNumberInput);
            n++;
          }
          errors++;
          return;
        }
      }
    })();

    // This function checks if the date was picked by user
    // in "valid-thru" block
    (function checkValidThru() {
      var baseId = "valid-thru",
          namePostfixes = ["month", "year"],
          n = 0;
      // There are only 2 types of select-inputs: month-picker and year-picker
      // thus the loop below goes throw an array of 2 positions and modifies
      // elements taht contain these words in their id
    validThruLoop:  for (var i = 0; i < namePostfixes.length; i++) {
        var validThruInput = document.getElementById(baseId + "-" + namePostfixes[i] + "-wrapper").children[0];
        // The placeholder value is 00, that has a "value" attribute of "hide"
        // so if current value is not "hide" the program removes potential error
        // border from an element
        if (validThruInput.value != "hide" || !validThruInput.value) {
          if (validThruInput.nextElementSibling.style.border) {
            validThruInput.nextElementSibling.removeAttribute("style");
          }
          // This function checks if card hasn't expired by comparing current
          // date with the date written by user
          if (checkCardExpiration()) {
            for (var j = 0; j < namePostfixes.length; j++) {
              var inputWrapper = document.getElementById("valid-thru-" + namePostfixes[j] + "-wrapper").children[0];
              addErrorBorder(inputWrapper.nextElementSibling);
            }
            errors++;
            break validThruLoop;
          }
        } else {
          while (n < namePostfixes.length) {
            validThruInput = document.getElementById(baseId + "-" + namePostfixes[n] + "-wrapper").children[0];
            addErrorBorder(validThruInput.nextElementSibling);
            n++;
          }
          errors++;
          return;
        }
      }
    })();

    // Checking card holder name
    (function checkCardHolderName() {
      var cardHolderName = document.getElementById('cardholder-name-input');
      // This regular expression contains flags, that are the range for characters A-z
      if (cardHolderName.value.match(/[A-z\u00C0-\u00ff]+/g) && cardHolderName.value.length >= 4) {
        if (cardHolderName.style.border) {
          cardHolderName.removeAttribute("style");
        }
        return;
      } else {
        addErrorBorder(cardHolderName);
        errors++;
      }
    })();

    //Checking CVC (value length must be 3 numbers)
    (function checkCVC() {
      var cvcInput = document.getElementById('cvc-input');
      if (cvcInput.value.length == 3) {
        if (cvcInput.style.border) {
          cvcInput.removeAttribute("style");
        }
        return;
      } else {
        addErrorBorder(cvcInput);
        errors++;
      }
    })();

    /*
    Even if one mistake was made submission will fail,
    for every function when catches a mistake adds 1 to error
    counter
    */
    if (errors == 0) {
      // Allow form submission
      return true;
    } else {
      // Block form from submitting data
      event.returnValue = false;
    }
  }

  var submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', validateForm);
