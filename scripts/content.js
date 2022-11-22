const svg =
  '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="InfoOutlinedIcon"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>';
const config = [
  {
    page: "r/cmu/comments/yxk0p7/what_do_you_think_of_the_future_of_the_tech/",
    id: "t1_iwp3oty",
    explanation:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    replies: [],
  },
  {
    page: "r/cmu/comments/yxk0p7/what_do_you_think_of_the_future_of_the_tech/",
    id: "t1_iwq89qz",
    explanation: "hiiiiii",
    replies: [],
  },
];
const injectBlock = ({ id, explanation }) => {
  const ele = document.getElementById(id);
  const newEle = document.createElement("div");
  newEle.className = "explanation-block";
  newEle.innerHTML = `<div class="svg-wrapper">${svg}</div><p>${explanation}</p>`;
  if (ele) ele.appendChild(newEle);
  console.log(id, ele, newEle);
};

function injectCSS() {
  const link = document.createElement("link");
  link.href = chrome.runtime.getURL("style.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

window.onload = () => {
  injectCSS();
  config
    .filter(({ page }) => {
      console.log(window.location.href);
      return window.location.href.includes(page);
    })
    .forEach(injectBlock);
};

// // `document.querySelector` may return null if the selector doesn't match anything.
// if (article) {
//   const text = article.textContent;
//   const wordMatchRegExp = /[^\s]+/g; // Regular expression
//   const words = text.matchAll(wordMatchRegExp);
//   // matchAll returns an iterator, convert to array to get word count
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 200);
//   const badge = document.createElement("p");
//   // Use the same styling as the publish information in an article's header
//   badge.classList.add("color-secondary-text", "type--caption");
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector("h1");
//   // Support for article docs with date
//   const date = article.querySelector("time")?.parentNode;

//   (date ?? heading).insertAdjacentElement("afterend", badge);
// }
