const BASE = "server.com";

const searchInput = document.getElementsByClassName("search__bar__input")[0];

const createSuggestion = ({ suggestion, auxiliaryData }) => {
  const auxiliaryString = auxiliaryData ? ` - ${auxiliaryData}` : "";
  return `<li class="search__suggestion__list__result">${suggestion}${auxiliaryString}</li>`;
};
const onSuggestionsResponse = data => {
  const suggestions = document.getElementsByClassName(
    "search__suggestions__list"
  )[0];
  let suggestionHTML = "";
  for (const suggestion of data) {
    suggestionHTML += createSuggestion({
      suggestion: suggestion.suggestion,
      auxiliaryData: suggestion.auxiliary
    });
  }
  suggestions.innerHTML = suggestionHTML;
};
const onNewInput = e => {
  api.get(`${BASE}/autocomplete`, searchInput.value, onSuggestionsResponse);
};
searchInput.addEventListener("input", onNewInput);

// Mock the server
const getRandomString = ({ length }) => {
  const charSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
  const chars = [];
  while (chars.length < length) {
    const randomIdx = Math.floor(Math.random() * charSet.length);
    chars.push(charSet[randomIdx]);
  }
  return chars.join("");
};
const getRandomInteger = ({ min, max }) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const getSuggestion = prefix => {
  const EXACT_MATCH_RATIO = 0.3;
  const AUTOCORRECT_RATIO = 0.1;

  if (Math.random() < AUTOCORRECT_RATIO)
    return getRandomString({
      length: getRandomInteger({ min: 1, max: prefix.length })
    });

  if (Math.random() < EXACT_MATCH_RATIO) return prefix;

  return (
    prefix + getRandomString({ length: getRandomInteger({ min: 1, max: 10 }) })
  );
};
const getSuggestionsList = data => {
  const MAX_CHARS = 10;
  const NUM_AUTOCOMPLETE_RESULTS = 10;
  const AUXILIART_DATA_RATIO = 0.1;

  if (data.length > MAX_CHARS) return [];

  const results = [];
  while (results.length < NUM_AUTOCOMPLETE_RESULTS) {
    const suggestion = getSuggestion(data);
    if (results.find(result => result.suggestion === suggestion)) continue;

    if (Math.random() < AUXILIART_DATA_RATIO) {
      for (let i = 0; i < 2; i++) {
        results.push({
          suggestion,
          auxiliary: getRandomString({
            length: getRandomInteger({ min: 5, max: 15 })
          })
        });
      }
    } else results.push({ suggestion, auxiliary: "" });
  }
  return results;
};
const endpoints = {
  "/": {
    get: () => "Hello, World!"
  },
  "/autocomplete": {
    get: getSuggestionsList
  }
};

// Mock The API
const handleGet = (url, data, callback) => {
  const endpoint = url.substring(url.indexOf("/"), url.length);
  callback(endpoints[endpoint]["get"](data));
};
const api = {
  get: handleGet
};
