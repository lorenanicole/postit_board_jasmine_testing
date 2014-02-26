$(function() {
  // This code will run when the DOM has finished loading
  var boardPicker = new BoardSelector($("#board_selector"));

});

function BoardSelector(el) {
  this.boards = [];
  this.$elem = el;
  var self = this;

  this.$elem.find("#new_board").click(function(){
    self.generateBoard();
  });

  this.$elem.on('click', 'a',function(e){
    e.preventDefault();
    $(".post_board").hide();
    id = parseInt($(this).attr("id")) - 1;
    self.boards[id].$elem.show();
  });

  this.$elem.find("#load_samples").click(function(e){
    $(this).hide();
    $.each(SampleBoards, function(key, value) {
      var newBoard = self.generateBoard(key);
      $.each(SampleBoards[key], function(index, value){
        newBoard.generatePostIts(value.content, value.position.top,value.position.left);
      });
    });
  })
}

BoardSelector.prototype.placeLink = function(name) {
  var num = this.boards.length;
  if (name === undefined) {
    this.$elem.find("#board_list").append("<li><a href='#' id=" + num + ">board_" + num + "</a></li>");
  } else {
    this.$elem.find("#board_list").append("<li><a href='#' id=" + num + ">board_" + name + "</a></li>");
  }
}

BoardSelector.prototype.generateBoard = function(name) {
  $(".post_board").hide();
  var b = new Board();
  this.boards.push(b);
  b.place();
  this.placeLink(name);
  return b;
}

function Board() {
  this.$elem = $('<div class="post_board"></div>')
  var self = this;

  this.$elem.click(function(e){
    var post = new PostIt();
    post.place(e.pageY,e.pageX, self.$elem);
  });

}

Board.prototype.place = function(){
  $("body").append(this.$elem);
}

Board.prototype.generatePostIts = function(content, top, left) {
  var newPost = new PostIt();
  newPost.updateContent(content);
  newPost.place(top,left, this.$elem);
}


function PostIt (){
  this.template = $("<div class='post-it'><div class='header'><a href='#'>X</a></div><div class='content' contenteditable='true'></div></div>");
  this.template.draggable({handle: ".header"});
  var self = this;

  this.template.find(".content").click(function(e){
    e.stopPropagation();
    self.template.find(".content").focus();
  });

  this.template.find("a").click(function(e){
    e.stopPropagation();
    self.destroy();
  });
}

PostIt.prototype.destroy = function() {
  this.template.remove();
}

PostIt.prototype.place = function(y,x,parent_el){
  this.template.hide();
  parent_el.append(this.template);
  this.template.show();
  this.template.offset({top: y, left: x});
}

PostIt.prototype.updateContent = function(content) {
  this.template.find(".content").html(content);
}
