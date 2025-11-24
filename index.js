import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");

emotionRadios.addEventListener('change', highlightCheckedOption)

function highlightCheckedOption(e) {
  console.log(e);
  document.getElementById(e.target.id).classList.add("highlight");
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
