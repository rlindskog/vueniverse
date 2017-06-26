module.exports = {
  "helpers": {
    "raw": function (options) {
      return options.fn(this)
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vueniverse project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "session": {
      "type": "list",
      "message": "Choose a session strategy (for blacklisting JWTs)",
      "choices": [
        "redis",
        "in-memory"
      ]
    }
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://www.github.com/rlindskog/vueniverse"
}
