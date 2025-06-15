const form = document.querySelector('form');
const result = document.getElementById('result');

const getFetchAPI = async (word) => {
  try {
    result.innerHTML = 'Fetching Data...';
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();

    const definition = data[0].meanings[0].definitions[0];
    result.style.display = 'block';

    result.innerHTML = `
    <h2><strong>Word: </strong>${data[0].word}</h2>
    <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
    <p class="meaning"><strong>Meaning: </strong>${
      definition.definition === undefined ? 'Not Found' : definition.definition
    }</p>
    <p class="example"><strong>Example: </strong>${
      definition.example === undefined ? 'Not Found' : definition.example
    }</p>
    <p><strong>Antonyms: </strong></p>
    `;

    if (definition.antonyms.length === 0) {
      result.innerHTML += `<span>Not Found</span>`;
    } else {
      for (let i = 0; i < definition.antonyms.length; i++) {
        result.innerHTML += `<li>${definition.antonyms[i]}</li>`;
      }
    }

    if (definition.synonyms.length === 0) {
      result.innerHTML += `
    <p><strong>Synonyms: </strong></p>
    <span>Not Found</span>
    `;
    } else {
      for (let i = 0; i < definition.synonyms.length; i++) {
        result.innerHTML += `
      <p><strong>Synonyms: </strong></p>
      <li>${definition.synonyms[i]}</li>
      `;
      }
    }

    result.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
  } catch (error) {
    result.innerHTML = `<p><strong>Sorry,</strong> the word could not found!</p>`;
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputValue = event.target.text.value.trim();
  getFetchAPI(inputValue);
});
