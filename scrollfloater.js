/**
 * scrollfloater.js
 *
 * License: MIT (http://www.opensource.org/licenses/mit-license)
 * GitHub: https://github.com/HAKASHUN/scrollfloater
 * @author HAKASHUN
 */
(function($) {

  var counter = 0;

  var methods = {
    //Get element height.
    getElHeight : function(element) {
      var height = element.height();
      if(!height){
        throw new Error('element doesn\'t have a height' );
      }
      return height;
    },
    //Check Position Style.
    checkPositonStyle: function(element) {
      var posStyle = element.css('position');
      if(posStyle === 'fixed' ||
        posStyle === 'absolute') {
        throw new Error('bad position style (fixed OR absolute).' );
      }
    },
    //SetFixedStyle
    setFixedStyle: function(element, val, opt_top, opt_left) {
      var param;
      if(val) {
        param = {'position': 'fixed', 'top': opt_top, 'left' : opt_left,'margin-top': 0};
        element.addClass('fixed');
      } else {
        param = {'position': 'relative', 'top': '', 'left': '', 'margin-top': ''};
        element.removeClass('fixed');
      }
      element.css(param);
    }
  };

  $.fn.scrollFloater = function(userOptions) {

    // Default options
    var options = {
      top: 0,
      handleAddFixed: function(){},
      handleRemoveFixed: function(){}
    };

    $.extend(options, userOptions);

    if(counter){
      throw new Error('can not be used in two or more elements.');
    }
    counter++;
    var element = this;
    //Check Element
    if(!element.length){
      throw new Error('element not found');
    }
    //Check Positon Style Property.
    methods.checkPositonStyle(element);


    //Default Parent Element
    var defaultParentEl = element.parent();
    //要素の弟要素があるか調べる
    var elNextEl = element.next();

    //Target Element Position
    var elOffset = element.offset();
    var elTop = elOffset.top;
    var elLeft = elOffset.left;
    var elHeight = element.height();

    /** @type {String} ['relative' || 'fixed'] */
    var mode = 'relative';

    //Scroll Event
    $(window).scroll(function(e) {
      // Current Scroll Position
      var scrollTop = $(this).scrollTop();

      if(scrollTop > (elTop - options.top) && mode != 'fixed'){
        //relative => fixed
        mode = 'fixed';
        //append element to document.body
        $(document.body).append(element);
        //set position fixed style
        methods.setFixedStyle(element, true, options.top, elLeft);
        //set parentElement margin-top
        defaultParentEl.css({'paddingTop': elHeight + elTop});
        options.handleAddFixed(element);
      } else if (scrollTop <= (elTop - options.top) && mode != 'relative'){
        //fixed => relative
        mode = 'relative';
        //append element to defaultParentEl
        if(elNextEl.length){
          element.insertBefore(elNextEl);
        } else {
          defaultParentEl.append(element);
        }
        //remove position fixed style
        methods.setFixedStyle(element, false, options.top, elLeft);
        defaultParentEl.css({'paddingTop': ''});
        options.handleRemoveFixed(element);
      } else {
        //fixed => fixed OR relative => relative
        return;
      }
    });

    return this;

  };
})(jQuery);