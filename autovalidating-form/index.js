// Custom Error class for validation errors
class ValidationError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

//Validation Utilities
//validate the first and last name using regex expression
const validateName = name => {
  const regexName = /^[a-zA-Z]+$/; //Only alphabet lettersare allowed
  if (!regexName.test(name))
    throw new ValidationError("Please enter a valid name");
};

//validate the username using regex expression
const validateUsername = username => {
  const regexUsername = /^[a-zA-Z0-9._]+$/; //Only alphabet letters, 0-9 digits, dot character, and underscore are allowed
  if (!regexUsername.test(username))
    throw new ValidationError("Please enter a valid username");
};

//validate that the password exists and its length
const validatePassword = password => {
  if (!password) throw new ValidationError("Password cannot be empty"); //Password can not be empty
  if (password.length < 6)  //Password length can not be less than 6 characters
    throw new ValidationError("Password length is too short");
};

//validate that the confirrmation password exists and check that is equal to original password
const validateConfirmPassword = password => {
  const currentPassword = document.getElementsByClassName(
    "signup__field__input--password"
  )[0].value;
  if (password && password !== currentPassword)
    throw new ValidationError("Password did not match");
};

//validate the day date using regex expression
const validateDay = day => {
  const regexDay = /^[0-9]{1, 2}$/; //One or two digits, each digit has a value between 0 and 9 inclusive
  if (!regexDay.test(day))
    throw new ValidationError("Please enter a valid day");
};

//validate the year date using regex expression
const validateYear = year => {
  const regexYear = /^[0-9]{4}$/; //Must be 4 digits, each digit has a value between 0 and 9 inclusive
  if (!regexYear.test(year))
    throw new ValidationError("Please enter a valid year");
};

// validate the phone number
const validatePhoneNumber = phoneNumber => {
  const FORMATTING_CHARS = ["(", ")", "-"];
  
  //There are two options for phone number: 
  //1- Formatted phone number
  //2- Non-formatted phone number
  
  //validate the formatted phone number
  const validatePhoneNumberFormatted = () => {
    //Numbers with hyphens and parentheses, 
    //where parentheses can only surround initial set of numbers 
    //and hyphens must be between numbers
    const regex = /^[0-9(]{1}[0-9)-]+[0-9]$/;  
    const hasOpening = phoneNumber.includes("(");
    const hasClosing = phoneNumber.includes(")");
    if (hasOpening && !hasClosing)
      throw new ValidationError("Phone number missing closing parantheses");
    if (!regex.test(phoneNumber))
      throw new ValidationError("Please enter valid phone number");
  };
  
  //validate the non-formatted phone number
  const validatePhoneNumberNonFormatted = () => {
    const regex = /^[0-9]+$/; //each digit has a value between 0 and 9 inclusive
    if (!regex.test(phoneNumber))
      throw new ValidationError("Please enter valid phone number");
  };
  
  //choose the proper validation method
  for (const formattingChar of FORMATTING_CHARS) {
    if (phoneNumber.includes(formattingChar))
      return validatePhoneNumberFormatted();
  }
  
  return validatePhoneNumberNonFormatted();
};

//validate the email using regex expression
const validateEmail = email => {
  const regexEmail = /^[a-zA-Z0-9]{1}[a-z-A-Z0-9@._-]+[a-zA-Z]$/;
  if (!regexEmail.test(email))
    throw new ValidationError("Please enter a valid email");

  const mustHaveChars = ["@", "."];
  for (const char of mustHaveChars)
    if (!email.includes(char))
      throw new ValidationError("Please enter a valid email");
};

//An object contains the validations schema in which each key maps its validation utility
const validationMap = {
  name: validateName,
  username: validateUsername,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  birthDay: validateDay,
  birthYear: validateYear,
  phoneNumber: validatePhoneNumber,
  email: validateEmail
};

//Main validation method
const validate = inputElement => {
  //get the targeted field
  const field = inputElement.dataset.field;
  
  if (field === "password") {
    const confirmPassword = document.getElementsByClassName(
      "signup__field__input--confirm-password"
    )[0];
    validate(confirmPassword);
  }
  const errorMessageElement = inputElement.parentElement.parentElement.getElementsByClassName(
    "signup__field__error"
  )[0];

  try {
    //try to validate the data and remove the error class if correct
    validationMap[field](inputElement.value);
    errorMessageElement.innerHTML = "";
    inputElement.classList.remove("signup__field__input--error");
  } catch (err) {
    if (!(err instanceof ValidationError)) throw err;
    errorMessageElement.innerHTML = err.message;
    inputElement.classList.add("signup__field__input--error");
  }
};

//A reference to all input fields
const inputs = document.getElementsByClassName("signup__field__inputs__input");

//A guide for the user to be aware of the strength of his/her password
class PasswordGuide {
  constructor({ className, getMessage }) {
    this.htmlNode = document.getElementsByClassName(className)[0];
    this.getMessage = getMessage;
  }
  hide() {
    this.htmlNode.style.display = "none";
  }
  show() {
    this.htmlNode.style.display = "block";
  }
  update(val) {
    this.htmlNode.innerHTML = this.getMessage(val);
  }
}

const PASSWORD_CATEGORIES = {
  GOOD: "password_good",
  FAIR: "password_fair",
  WEAK: "password_weak"
};

const mapPasswordToCategory = password => {
  const hasLetters = /[a-zA-Z]+/;
  const hasNumbers = /[0-9]+/;
  const hasOnlyLettersAndNumbers = /^[a-zA-Z0-9]{6,}$/;

  const isGoodPassword = () => {
    return (
      hasLetters.test(password) &&
      hasNumbers.test(password) &&
      hasOnlyLettersAndNumbers.test(password)
    );
  };
  const isFairPassword = () => hasOnlyLettersAndNumbers.test(password);

  if (isGoodPassword()) return PASSWORD_CATEGORIES.GOOD;
  if (isFairPassword()) return PASSWORD_CATEGORIES.FAIR;
  return PASSWORD_CATEGORIES.WEAK;
};

//A mapper for the password category to guide
const passwordGuide = new PasswordGuide({
  className: "signup__field__guide--password",
  getMessage: val => {
    switch (mapPasswordToCategory(val)) {
      case PASSWORD_CATEGORIES.GOOD:
        return "This password is awesome!";
      case PASSWORD_CATEGORIES.FAIR:
        return "A good password uses a mix of number and letters.";
      case PASSWORD_CATEGORIES.WEAK:
        return "Try a longer password";
    }
    return "";
  }
});

const guideMap = {
  password: passwordGuide
};

const showGuide = inputElement => {
  const field = inputElement.dataset.field;
  const guide = guideMap[field];
  if (!guide) return;
  guide.show();
};
const hideGuide = inputElement => {
  const field = inputElement.dataset.field;
  const guide = guideMap[field];
  if (!guide) return;
  guide.hide();
};
const updateGuide = inputElement => {
  const field = inputElement.dataset.field;
  const guide = guideMap[field];
  if (!guide) return;
  guide.update(inputElement.value);
};

//A utility to limit the number of characters allowed
//and the allowed input digits
const isRestrictedKey = ({ e, maxNum }) => {
  const specialKeys = ["Enter", "Backspace"];
  if (specialKeys.includes(e.key)) return false;

  const proposedInput = e.target.value + e.key;
  if (proposedInput.length > maxNum) return true;

  const regexNumber = /^[0-9]+$/;
  if (!regexNumber.test(proposedInput)) return true;

  return false;
};
//check that the year has only 4 digits
const isRestrictedYear = e => isRestrictedKey({ e, maxNum: 4 });
//check that the day has only 2 digits
const isRestrictedDay = e => isRestrictedKey({ e, maxNum: 2 });
const restrictionMap = {
  birthYear: isRestrictedYear,
  birthDay: isRestrictedDay
};

//Restriction controller
const restric = e => {
  const field = e.target.dataset.field;
  const restriction = restrictionMap[field];
  if (!restriction) return;
  const isRestricted = restriction(e);
  if (isRestricted) e.preventDefault();
};

//Controller of the whole validation
for (const input of inputs) {
  //Validate on the blur event and hide the password guide
  input.addEventListener("blur", e => {
    validate(e.target);
    hideGuide(e.target);
  });
  //On focus event guide the user
  input.addEventListener("focus", e => showGuide(e.target));
  //While the keyup event keep updating the user guide
  input.addEventListener("keyup", e => updateGuide(e.target));
  //On keydown even check if there is any restricted character, or digit
  input.addEventListener("keydown", e => restric(e));
}
