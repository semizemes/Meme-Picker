import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");

emotionRadios.addEventListener("change", highlightCheckedOption);
getImageBtn.addEventListener("click", renderCat);

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");
  for (const radio of radios) {
    radio.classList.remove("highlight");
  }

  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

// making emotions array and sorted duplicate elements
function getEmotionsArray(cats) {
  const emotionsArray = [];

  for (const cat of cats) {
    for (const emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }

  return emotionsArray;
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();

  const randomCatId = Math.floor(Math.random() * catsArray.length);
  return catsArray[randomCatId];
}

function renderCat() {
  const catObject = getSingleCatObject();

  memeModalInner.innerHTML = `
    <img 
      class='cat-img'
      src='./images/${catObject.image}'
      alt='${catObject.alt}'
    >`

  memeModal.style.display = 'flex';
}

//get matching cats array from selected options
function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const isGif = gifsOnlyOption.checked;
    const selectedEmotion = document.querySelector(
      "input[type='radio']:checked"
    ).value;

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

// get emotions array and render in page
function renderEmotionsRadios(cats) {
  const emotions = getEmotionsArray(cats);

  let radioItems = "";

  for (const emotion of emotions) {
    radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input 
                    type="radio"
                    name='emotions'
                    id="${emotion}"
                    value="${emotion}"
                >
            </div>
            `;
  }

  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
