/* 
 PROJECT 4 - WEBSITE DEVELOPMENT AND DEPLOYMENT
 AUTHOR - SAVITI SAVITI
 DATE - APRIL 23, 2025
 DESCRIPTION - WRITING JAVASCIPT TO MAKE THE WEBSITE INTERACTIVE
*/

/*
 * Handles the submit event of the form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();
		return false;
	}
    
	alert("Your form has been submitted!");
	window.location.href = "index.html";
	e.preventDefault();

	return true;
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

function formHasErrors() {
	let errorFlag = false;

	let requiredFields = ["fullName","email","number"];
	for(let i = 0; i < requiredFields.length; i++){
		let textField = document.getElementById(requiredFields[i]);
		if(!formFieldHasInput(textField)){
			document.getElementById(requiredFields[i] + "_error").style.display = "block";

			if(!errorFlag){
				textField.focus();
				textField.select();
			}

			errorFlag = true;
		}
	}

	// Email Regualar Expression
	let regex2 = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
	let email = document.getElementById("email").value;

	if(email != ""){
	if(!regex2.test(email)){
		document.getElementById("emailformat_error").style.display = "block";

			document.getElementById("email").focus();
			document.getElementById("email").select();

		// Raise the error flag
		errorFlag = true;
		}
	}

	// Ensures valid number has been entered.
	let phoneNumber = document.getElementById("number").value.trim();
		// Ensures that 10 digit number has been entered
	if(phoneNumber != ""){
		if(phoneNumber.length != 10){
			document.getElementById("numberLength_error").style.display = "block";

			document.getElementById("number").focus();
			document.getElementById("number").select();
			
			errorFlag = true;
		}
	}

	return errorFlag;
}

function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear details?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("fullName").focus();

		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement) {
	// Check if the text field has a value
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

function load() {
	// Calling a function called hideErrors() that will hide all the error messages.
	hideErrors();

	// Add event listener for the form submit and reset events
	document.getElementById("contact").addEventListener("submit", validate);
	document.getElementById("contact").addEventListener("reset", resetForm);
}

document.addEventListener("DOMContentLoaded", load);
