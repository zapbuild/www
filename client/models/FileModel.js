/** @jsx m */

"use strict";

var _ = require("underscore");

var CurateBaseModel = require("./CurateBaseModel.js");
var CommentModel = require("./CommentModel.js");

var FileModel = CurateBaseModel.extend({
  relations: {
    comments: {type: "many", model: CommentModel},
  },
  initialize: function() {
    if (!this.get("id")) {
      this.set("id", _.uniqueId());
    }
  },
  defaults: {
    name: "",
    url: "",
    comments: [
      {body: "This file has a comment"},
      {body: "This file has a second comment"}
    ]
  }
});


module.exports = FileModel;
