(function(){
  angular
  .module('filmes')
  .controller('FilmesController', function($scope, MeusFilmes) {
    $scope.titulo = "Filmes";

    $scope.filmes = [];
    $scope.showLoading = true;

    var carregarFilmes = function(){
      MeusFilmes.listar().then(function(filmes){
        $scope.filmes = filmes;
        $scope.showLoading = false;
      });
    };

    $scope.novoFilme = {};

    $scope.resetForm = function() {
      $scope.formulario.$setPristine();
      $scope.formulario.$setUntouched();
    };

    $scope.criarFilme = function() {
      $scope.formulario.$setDirty();

      if($scope.formulario.$invalid)
        return;

      var filme = {
        id        : Date.now() + "",
        titulo    : $scope.novoFilme.titulo,
        ano       : $scope.novoFilme.ano,
        produtora : $scope.novoFilme.produtora,
        prioridade: $scope.novoFilme.prioridade,
        sinopse   : $scope.novoFilme.sinopse,
        cartaz    : $scope.novoFilme.cartaz
      };

      MeusFilmes.inserir(filme).then(carregarFilmes);

      $scope.novoFilme = {};
    };

    $scope.removerFilme = function(id) {
      MeusFilmes.remover(id).then(carregarFilmes);
    };

    $scope.buscarFilme = function(filme) {
         $scope.novoFilme.id        = filme.id;
         $scope.novoFilme.titulo    = filme.titulo;
         $scope.novoFilme.ano       = filme.ano;
         $scope.novoFilme.produtora = filme.produtora;
         $scope.novoFilme.prioridade= filme.prioridade;
         $scope.novoFilme.sinopse   = filme.sinopse;
         $scope.novoFilme.cartaz  = filme.cartaz;

        toBottom();
    };

    $scope.carregaFilme = function(filme) {

    };

    $scope.editarFilme = function(filme) {

      MeusFilmes.editar(filme).then(carregarFilmes);
      $scope.novoFilme = {};
      toTop();
    };

    carregarFilmes();

    function toBottom() {
        $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, "slow");
    }
    function toTop() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }

  });
})();