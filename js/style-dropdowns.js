  var elementNum = 1;

  /*
  All styles are put in an object for a better oraginzation and easy
  access to their properties. The object below contains styles for both
  select input itself and it's options
  */
  var inputStyle = {
    padding: "10px 36px 13px 14px",
    webkitAppearance: "none",
    borderRadius: "0px",
    border: "1px solid #e4e9ee",
    fontFamily: "Arial",
    fontSize: "16px",
    fontKerning: "21px",
    fontWeight: "normal",
    backgroundColor: "#ffffff",
    backgroundImage: "url(img/select-arrow-down.png)",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "85%",
    backgroundPositionY: "16px",
    verticalAlign: "text-top"
  },
  eventHandlers = {
    toggleClick: function(event) {
      var eventTarget = event.toElement,
          listIsActive = hasClass.call(this.nextSibling, "valid-thru--active");
      // First the function below removes expand-list classes from both elements
      if (event.target.closest("." + eventTarget.className) && listIsActive) {
        hideList();
        return;
      }
      hideList();
      eventTarget.nextSibling.classList.add("valid-thru--active");
      // Adding an expand-list class to the element, that was clicked
    },
    listItemClick: function(event) {
      var textValue = this.value.toString();
      if (textValue.length < 2) {
        textValue = "0" + textValue;
      }
      this.parentNode.parentNode.firstElementChild.value = textValue;
      this.parentNode.parentNode.children[1].removeAttribute("style");
      this.parentNode.parentNode.children[1].innerHTML = textValue;
    }
  };
// This function is used to identify whenther the dropdown is opened or not
// by searching for a "valid-thru--active" class
  function hasClass(className) {
    if (Array.prototype.indexOf.call(this.classList, className) != -1) {
      return true;
    } else {
      return false;
    }
  }

// This function is used to hide an inactive dropdown list
  function hideList() {
    // Getting an array of input wrappers (there must be 2 of them)
    var inputWrappers = document.getElementsByClassName("valid-thru-input-wrapper");
    // Modifying last child of every element in the array of input wrappers
    // Array.prototype was used in order to use the forEach method
    // inputWrappers is an array-like object, so we need to pretend,
    // that it's an array
    Array.prototype.forEach.call(inputWrappers, function(item) {
      item.lastChild.classList.remove("valid-thru--active");
    });
  }

  /*
  First let's get viewport width for i want the styles to be applied
  only to devices with a big viewport width (ex: desktop) and use default
  dropdown styles for mobile devices (iOS handles this problem well – more
  convenient to use default dropdown)
  */
  function getViewportSize() {
    // This feature works on all browsers (except for IE8 and below)
    if (window.innerWidth != null) return window.innerWidth;
  }

// This function applies inline styles to element
// (is used to style <select> elements on mobile devices)
  function applyStyle(element,styleProperty,value) {
    element.style[styleProperty] = value;
  }

// This function performs input data check on mobile devices
  function styleSelectWrapper() {
    var baseId = "valid-thru",
        namePostfixes = ["month", "year"];

    for (var i = 0; i < namePostfixes.length; i++) {
      var element = document.getElementById(baseId + "-" + namePostfixes[i]),
          placeHolderOption = document.getElementsByClassName('placeholder')[0];
      for (var key in obj = inputStyle) {
        applyStyle(element, key, obj[key]);
      }
      if (getViewportSize() >= 768) {
        styleOptions(element);
      }
    }
  }


// This function creates a toggle button to call a dropdown list
    function createToggle(parentElement, selectElement) {
      // First create a toggle element
      var toggle = document.createElement("div"),
          parentElem = parentElement;
      // Hide default select element by assigning "hiding" styles to him
      selectElement.setAttribute("class", "select-hidden");
      // Give the toggle element some content
      // (dummy text - got from the original <select> element)
      toggle.innerHTML = selectElement.options[0].text;
      // Add styles to the div by assining class, that has styles
      // made for this element
      toggle.setAttribute("class", "select-toggle");
      parentElem.appendChild(toggle);
      toggle.addEventListener("click", eventHandlers.toggleClick);
      toggle.setAttribute("style", "color: #bec6cf");
      toggle.setAttribute("tabindex", "1" + elementNum);
      // Return current element to be passed to next function (????)
    }

// This function creates a list that is called by a toggle button
    function createList(originalSelect, selectWrapper) {
      /* Arguments' meaning:
      originalSelect - default <select> element
      selectWrapper - <div> that wrappes the default <select> element
      */
      // First creating a <ul> element
      var dropdownWrapper = document.createElement("ul"),
          selectTypes = ["month", "year"];
      // Assign styles to the <ul> element
      dropdownWrapper.setAttribute("class", "select-" + selectTypes[elementNum - 1] + "-wrapper");
      // Putting the <ul> element into the input wrapper
      // Input wrapper contains: original <select>, toggle, new dropdown
      selectWrapper.appendChild(dropdownWrapper);
      // Add <li>-s to the <ul>. The <li> quantity depends on the
      // number of options inside the original <select> element
      for (var i = 1; i < originalSelect.options.length; i++) {
        var text = originalSelect.options[i].text,
            listItem = document.createElement("li");
        // Adding text and styles to the <li> element and putting inside the <ul>
        listItem.innerHTML = text;
        listItem.setAttribute("value", text);
        listItem.classList.add("select-" + selectTypes[elementNum - 1] + "-wrapper__list-item");
        listItem.addEventListener("click", eventHandlers.listItemClick);
        dropdownWrapper.appendChild(listItem);
      }
    }

    (function styleDropdown() {
      // Contains an array of elements that will be used to apply
      // styles to their children
      var elementsToStyle = document.getElementsByClassName('valid-thru-input-block')[0].children;

      if (getViewportSize() <= 480) {
        // If the used device is mobile, then inline styles are applied
        // to <select> element and default <options> stay untouched for
        // user's convenience
        styleSelectWrapper();
      } else {
        for (var i = 0; i < elementsToStyle.length; i++) {
          var parentElem = document.getElementById(elementsToStyle[i].id),
              currentElem = document.getElementById(elementsToStyle[i].children[0].id);
          createToggle(parentElem,currentElem);
          createList(currentElem, parentElem);
          elementNum++;
        }
      }
    })();

    document.addEventListener("click", function(event) {
      var element = document.querySelector(".valid-thru--active");
      // This "if" statement was added to avoid recursive error outputs in console
      // This function outputs error when non of the dropdowns is triggered
      if (!element) {
        return;
      }
      else if (element.previousSibling == event.target) {
        return;
      }
      // Hiding dropdowns if user clicked anywhere outside of dropdowns
      hideList();
    });
