function Section(name){
    'use strict';
    this.name = name;
    this.pages = [];
    this.current_page = 0;
    this.$element = $('<section>').attr('id', name);
    this.$wrapper = $('#section_wrapper');

    this.init_pages = function(pages){
        for (var i=0,l=pages.length; i<l; i++){
            var page = new Page(pages[i]);
            this.pages.push(page);
        }

        return true;
    };

    this.open_page = function(page_num){
        this.$element.html(this.pages[page_num].get_html());
        this.current_page = page_num;
    };
    this.next_page = function(){
        var next = this.current_page+1;
        if(next < this.pages.length){
            this.open_page(next);
            return true;
        }
        return false;
    };
    this.prev_page = function(){
        var prev = this.current_page-1;
        if(prev > -1){
            this.open_page(prev);
            return true;
        }
        return false;
    };

    this.show = function(){
        this.$wrapper.append(this.$element);
        this.open_page(this.current_page);
    };
    this.close = function(){
        this.$element.detach();
    };

    return this;
}
