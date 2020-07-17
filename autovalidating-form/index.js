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
  birthDay: validateDay,
  birthYear: validateYear,
  phoneNumber: validatePhoneNumber,
  email: validateEmail
};
const validate = e => {
  const inputElement = e.target;
  const field = inputElement.dataset.field;
  if (field === "password") {
    return;
  }
  const errorMessageElement = e.target.parentElement.getElementsByClassName(
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

const inputs = document.getElementsByClassName("signup__field__input");
for (const input of inputs) input.addEventListener("blur", validate);
