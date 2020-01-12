import Model from './Model';
import Controller from './Controller';
import View from './View';

(function($) {
  'use strict';

  $.fn.range = function(options) {
    const _this = this;
    const model = new Model();
    const view = new View();
    const settings = $.extend(model, options);
    const controller = new Controller(model, view);

    controller.init(_this);

    return _this;
  };
})(jQuery);
