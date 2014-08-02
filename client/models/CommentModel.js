/** @jsx m */

"use strict";

var _ = require("underscore");
var vagueTime = require("vague-time/lib/vagueTime-en");

var CurateBaseModel = require("./CurateBaseModel.js");

var CommentModel = CurateBaseModel.extend({
  relations: {
    replies: {type: "many"} // model is defined below
  },
  defaults: {
    "owner_id": "",
    "comment": "",
    "anonymous": false
    // ts
  },
  initialize: function() {
    if (this.get("created_at")) {
      this.set("ts", this.get("created_at")*1000, {silent: true});
    } else if (!this.get("ts")) {
      this.set("ts", _.now(), {silent: true});
    }
  },
  computeds: {
    authorName: function() {
      if (this.get("anonymous") || !this.get("author")) {
        return "Anonymous";
      } else {
        return this.get("author").get("fullName");
      }
    },
    timeAgo: function() {
      return vagueTime.get({
        to: this.get("ts")
      });
    },
    image: function() {
      if (this.get("anonymous")) {
        return <span className="icon icon_person"></span>;
      } else {
        var author = this.get("author");
        if (author && author.get("image")) {
          return author.get("image");
        }
      }
      return <span className="icon icon_person"></span>;
    }
  }
});

CommentModel.prototype.relations.replies.model = CommentModel; // had to do this because of self reference

module.exports = CommentModel;
