// options = perspectiveTaking, greaterGood
let method = "perspectiveTaking";

// options = bot, user
let mode = "user";

const delayInMilliseconds = 200 + Math.random() * 100; //delay to allow for the comment to be posted

const config = [];

const svg =
  '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="InfoOutlinedIcon"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>';

// Gets second div inside commentDiv
const getSecondDiv = (id) => {
  const commentDiv = document.querySelector(`#${id} > .Comment`);
  // Get second div inside commentDiv
  return commentDiv.children[2];
};

// initializes data from data.js
const initialize = () => {
  data.forEach((comment) => {
    const object = {};
    const bot_replies = [];
    const user_replies = [];
    for (const key in comment) {
      if(key.includes("bot_reply_")){
        bot_replies.push(comment[key])
      }
      else if(key.includes("reply_")){
        user_replies.push(comment[key])
      }
      else{
        object[key] = comment[key];
      }
    }
    object.replies = mode === "bot" ? bot_replies : user_replies;
    config.push(object);
  });
}

// Injects CSS into the page
const injectCSS = () => {
  const link = document.createElement("link");
  link.href = chrome.runtime.getURL("style.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

// Injects a block of comments into the page for each comment in the config
const injectBlock = ({ id, explanation, replies, replacement_text }) => {

  // Get second div inside commentDiv
  const ele = getSecondDiv(id);
  const text = ele.querySelector(".RichTextJSON-root").querySelector("p");

  console.log("text", text);
  text.innerHTML = replacement_text ?? text.innerHTML;

  const newEle = document.createElement("div");
  const replyBlocks = replies.map((reply) => {
    const replyEle = document.createElement("div");
    replyEle.classList.add("explanation-reply");
    replyEle.innerHTML = `<p>${reply}</p>`;
    replyEle.onclick = () => {
      addComment(id, reply);
    };
    return replyEle;
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
        <div id="replies"></div>
    </div>`;
  
  if (ele) {
    ele.appendChild(newEle);
    replyBlocks.forEach((reply) => {
      document.getElementById("replies").appendChild(reply);
    });
  }
};

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
  initialize();
  injectCSS();
  injectComments();
  // document.querySelector(".DraftEditor-root").onclick = injectComments;
};

const commentGenerator = (avatar, userName, comment_id, comment) => {
  // extract div with comment_id
  const commentDiv = document.querySelector(`#${comment_id} > .Comment`);

  // Get second div inside commentDiv
  const parent = getSecondDiv(comment_id);
  const cloneDiv = commentDiv.cloneNode(true);
  cloneDiv.querySelector(".explanation-block").remove();
  cloneDiv.querySelectorAll(".inserted-comment").forEach((comment) => {
    comment.remove();
  });

  // Replace div's avatar with avatar
  cloneDiv.querySelector('img[alt="User avatar"]').src = avatar
    ? avatar.src
    : "https://github.com/victorhuangwq/community-improver/blob/block-explanation/images/default_pfp.png?raw=true";
  // Replace username with the userName
  cloneDiv.querySelector('a[data-testid="comment_author_link"]').innerText =
    userName;
  // Remove OP label if it exists
  cloneDiv.querySelector(`#CommentTopMeta--OP--${comment_id}`)?.remove();

  // Remove flair if it exists
  if(cloneDiv.querySelector('div[data-testid="post-comment-header"]').children.length > 1){
    cloneDiv.querySelector('div[data-testid="post-comment-header"]').children[1].remove();
  }

  // Change time to 1 second ago
  cloneDiv.querySelector(`#CommentTopMeta--Created--${comment_id}`).innerText =
    "1 second ago";
  // Change # of upvotes to 1
  cloneDiv
    .querySelector(`#vote-arrows-${comment_id}`)
    .querySelector("div").innerText = "1";

  // Replace div's comment with comment
  const paragraph = cloneDiv.querySelector(".RichTextJSON-root").querySelector("p");
  paragraph.innerText = comment;
  paragraph.classList.add("comment-text");

  cloneDiv
    .querySelector('div[data-testid="comment"]').innerHTML = paragraph.outerHTML;

  cloneDiv.style.zIndex = 99999;

  cloneDiv.classList.add("inserted-comment");

  // Append cloneDiv to parent
  parent.appendChild(cloneDiv);
};

const addComment = (parent_comment_id, comment) => {
  console.log("comment", comment);
  const userDropdown = document.querySelector("#USER_DROPDOWN_ID");
  const avatar = userDropdown.querySelector('img[alt="User avatar"]');
  
  // Getting user name, get first span of #email-collection-tooltip-id
  const userName = document
    .querySelector("#email-collection-tooltip-id")
    .querySelector("span")
    .querySelector("span").innerText;
  
  // Adds delay to make it feel real
  setTimeout(function() {
    commentGenerator(avatar, userName, parent_comment_id, comment);
  }, delayInMilliseconds);

};
