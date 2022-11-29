const article = document.querySelector("article");

const commentGenerator = (avatar_src, userName, comment_id, comment) => {
    
    // extract div with comment_id
    const commentDiv = document.querySelector(`#${comment_id} > .Comment`);
    
    // Get second div inside commentDiv
    const parent = commentDiv.children[2];
    const cloneDiv = commentDiv.cloneNode(true);

    // Replace div's avatar with avatar
    cloneDiv.querySelector('img[alt="User avatar"]').src = avatar_src;
    // Replace username with the userName
    cloneDiv.querySelector('a[data-testid="comment_author_link"]').innerText = userName;
    // Remove OP label if it exists
    cloneDiv.querySelector(`#CommentTopMeta--OP--${comment_id}`)?.remove();
    // Change time to 1 second ago
    cloneDiv.querySelector(`#CommentTopMeta--Created--${comment_id}`).innerText = "1 second ago";
    // Change # of upvotes to 1
    cloneDiv.querySelector(`#vote-arrows-${comment_id}`).querySelector('div').innerText = "1";

    // Replace div's comment with comment
    cloneDiv.querySelector('div[data-testid="comment"]').querySelector('p').innerText = comment;
    
    cloneDiv.style.zIndex = 99999;
    // Append cloneDiv to parent
    parent.appendChild(cloneDiv);
};

const addComment = (parent_comment_id, comment, is_bot) => {
  let avatar_src;
  let userName;
  if(is_bot) {
    avatar_src = "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png";
    userName = "CommunityImprovementBot"; 
  }
  else{
    avatar_src = document.querySelector("#USER_DROPDOWN_ID").querySelector('img[alt="User avatar"]').src;
    // Getting user name, get first span of #email-collection-tooltip-id
    userName = document.querySelector("#email-collection-tooltip-id").querySelector('span').querySelector('span').innerText;
  }
  commentGenerator(avatar_src, userName, parent_comment_id, comment);
}

setTimeout(() => {
  addComment("t1_iwpmzi3", "comment", true);
}, 3000);

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}

