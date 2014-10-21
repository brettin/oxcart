/*
 * App Runner directives
 *  - narrativeCell : extends functionality of a cell 
 *  - kbWidget : wrapper for kbase jquery output widgets
 *  - ddSelector : searchable angular, bootstrapifyed dropdown used 
 *                 for selectors
 *
 * Controllers:  (See Analysis in js/controllers.js)
 *
 *
 * Authors:
 *  Neal Conrad <nealconrad@gmail.com>
 *
*/


angular.module('directives', [])

.directive('appCell', function(appUI) {
    return {
        link: function(scope, ele, attrs) {

            // dictionary for fields in form.  Here, keys are the ui_name 
            scope.fields = {};  

            scope.flip = function($event) {
                $($event.target).parents('.panel').find('.narrative-cell').toggleClass('flipped')
            }

            scope.minimize = function($event) {
                $($event.target).parents('.panel').find('.panel-body').slideToggle('fast');
            }

            scope.runCell = function(index, cell) {
                var task = {name: cell.title, fields: scope.fields};
                appUI.newTask(task);
            }


        }
    }
})

.directive('showData', function() {
    return {
        link: function(scope, ele, attrs) {

        }
    }
})

.directive('kbWidget', function() {
    return {
        link: function(scope, element, attrs) {
            // instantiation of a kbase widget
        }
    }
})

.directive('animateOnChange', function($animate) {
  return {
      link: function(scope, elem, attr) {
          scope.$watch(attr.animateOnChange, function(nv,ov) {
            if (nv!=ov) {
              var c = nv > ov ? 'change-up' : 'change';
              elem.addClass(c).removeClass(c, {duration: 1000})
            }
          });    

        }
   };
})


/* Author:
 *  Neal Conrad <nealconrad@gmail.com>
 */
.directive('ddSelector', function() {
    return {
        templateUrl: 'app/partials/dd-selector.html',
        link: function(scope, element, attrs) {
            // model for input
            scope.ddModel = attrs.ddModel;

            // if there is a default for the text box, use it
            if (attrs.ddDefault) {
                scope.ddSelected = attrs.ddDefault;
            }

            // model to watch is the attr 'dd-data'
            scope.$watch(attrs.ddData, function(value) {
                scope.items = value;
            })

            scope.selectedIndex = -1;
            scope.ddSelect = function($index, item) {
                scope.selectedIndex = $index;
                scope.ddSelected = item.name;
            }
            
            // need to make work for state resets
            scope.openDDSelector = function() {
                $(element).find('.input-group-btn').addClass('open');
                $(element).find('.dd-selector' ).focus();
            }
        }
    }
})

.directive('kbUpload', function($location, $rootScope) {
    return {
        link: function(scope, element, attrs) {

            SHOCK.init({ token: $rootScope.token, url: scope.shockURL })

            var url = "http://140.221.67.190:7078/node" ;

            /*
            var prom = SHOCK.get_all_nodes(function(data) {
                console.log('shock data!', data)
            })*/
            
            var prom = SHOCK.get_all_nodes();
            $.when(prom).done(function(data){
                scope.$apply(function(){
                    scope.uploads = data;
                })
            })

        }
    }
})

.directive('sidebarCollapse', function() {
    return {
        link: function(scope, element, attr) {
            var original_w = 250;
            var new_w = 56;

            var collapsed = false;

            element.click(function() {

                if ( !collapsed ){
                    element.find('.fa-caret-left').fadeOut(function() {
                        $(this).remove();
                    });
                    var caret = $('<span class="fa fa-caret-right">').hide().fadeIn();
                    element.append(' ', caret);

                    // animation for 
                    $('.sidebar-nav, .sidebar').hide('slide', {
                            direction: 'left'
                        }, 350, function() {
                            $('.sidebar').show();
                            $('.sidebar').css('width', new_w)
                        });   

                    // animation for margin of page view
                    $('#page-wrapper').animate({
                            marginLeft: new_w,
                        }, 400, function() {
                            $('.sidebar-nav-small').fadeIn('fast');
                            collapsed = true
                        });
                   
                } else {
                    element.find('.fa-caret-right').fadeOut(function() {
                        $(this).remove();
                    });
                    var caret = $('<span class="fa fa-caret-left">').hide().fadeIn()
                    element.prepend(caret, ' ')

                    $('.sidebar-nav-small').fadeOut('fast');
                    
                    $('#page-wrapper').animate({
                            marginLeft: original_w,
                        }, 300, function() {
                            $('.sidebar').css('width', original_w)
                            $('.sidebar-nav').fadeIn('fast')
                            collapsed = false
                        }); 
                }
                 
                
            })

        }
    }
})

