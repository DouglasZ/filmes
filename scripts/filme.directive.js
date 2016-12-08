angular.module("filmes").directive("awFilme", function () {
  return {
    restrict: "A",
    scope: {
      filme: '=awFilme',
      fnFechar: '&',
      fnEditar: '&'
    },
    templateUrl: "templates/filme.template.html",
    link: function (scope, element, attr) {
      element.addClass('filme com-cartaz');

      if (!attr.fnFechar) {
        element.find('button.del')[0].remove();
      }
      if (!attr.fnEditar) {
          element.find('button')[1].remove();
      }
    },
    controller: function($scope){

        $scope.hover = function() {
            this.showButtons = true;
        };

        $scope.leave = function() {
            this.showButtons = false;
        };
    }
  };
});