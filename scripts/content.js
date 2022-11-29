// options = perspectiveTaking, greaterGood
let method = "perspectiveTaking";

// options = bot, user
let mode = "user";

const svg =
  '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="InfoOutlinedIcon"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>';
const config = [
  {
    page: "what_sin_had_i_committed_in_my_past_life_that_i",
    id: "t1_ix28kvg",
    explanation:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    replies: ["hi this is a reply", "do better"],
  },
  {
    page: "r/cmu/comments/yxk0p7/what_do_you_think_of_the_future_of_the_tech/",
    id: "t1_iwq89qz",
    explanation: "this is a mean post",
    replies: ["another sample reply", "this was really rude. stop."],
  },
  {
    page: "r/AskMen/comments/yza1z7/how_does_it_make_you_feel_when_you_know_that/",
    id: "t1_iwz0htv",
    explanation: "this is a mean post",
    replies: ["another sample reply", "this was really rude. stop."],
  },
  {
    page: "r/AskMen/comments/yza1z7/how_does_it_make_you_feel_when_you_know_that/",
    id: "t1_iwz4md4",
    explanation: "this is really sexist.",
    replies: ["another sample reply", "this was really rude. stop."],
  },
];
const injectBlock = ({ id, explanation, replies }) => {
  const ele = document.getElementById(id);
  console.log(ele);
  const newEle = document.createElement("div");
  const replyBlocks = replies.map((reply) => {
    return `
      <div class="explanation-reply">
        <p>${reply}</p>
      </div>`;
  });
  newEle.className = "explanation-block";
  newEle.innerHTML = `
    <div class="svg-wrapper">
      ${svg}
    </div>
    <br />
    <div class="explanation-column">
      <p>${explanation}</p>
      <br />
      <p class="reply-prompt">
        You can make the internet a better place by educating the user about why their reply is harmful. Choose from one of the prompts to post a reply from ${
          mode === "bot" ? "a bot" : "your account"
        }:</p>
      ${replyBlocks.join("")}
    </div>`;
  if (ele) ele.appendChild(newEle);
};

function injectCSS() {
  const link = document.createElement("link");
  link.href = chrome.runtime.getURL("style.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

const injectComments = () => {
  console.log("inject");
  config
    .filter(({ page }) => {
      console.log(window.location.href);
      return window.location.href.includes(page);
    })
    .forEach(injectBlock);
};

window.onload = () => {
  injectCSS();
  injectComments();
  // document.querySelector(".DraftEditor-root").onclick = injectComments;
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
