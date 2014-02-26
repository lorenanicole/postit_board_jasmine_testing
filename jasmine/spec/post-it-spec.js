describe("Board", function() {
  describe("#constructor", function(){

    beforeEach(function(){
      loadFixtures('test.html');
      // var board = new Board();
    });

     it("has a template", function(){
      var board = new Board();
      expect(board.hasOwnProperty('$elem')).toBe(true);
    });

    it("places a post when the board is clicked", function(){
      var board = new Board();
      board.$elem.appendTo($('#jasmine-fixtures'));
      spyOn(PostIt.prototype,'place');
      board.$elem.trigger('click');
      expect(PostIt.prototype.place).toHaveBeenCalled();
    });

  });
});


describe("PostIt", function() {
  describe("#constructor", function(){

    beforeEach(function(){
      loadFixtures('test.html')
    });

    it("has a template", function(){
      var post = new PostIt();
      // post.template.appendTo($('#jasmine-fixtures'));
      // expect(post.template).toExist();
      expect(post.hasOwnProperty('template')).toBe(true);
    });

    it("calls the destroy function when the X anchor tag is clicked", function(){
      var post = new PostIt();
      post.template.appendTo($('#jasmine-fixtures'));
      spyOn(post,'destroy');
      $('.post-it a').trigger('click');
      expect(post.destroy).toHaveBeenCalled();
    });

    it("places the mouse in the content area", function(){
      var post = new PostIt();
      post.template.appendTo($('#jasmine-fixtures'));
      spyFind = spyOn(post.template,'find').and.returnValue($("<div contenteditable='true'></div>"));
      spyFocus = spyOn(spyFind(),'focus');
      $('.content').trigger('click');
      expect(spyFocus).toHaveBeenCalled();
    });

  });

  describe("#destroy", function(){
    it("calls post.template to remove itself.", function(){
      var post = new PostIt();
      spyOn(post,'template');
      spyOn(post.template,'remove');
      post.destroy();
      expect(post.template.remove).toHaveBeenCalled();
    });

  });

  describe("#updateContent", function(){
    it("updates its template body content.", function(){
      var post = new PostIt();
      spyOn(post.template,'find').and.returnValue($("<p><p>"));
      post.updateContent("BlahBlahBlahBlah");
      expect(post.template.find().html()).toEqual("BlahBlahBlahBlah");
    });

  });

  describe("#place", function(){
    it("appends itself to the DOM.", function(){
      var post = new PostIt();
      var parent_el = $('<div></div>');
      spyOn(parent_el,'append');
      post.place(1,2,parent_el);
      expect(parent_el.append).toHaveBeenCalledWith(post.template);
    });

    it("appends itself at the specified x and y coordinates to the DOM.", function(){
      var post = new PostIt();
      spyOn(post.template,'offset');
      post.place(100, 200, $('<div></div>'));
      expect(post.template.offset).toHaveBeenCalledWith({top: 100, left: 200});
    });

  });

});














