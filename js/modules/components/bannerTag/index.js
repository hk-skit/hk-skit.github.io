(function(){
  'use strict';
  var app = angular.module('codiary.bannerTag', []); 
  
  app.factory('TagChar', function(){
    function TagChar(character, isFirst){
     this.character = character;
     this.isFirst = isFirst;
    }
    return TagChar;
  });
  
  app.directive('bannerTag', ['$compile', '$$rAF', '$timeout', 'TagChar', bannerTag]);
  
  app.controller('BannerTagController', [BannerTagController]);
  
  function bannerTag($compile, $$rAF, $timeout, TagChar){
    var tagBannerColor = 'tag__banner__color';
    var tagBannerFirstLetter = 'tag__banner__firstLetter';
    
    function createClass(color){
      var style = document.createElement('style');
      color = color || 'tomato';
      style.type = 'text/css';
      style.innerHTML = '.' + tagBannerColor + ' { color: '+ color +' } ';
      style.innerHTML += '.' + tagBannerFirstLetter + ' { font-size: 1.7em; }';
      document.getElementsByTagName('head')[0].appendChild(style);
    }
    
    function linkFn(scope, element, attrs, vm){
      var text = element.text();
      var chars = text.split('');
      chars = chars.map(function(char, index){
        var isFirst = chars[index - 1] === undefined || chars[index - 1] === ' ';
        return new TagChar(char, isFirst);
      });
      createClass(attrs.bannerTag);
      var html = chars.reduce(function(html, tagChar, index){
        html += '<span ';
        html += 'ng-class="{ ';
        html += '\'' + tagBannerColor + '\': vm.active === '+ index +',';
        html += '\'' + tagBannerFirstLetter + '\': ' + tagChar.isFirst;
        html += ' }">';
        html += tagChar.character;
        html += '</span>';
        return html;
      }, '');
      element.html(html);
      $compile(element.contents())(scope);
      
      var timeoutId;
      function frame(){
        timeoutId = $timeout(function(){
          vm.active += 1;
          if(vm.active === chars.length){
            vm.active = 0;
          }
          $$rAF(frame);
        }, 200);
      }
      $$rAF(frame);
      scope.$on('$destroy', function(){
        //element destroy let's cancel timeout;
        $timeout.cancel(timeoutId);
      });
    }
    
    //Our dearest DDO
    return {
      restrict: 'A',
      link : linkFn,
      controllerAs: 'vm',
      controller: 'BannerTagController'
    };
  }
  function BannerTagController(){
    var vm = this;
    vm.active = 0;
  }
}());