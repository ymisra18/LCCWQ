
## What is this Project about ?
This project is a website which enhances your experience while you are solving coding problems online on Leetcode. It'll be of major help for anyone preparing for big tech giants and many other companies, and also for those who simply enjoy the process of problem solving. It provides leetcode premium features/questions for free.

★ Company Tags
- Reveals information about which companies have asked the problem that you are currently solving and how many times this problem been asked by the same companies

★ Question list filter for a specific Company/Companies
- Provides the company wise list of problems upon click of any specific company tag.
- Users can click on problem link and that same problem is opened in a new tab.
- Users can search within the provided list of companies and select/deselect tags.

★ Sort on the Basis of difficulty
- Users can choose to apply either easy/medium/hard or on all levels to filter and work on the problems.

Your feedback and constructive criticism, is always appreciated, and we look forward to make this website better day by day, step by step.

  
### BONUS: Star this [repository](https://github.com/ymisra18/LCCWQ/) for further development of features. If you want a particular feature, simply request for it!


## How to build locally
  For Mac:
- Clone project
- Open in any editor of your choice
- If you want to add/remove code then react code is present under `src/`, which you can edit
- Now run `npm run build` to create a loadable build/ folder
- Now to actually test changes we need to load the extention in browser so go to `chrome://extensions` through browser searchbar
- Toggle developer mode on top right in order to enable it
- Click Load unpacked and choose the `build` folder in root of this project
- Your extention is loaded sucessfully, you don't even need to click it, just go to any leetcode problem and extention will start working
  
For Windows: 
- Clone project
- Open in any editor of your choice
- If you want to add/remove code then react code is present under `src/`, which you can edit
- Replace the `scripts` part in `package.json` file to the below mentioned one
```
"scripts": {
          "start": "react-scripts start",
          "zip-build": "bestzip big-omega-extension.zip build/",
          "move-files": "copy leetcode-live.zip ../webapp/public",
          "test": "react-scripts test",
          "eject": "react-scripts eject",
          "build": "set INLINE_RUNTIME_CHUNK=false && node ./build-rewired.js && npm run clean && npm run move-index",
          "clean": "cd build && move static\\js\\*.js big-omega-tools.js && move static\\css\\*.css big-omega-tools.css",
          "move-index": "copy public\\index.html build\\index.html"
        },
```
- Now run `npm run build` to create a loadable build/ folder
- Now to actually test changes we need to load the extention in browser so go to `chrome://extentions` through browser searchbar
- Toggle developer mode on top right in order to enable it
- Click Load unpacked and choose the `build` folder in root of this project
- Your extention is loaded sucessfully, you don't even need to click it, just go to any leetcode problem and extention will start working

## Code References
Special thanks to Huan Xu for this [leetcode-company-wise-problems-2022](https://github.com/hxu296/leetcode-company-wise-problems-2022/blob/main/data/leetcode_problems_and_companies.csv) csv file which helps our website to unlock the information about which companies have asked the problem.

## Creator
- [Yashi Misra](https://www.linkedin.com/in/yashi-misra-405a4516b/)
