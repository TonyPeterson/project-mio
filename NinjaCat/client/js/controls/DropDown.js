(function() {

    var defaults = {
        labelText: null,
        items: [],
        selectedIndex: null,
        onSelectionChanged: null,
        placeholderText: '',
        dropDirection: 'down' // or 'up'
    };

    function DropDown($el, options) {

        this.op = _.merge({}, defaults, options);

        this.$el = $el;        

        this.setLabel(this.op.labelText);

        this.$el.addClass('px-dropdown');
        this.$value = $('<div/>').addClass('px-dropdown-value').appendTo(this.$el);
        this.$overlay = $('<div/>').addClass('px-dropdown-overlay').hide().appendTo($('body'));

        this.items = [];
        this.setItems(this.op.items);

        this.selectedIndex = null;
        this.selectByIndex(this.op.selectedIndex);

        this.$el.on('click', $.proxy(this.onClick, this));
        this.$overlay.on('click', $.proxy(this.hideList, this));
    }

    
    DropDown.prototype.onClick = function() {
        if (this.listOpen) {
            this.hideList();
        }
        else {
            this.showList();
        }        
    };

    
    DropDown.prototype.onClickItem = function(e) {
        var index = $(e.currentTarget).index();
        this.selectByIndex(index);
        this.hideList();          
    };

    
    DropDown.prototype.showList = function() {
        
        this.listOpen = true;

        var bounds = this.$el[0].getBoundingClientRect();

        var top = bounds.bottom;

        if (this.op.dropDirection === 'up') {
            top = bounds.top - this.listSize.height;            
        }
        
        this.$list.css({
            top: top,
            left: bounds.left
        }).show();

        this.$overlay.show();

    };

    
    DropDown.prototype.hideList = function() {
        this.listOpen = false;
        this.$overlay.hide();
    };

    
    DropDown.prototype.setItems = function(newItems) {

        this.items = newItems;
        this.hasItems = this.items && Array.isArray(this.items) && this.items.length > 0;

        if (this.$list) {
            this.$list.remove();
            this.selectByIndex(-1);
        }

        this.$list = $('<ul />').addClass('px-dropdown-list');

        $.each(this.items, $.proxy(function(idx, item) {
            $('<li/>').text(item)
                .on('click', $.proxy(this.onClickItem, this))
                .appendTo(this.$list);
        }, this));

        this.$list.css('opacity', 0).appendTo($('body'));

        this.listSize = {
            width: this.$list.width(),
            height: this.$list.height()
        };

        this.$list.css('opacity', '').hide().appendTo(this.$overlay);
    };

    
    DropDown.prototype.setLabel = function(label) {
        if (label) {
            this.$label = $('<div/>').text(label).addClass('px-dropdown-label').appendTo(this.$el);
        }
    };

    
    DropDown.prototype.selectByIndex = function(index) {
        
        var newIndex = !this.hasItems || isNaN(index) || index < 0 ? -1 : 
            Math.min(this.items.length, index);

        if (newIndex !== this.selectedIndex) {
            
            var oldIndex = this.selectedIndex;
            this.selectedIndex = newIndex;
            
            this.selectedValue = newIndex === -1 ? '' : this.items[this.selectedIndex];

            if (this.selectedValue) {
                this.$value.removeClass('px-placeholder').text(this.selectedValue);
            } 
            else {
                this.$value.addClass('px-placeholder').text(this.op.placeholderText);
            }

            if (this.op.onSelectionChanged) {
                this.op.onSelectionChanged(newIndex, oldIndex, this);
            }
        }
    };

    app.controls.DropDown = DropDown;

})();