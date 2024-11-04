# **FP4 \- Final Project Writeup**

Feel free to refer to this [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/) to make your writeup more organized, and you can preview your markdown file in VSCode [Markdown editing with Visual Studio Code](https://code.visualstudio.com/docs/languages/markdown#_markdown-preview).

## Part 1: Website Description

Describe your website (300 words).

- What is the purpose of your website?
- Who is the target audience?
- What information do you convey with your website?
- How is it interesting and engaging?

## Part 2: User Interaction

How a user would interact with your website? For each step, briefly but clearly state the interaction type & how we should reproduce it.

1. Interaction type. Click on X on page Y / scroll on page X, etc.
2.

## Part 3: External Tool

Describe what important external tool you used (JavaScript library, Web API, animations, or other). Following the bulleted list format below, reply to each of the prompts.

1. Name of tool1
   - Why did you choose to use it over other alternatives? (2 sentences max)
   - How you used it? (2 sentences max)
   - What does it add to your website? (2 sentences max)
2. Name of tool2

## Part 4: Design Iteration

Describe how you iterated on your prototypes, if at all, including any changes you made to your original design while you were implementing your website and the rationale for the changes. (4-8 sentences max)

## Part 5: Implementation Challenge

What challenges did you experience in implementing your website? (2-4 sentences max)

## Part 6: Generative AI Use and Reflection

Describe how you used Generative AI tools to create this final project (fill in the following information, write \~500 words in total).

Document your use of all GenAI tools — ChatGPT, Copilot, Claude, Cursor, etc. using the template below. Add/Delete rows or bullet points if needed, and replace Tool1/Tool2 with the name of the tool.

### Usage Experiences by Project Aspects

Feel free to edit the column \_ (other?) or add more columns if there's any other aspect in your project you've used the GenAI tools for.

For the following aspects of your project, edit the corresponding table cell to answer:

- _Usage_: Whether you used / did not use this tool for the aspect. Enter [Yes/No]
- _Productivity_: Give a rating on whether this tool makes your productivity for X aspect [1-Much Reduced, 2-Reduced, 3-Slightly Reduced, 4-Not Reduced nor Improved, 5-Slightly Improved, 6-Improved, 7-Much Improved].

| Tool Name | Ratings      | design | plan   | write code | debug  | \_ (other?) |
| :-------- | :----------- | :----- | :----- | :--------- | :----- | :---------- |
| Tool1     | Usage        | Yes/No | Yes/No | Yes/No     | Yes/No | Yes/No      |
| Tool1     | Productivity | 1~7    | 1~7    | 1~7        | 1~7    | 1~7         |
| Tool2     | Usage        | Yes/No | Yes/No | Yes/No     | Yes/No | Yes/No      |
| Tool2     | Productivity | 1~7    | 1~7    | 1~7        | 1~7    | 1~7         |

### Usage Reflection

> Impact on your design and plan

- It matched my expectations and plan in [FP2](#generative-ai-use-plan) in that … For example,
  1. Tool1:
  2. Tool2:
- It did not match my expectations and plan in [FP2](#generative-ai-use-plan) in that … For example,
  1. Tool1:
  2. Tool2:
- GenAI tool did/did not influence my final design and implementation plan because … For example,
  1. Tool1:
  2. Tool2:

> Use patterns

- I accepted the generations when … For example,
  1. Tool1: this tool once suggested … and I adjusted my design according to the suggestion because …
  2. Tool2:
- I critiqued/evaluated the generated suggestions by … For example,
  1. Tool1: this tool once suggested … but I modified/rejected the suggestion because …
  2. Tool2:

> Pros and cons of using GenAI tools

- Pros
  1. Tool1:
  2. Tool2:
- Cons
  1. Tool1:
  2. Tool2:

### Usage Log

Document the usage logs (prompts and chat history links) for the GenAI tools you used. Some tools may not have an easy way to share usage logs, just try your best! Some instructions for different tools:

1. [ChatGPT](https://help.openai.com/en/articles/7925741-chatgpt-shared-links-faq) / [Gemini](https://support.google.com/gemini/answer/13743730?hl=en&co=GENIE.Platform%3DDesktop): share the anonymous link to all of your chat histories relevant to this project
2. [GitHub Copilot (VSCode)](<https://code.visualstudio.com/docs/copilot/copilot-chat#:~:text=You%20can%20export%20all%20prompts%20and%20responses%20for%20a%20chat%20session%20in%20a%20JSON%20file%20with%20the%20Chat%3A%20Export%20Session...%20command%20(workbench.action.chat.export)%20in%20the%20Command%20Palette.>): export chat histories relevant to this project.

---

# **FP3 \- Final Project Check-in**

Document the changes and progress of your project. How have you followed or changed your implementation & GenAI use plan and why? Remember to commit your code to save your progress.

## Implementation Plan Updates

- [ ] ...

## Generative AI Use Plan Updates

- [ ] ...

Remember to keep track of your prompts and usage for [FP4 writeup](#part-6-generative-ai-use-and-reflection).

---

# **FP2 \- Evaluation of the Final project**

## Project Description

**LitTunes** is an application that creates custom playlists for readers, tailoring song recommendations to suit a specified book, characters, or keywords using the Spotify API.

## High-Fi Prototypes

### _Prototype 1_ - Homepage

![Homepage](public/assets/proposal/Homepage.png)

The Homepage features a form for the user to complete, gathering the information needed to construct their playlist. Participant #2 initially overlooked the radio buttons at the beginning of the form (for choosing between a book and particular character); as is mentioned later, spacing is increased to call more attention to it.

### _Prototype 2_ - Playlist Page

![Homepage](public/assets/proposal/PlaylistPage.png)

The Playlist Page follows the loading screen; it displays the playlist generated as a result of the user's specifications on the Homepage. Neither of the users had any feedback around this stage of the prototype.

## Usability Test

In my usability test, I first provided the participants with some context as to the purpose of the app, then assigned them their task (the app has a pretty singular purpose, so I only found one task to be necessary). Users were asked to generate a playlist for the character Henry Winter from "The Secret History" by Donna Tartt. The playlist should have the following characteristics:

- It should include the genres Indie and Classical
- It’s moods should be Sad and Calm
- It should be further inspired by the phrases Dark Academia and Gothic
- It may include songs with lyrics

Equipped with this direction, both users were able to successfully complete the task.

Participant #1 did not encounter any difficulty and did not have any visual design feedback. They expressed satisfaction with the app’s performance and appreciated the loading screen and the recommendation it featured. Since the application will be heavily dependent on behind-the-scenes logic for crafting the playlist, it is anticipated that a loading screen lasting a few seconds will be required. The colorful animation and TBR suggestion were added as a way to decrease the user's perceived waiting time, so I'm glad they're able to contribute some value to the user's experience, rather than serve solely as a functional necessity.

Participant #2 did initially overlook the radio buttons at the beginning of the form (for choosing between a book and particular character). It carries less visual weight than larger input fields, so to distinguish it further from the rest of the questions they advised increasing the spacing between it and the following fields. Specifically, they suggested matching the amount of space that is used between the book/author/character fields and the genre/mood/keyword fields. This is feedback that I implemented, as seen in my revised design.

## Updated Designs

Designs were updated to increase spacing in the first section of the form & remove the play icon from the "Create playlist" button.

![Original Homepage](public/assets/proposal/HomepageOriginalAnnotated.png)
![Updated Homepage](public/assets/proposal/HomepageAnnotated.png)

## Feedback Summary

One of the points of feedback I received from our lab session last week was to consider incorporating colored cards to represent genres and moods instead of a list format. While I do agree this would add visual interest to the page, I don't believe it would be conducive to many items. Spotify's list of genres is extremely extensive, numbering well past 1,000. While I don't (currently) plan to include all of them in my application, I would still like to include more than would be appropriate for cards. Perhaps there is a way to use cards for the most popular/well-known genres and moods, but provide a more condensed format for others. Once I have started looking into the specific components needed for the form, I will decide how to proceed.

Another point of feedback I received was surrounding the "Create playlist" button on my homepage. It was brought up that the inclusion of a play icon prepending the button text might lead to some confusion, since the button submits a form rather than actually plays something. I had initially added the icon for decorative purposes, thinking it would "add something" to an otherwise plain button, but this is a valid point; I have removed the icon from my updated design.

It was also suggested that I might provide an explanation as to why each song was chosen, making clear the connection between the book/character and the generated playlist. I would love to add a feature like this, but I believe it reaches beyond timeframe I have to work with. Getting into the weeds with lyric analysis sounds like a great learning opportunity, but also a time consuming one that wouldn't be doable within the scope of the class.

## Milestones

### _Implementation Plan_

- [ ] Week 9 Oct 28 \- Nov 1:
  - [x] FP1 due
- [ ] Week 10 Nov 4 \- Nov 8:
  - [x] FP2 due
  - [ ] Initial set-up with libraries and frameworks
  - [ ] Obtain credentials for required APIs
  - [ ] Basic form logic for capturing user input
  - [ ] Potentially implement user authentication with Spotify's OAuth
- [ ] Week 11 Nov 11 \- Nov 15:
  - [ ] Create mapping of values such as valence, energy, etc. to moods for use with Spotify's API
  - [ ] Test Hardcover API (or alternative), ensuring content can be located based on user specified title, author and character
  - [ ] Test Spotify API (or alternative), ensuring content can be located based on user specified genres, moods and keywords
- [ ] Week 12 Nov 18 \- Nov 22:
  - [ ] Continue with API integration logic
  - [ ] Determine best way to pick which songs of returned results to include in playlist
- [ ] Week 13 Nov 25 \- Nov 29:

  - [ ] If needed, continue working on API logic
  - [ ] Work on styling, animations, etc.
  - [ ] Thanksgiving

- [ ] Week 14 Dec 2 \- Dec 6:
  - [ ] Last tweaks & bug fixes
  - [ ] FP4 due

### _Libraries and Other Components_

List the JS libraries and other components (if applicable) that you plan to use.

- React.js
- Mantine or Material UI component library
- Redux (maybe just to try it out, probably overkill)

## Generative AI Use Plan

### _Tool Use_

I primarily plan to use ChatGPT over the courrse of the development of my project. My previous experiences in web development and CS education have equipped me to recognize the strengths and limitations of the tool in practical scenarios.

- ChatGPT can serve as a first line of inquiry for troubleshooting common errors and optimizing code snippets. By inputting specific error messages or describing a bug, I can receive suggestions on potential fixes or better practices. This is particularly useful in iterative testing and refining phases, where quick resolutions can accelerate development.
- With my background in teaching for CS, I especially recognize the importance of understanding the fundamentals behind any solution. It is imperative that it be treated as a resource and not a crutch. I will use ChatGPT to supplement my research on new programming concepts or APIs by asking it to explain complex ideas in simpler terms or to provide additional context. This will aid in reinforcing my learning and ensuring a solid foundation for my development work.

I will not use ChatGPT for:

- Final Decision-Making or Complex Problem Solving: While ChatGPT is an excellent tool for generating ideas and providing suggestions, it does not understand the specific context or unique requirements of my project like a human developer would. I will not rely on it for making critical decisions or solving complex problems that require deep understanding of user needs or the specific technical stack of my project.
- Substituting Peer Reviews: GenAI can help spot straightforward issues or inefficiencies in code, but it cannot replace the nuanced feedback provided by human peer reviews. I value insights that come from the perspectives of my peers, particularly those that can challenge my assumptions and encourage creative solutions.

### _Responsible Use_

How would you use Generative AI responsibly?
I will always be aware of the information being fed to a GenAI tool like ChatGPT, particularly as this relates to keys and tokens that are meant to remain secure.
I will also provide oversight at all times, vetting any code that is produced for potentially biased and/or harmful decision-making.

# **FP1 \- Proposal for Critique**

## Idea Sketches

### _LitTunes_

**LitTunes** is an application that creates custom playlists for readers, tailoring song recommendations to suit a specified book, characters, or keywords using the Spotify API.

_Interactivity and Engagement:_ The functionality of the app depends on user participation. Users will have control over several metrics for playlist generation (book title or character name, desired moods, genres, and keywords).

_Accessibility:_ The design will prioritize easy navigation and control. The platform will also strive to abide by [Spotify's accessibility guide for developers](https://developer.spotify.com/documentation/accessibility), maintaining awareness of alt text, color contrast, and more.

_Information:_ Not applicable. LitTunes is not an informational application.

![LitTunes Sketch](public/assets/proposal/LitTunesSketch.jpg)
_Left: Prompt page; contains various fields for users to specify their playlist features_
_Right: Playlist generation results; reiteration of playlist features and vertical list of recommended tracks_

### _FableFrame_

**FableFrame** is a tool aimed at helping authors and storytellers organize and visualize the details of their characters and settings, making the manuscript development process more structured and accessible.

_Interactivity and Engagement:_ At it's based level the platform will allow users to create character and setting profiles, with the ability to enter text and add images and links. Future iterations might explore ways to link characters, drag-and-drop functionality, etc.

_Accessibility:_ FableFrame will be designed with a focus on readability and ease of use, possibly including options for changing text size and background colors to accommodate different visual preferences. As a form of a CMS, organization will be key, and the interface will need to be as straightforward as possible.

_Information:_ The information FableFrame showcases depends on content entered by the user, but the interface will at least feature the essential sections for character and setting design. Users will be able to access both general and detail views of their information, reducing information-overload and ensuring only the necessary information is provided at a given time.

![FableFrame Sketch](public/assets/proposal/FableFrameSketch.jpg)
_Top Left: Main page; shows sortable/filter-able list of created subpages (characters and settings); navigation panel allows user to access pages specifically for characters or settings_
_Bottom Left: Alternate main page; user can toggle between list and grid view_
_Right: Example of a character page, containing sections dedicated to general information, appearance, personality, etc. Setting pages would be similar, but with different sections._

### _Mealwise_

**Mealwise** is designed to provide users with personalized recipe recommendations and nutritional information by leveraging the [Spoonacular API](https://spoonacular.com/food-api). The project aims to help users discover new meals based on their dietary preferences and what ingredients they have on hand.

_Interactivity and Engagement:_ With the "What's in my fridge" feature, users will be able to input specific ingredientsto receive recipe suggestions, creating a dynamic and personalized experience.

_Accessibility:_ The design will focus on photos and text, screen reader compatibility, and simple, intuitive navigation to ensure that the website is accessible to users with varying abilities.

_Information:_ The site will feature general browsing and a recipe detail view. It will display thorough breakdowns of recipes, including ingredients, cooking steps, nutritional information, and more.

![Mealwise Sketch](public/assets/proposal/MealwiseSketch.jpg)
_Top Left: Homepage; choice between general recipe search and searching for recipes with specific ingredients/"What's in my fridge" (in hindsight, would not separate these options, just add filtering to general search)_
_Top Right: General recipe search/browsing page_
_Bottom Left: "What's in my fridge" page; user enters specific ingredients they want recipes for_
_Bottom Right: Recipe page; includes image, name, description, ingredients, steps, etc._

## Feedback Summary

For LitTunes, the feedback generally focused on refining the mechanism of playlist creation to ensure relevance and user engagement. Cella found the initial book-centric playlist idea feasible with the Spotify API. Abby and Sapna were intrigued by customizing playlists based on detailed criteria like keywords or book characteristics. Michael questioned the basis for song recommendations and the functionality for saving playlists. Sanjna cautioned against using "vibes" due to their complexity, suggesting sticking with moods. Kennion favored the idea of recommending lyric-free music to accompany reading, considering it a unique angle that could enhance the reading experience.

FableFrame received suggestions related to enhancing the story development tools and information management. Cella advised considering unique interactions or elements that differentiate it from standard content management systems. Abby viewed it as beneficial for organizational purposes and gaining a high-level view of the narrative. Michael proposed a feature to visualize character connections and prevent out-of-character behaviors, which might be complex but intriguing. Sapna saw its utility for authors and their collaborators, like editors and illustrators. Kennion liked it for practicing information architecture and suggested integrating interactive elements like images and sounds through an LLM API.

For Mealwise, the feedback centered on enhancing user interaction and personalization. Cella suggested incorporating appealing designs, especially around the "what's in my fridge" feature. Abby liked the idea of saving recipes and highlighted the fridge feature, while Michael appreciated the meal recommendation aspect. Sapna found the concept useful for managing leftover ingredients. Sanjna recommended focusing on creating a personal recipe book for users and suggested filtering options to refine recipe searches. Kennion emphasized the potential of integrating an LLM API to explore what could be made from available ingredients, suggesting that this aspect might introduce complexity but could be enjoyable.

## Feedback Digestion

I have decided to develop LitTunes, as I believe it’s the most interactive and interesting project of the three, both for users and myself as the developer.

While there was some concern around using "vibes" as a metric by which users could craft their playlist, I do believe it's doable. A more accurate term would likely be "keywords", which can be searched for in existing playlist titles and descriptions; ["getting" playlists by field is supported by the Spotify API](https://developer.spotify.com/documentation/web-api/reference/get-playlist), and these can then be searched for the specified keyword(s). This added layer of recommendation logic not only seems viable, but also necessary for improving the relevancy of returned songs. I do not expect genre and mood to provide a fine enough filter for ensuring songs have the appropriate message or subject matter.

I especially appreciate Kennion’s point about recommending instrumental songs that could be listened to _while_ reading. That would definitely be a useful setting for users to toggle on and off, depending on their intentions for the playlist and/or personal preference. I'm not someone who listens to music while reading, but can certainly see how lyric-free tracks would be less distracting and potentially more immersive. "Instrumental" is listed as one of Spotify's genres, so this should be fairly simple to filter for.

Michael's question around saving the generated playlist was also something that had crossed my mind but not fully looked into. A quick search shows that [creating an empty playlist for a user](https://developer.spotify.com/documentation/web-api/reference/create-playlist) and [saving tracks to it](https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist) is also possible with the API. To implement this, the user would need to sign into their Spotify account. I wonder if it would be best to have users sign in upfront in order to use the app, or wait until they make the decision to save the playlist to prompt sign-in. An immediate benefit of the second approach would be leaving the playlist-creation aspect of the app accessible to non-Spotify users, but I'll have to give this more thought.
