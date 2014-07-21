/** @jsx m */

"use strict";
require("./CommentForm.scss");

var m = require("mithril");

var DropdownSelect = require("./DropdownSelect.js");

var CommentForm = {};

CommentForm.controller = function(options) {
  this.body = m.prop("");
  this.anonymous = m.prop(false);
  this.user = options.user;
  this.comments = options.comments;

  this.dropdownSelectController = new DropdownSelect.controller({
    options: [
      {value: false, content: <img src={this.user.get("gravatarUrl")} className="userImage" />},
      {value: true, content: <div className="userImage"><span className="icon icon_person"></span></div>}
    ],
    value: this.anonymous,
    onchange: this.anonymous
  });

  var _this = this;

  this.handleSubmit = function(e) {
    e.preventDefault();
    _this.comments.add({
      "author": _this.user,
      "date": "4-1-2014",
      "body": _this.body(),
      "anonymous": _this.anonymous()
    });
    _this.body("");
  };

  this.handleInput = function() {
    _this.body(this.value);
    CommentForm.autosize(this);
  };
};

CommentForm.autosize = function(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight+'px';
};

CommentForm.view = function(ctrl) {
  return (
    <form className="CommentForm" onsubmit={ctrl.handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td className="commentUserSelect">{new DropdownSelect.view(ctrl.dropdownSelectController)}</td>
            <td className="commentBodyTextarea"><textarea value={ctrl.body()} oninput={ctrl.handleInput} placeholder="Leave a comment"/></td>
            <td className="commentSubmit"><button type="submit" className="btn post">Post</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

module.exports = CommentForm;