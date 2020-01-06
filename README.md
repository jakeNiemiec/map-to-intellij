# MAP TO INTELLIJ IDE
Chrome Webstore Page: https://chrome.google.com/webstore/detail/map-to-intellij-ide/idhgkmnohcikhlciggjinlikclejfmih

## About
Override the chrome dev console linking behavior in order to open links to files in your IDE instead of the sources panel. This uses the IntelliJ Platform REST API http://develar.org/idea-rest-api/#api-Platform-file in conjunction with Chrome Developer Tools link handling.

## Requirements

- You must manually set "Link handling" to "Map to IntelliJ IDE". To do this, open Developer Tools > settings (press 3 dots in top right or press F1) > preferences > Extensions > Link handling

- You must add something like the following to the output portion of your webpack config:

devtoolModuleFilenameTemplate: (info) => 'file://' + path.resolve(info.absoluteResourcePath)

*More info*: https://webpack.js.org/configuration/output/#outputdevtoolmodulefilenametemplate

*Note to devs*: This can work with any build-tool that supports customized source mapping, not just webpack.

*Authors note*: Thanks all for using this little tool I originally only intended for me and my coworkers. Happy you found it useful!

## Changelog

- 0.5 - don't open node_modules in IDE
- 0.7 map to client folder
- 0.8 use absolute file paths

## License
map-to-intellij is released under the [MIT License](https://opensource.org/licenses/MIT).
