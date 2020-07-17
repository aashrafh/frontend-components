class ValidationError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

const validateName = name => {
  const regexName = /^[a-zA-Z]+$/;
  if (!regexName.test(name))
    throw new ValidationError("Please enter a valid name");
};
const validateUsername = username => {
  const regexUsername = /^[a-zA-Z0-9._]+$/;
  if (!regexUsername.test(username))
    throw new ValidationError("Please enter a valid username");
};
const validatePassword = password => {
  if (!password) throw new ValidationError("Password cannot be empty");
  if (password.length < 6)
    throw new ValidationError("Password length is too short");
};
const validateConfirmPassword = password => {
  const currentPassword = document.getElementsByClassName(
    "signup__field__input--password"
  )[0].value;
  if (password && password !== currentPassword)
    throw new ValidationError("Password did not match");
};
const validateDay = day => {
  const regexDay = /^[0-9]{1, 2}$/;
  if (!regexDay.test(day))
    throw new ValidationError("Please enter a valid day");
};
const validateYear = year => {
  const regexYear = /^[0-9]{4}$/;
  if (!regexYear.test(year))
    throw new ValidationError("Please enter a valid year");
};
const validatePhoneNumber = phoneNumber => {
  const FORMATTING_CHARS = ["(", ")", "-"];
  const validatePhoneNumberFormatted = () => {
    const regex = /^[0-9(]{1}[0-9)-]+[0-9]$/;
    const hasOpening = phoneNumber.includes("(");
    const hasClosing = phoneNumber.includes(")");
    if (hasOpening && !hasClosing)
      throw new ValidationError("Phone number missing closing parantheses");
    if (!regex.test(phoneNumber))
      throw new ValidationError("Please enter valid phone number");
  };
  const validatePhoneNumberNonFormatted = () => {
    const regex = /^[0-9]+$/;
    if (!regex.test(phoneNumber))
      throw new ValidationError("Please enter valid phone number");
  };

  for (const formattingChar of FORMATTING_CHARS) {
    if (phoneNumber.includes(formattingChar))
      return validatePhoneNumberFormatted();
  }
  return validatePhoneNumberNonFormatted();
};
const validateEmail = email => {
  const regexEmail = /^[a-zA-Z0-9]{1}[a-z-A-Z0-9@._-]+[a-zA-Z]$/;
  if (!regexEmail.test(email))
    throw new ValidationError("Please enter a valid email");

  const mustHaveChars = ["@", "."];
  for (const char of mustHaveChars)
    if (!email.includes(char))
      throw new ValidationError("Please enter a valid email");
};

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
const validate = inputElement => {
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
    validationMap[field](inputElement.value);
    errorMessageElement.innerHTML = "";
    inputElement.classList.remove("signup__field__input--error");
  } catch (err) {
    if (!(err instanceof ValidationError)) throw err;
    errorMessageElement.innerHTML = err.message;
    inputElement.classList.add("signup__field__input--error");
  }
};

const inputs = document.getElementsByClassName("signup__field__inputs__input");

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

const isRestrictedKey = ({ e, maxNum }) => {
  const specialKeys = ["Enter", "Backspace"];
  if (specialKeys.includes(e.key)) return false;

  const proposedInput = e.target.value + e.key;
  if (proposedInput.length > maxNum) return true;

  const regexNumber = /^[0-9]+$/;
  if (!regexNumber.test(proposedInput)) return true;

  return false;
};
const isRestrictedYear = e => isRestrictedKey({ e, maxNum: 4 });
const isRestrictedDay = e => isRestrictedKey({ e, maxNum: 2 });
const restrictionMap = {
  birthYear: isRestrictedYear,
  birthDay: isRestrictedDay
};
const restric = e => {
  const field = e.target.dataset.field;
  const restriction = restrictionMap[field];
  if (!restriction) return;
  const isRestricted = restriction(e);
  if (isRestricted) e.preventDefault();
};

for (const input of inputs) {
  input.addEventListener("blur", e => {
    validate(e.target);
    hideGuide(e.target);
  });
  input.addEventListener("focus", e => showGuide(e.target));
  input.addEventListener("keyup", e => updateGuide(e.target));
  input.addEventListener("keydown", e => restric(e));
}
