# Community Improver Chrome Extension

## Overview

This extension was created as a final project for 05-380 Prototyping Algorithmic Experiences by Victor Huang, Sunny Liang, Michelle Liu, and Kimi Wenzel.

## Instructions

### Installation

1. Clone this repository to your computer by running `git clone https://github.com/victorhuangwq/community-improver.git`
2. Visit chrome://extensions/
3. Turn on developer mode in the top right corner of the page
4. Click the "Load Unpacked" button on the top left corner of the page, under the Chrome logo
5. Select the `community-improver` folder created when you cloned the repository.

### Loading Changes

Whenever you need to update any files in community-improver, you need to press the refresh button on the "Community Improver" panel in the chrome://extensions/ page.
![image](https://user-images.githubusercontent.com/50491000/205958714-3b727d9b-ebd0-4388-8cab-3b4026b05ad9.png)


### Updating the Configuration

Add objects to the `data` array in `scripts/data.js` in the following format:

```
{
    "page": "https://www.reddit.com/r/cmu/comments/yv2qwk/does_faang_career_help_with_csml_admission/",
    "id": "t1_iwc8xe9", // id of the commet you want to modify
    "replacement_text": "I think it should. FAANG has...that will help your chances a lot.", // text you want to replace the comment with
    "sexism_type": "innocuous", // innocuous or hostile
    "explanation": "This comment is a display of innocuous sexism... of diversity initiatives.",
    "reply_1": "The challenges that arise...",
    "reply_2": "What do you mean...?",
    "bot_reply_1": "The challenges that...",
    "bot_reply_2": "What do you mean by...?"
}
```

### Changing Settings

There are 3 settings that you can toggle: `method`, `sexism_type`, and `mode`.

To edit these settings, update the variables in `scripts/content.js`:

```
// options = perspectiveTaking, greaterGood
let method = "perspectiveTaking";

// sets sexism type
// options = hostile, innocuous
let sexism_type = "hostile";

// options = bot, user
let mode = "bot";
```
