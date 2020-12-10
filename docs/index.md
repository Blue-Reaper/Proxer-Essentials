# What is the relaunch of Proxer Essentials?

With the relauch comes a change of philosophy, it will no longer be a userscript where more features can be added by others. The reason is simply that no one used it and so I will conentrate on the main featues and throw out the framework to manage different modules, as it is simply unneeded overhead.

The relaunch will be an Firefox Add-On and it will no longer add features to the existing Proxer-Site. It will reduce the funktions to the essentials to create a simple design, where you get what you want with minimal clickcount and no unneded distractions.

To ensure that no unnessesary code or functions are put in the relaunch, it will start from scratch and build up from there.

# How to build

You'll need [Node.js](https://nodejs.org) installed.

Clone the source and install all dependencies:

```
git clone https://github.com/Blue-Reaper/FolgenFinder.git
cd folgenfinder
npm install
```

lint and build the extension:

```
npm run all
```

other commands:

```
npm run lint    # run all lint checks
npm run dev     # run in Firefox-Developer, open console, rebuilding and updating when files change
npm run run     # run in Firefox, rebuilding and updating when files change
npm run build   # build extension
```

### Report ideas, feature requests or bugs:

- [GitHub](https://github.com/Blue-Reaper/Proxer-Essentials/issues/new/choose)
