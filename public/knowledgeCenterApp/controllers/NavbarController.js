// Template: navbar.html
// showing all the categories in the nav bar dynamically.
(function () {
    'use strict';

    angular
        .module('KnowledgeCenter')
        .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['$state', 'APIService'];

    /* @ngInject */
    function NavbarCtrl($state, APIService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'navbar';
        vm.homeUrl = '/';
        vm.currentActive = -1;

        activate();

        ////////////////

        function activate() {
            APIService.getAllCategories(function(categories) {
                vm.dbCategories = categories
            })
            APIService.getAllTags(function(tags) {
                vm.dbTags = tags
            })
            APIService.getAllImages(function(images) {
                vm.dbImages = images
            })
            vm.search = {
                category: "",
                tag: "",
                text: "",
            }
            vm.setActive = setActivate;
            vm.checkActive = checkActive;
            vm.submitSearch = submitSearch
        }

        function setActivate($index){
            vm.currentActive = $index
            var navBtn = $('#nav-collapse')[0]
            if(navBtn.attributes.valueOf()[5].value == 'true') {
                navBtn.click()
            }
        }

        function checkActive($index){
            return  (vm.currentActive == $index)
        }

        function submitSearch() {
            APIService.search(vm.search, function(posts) {
                $state.go('posts', {category: 'Search', posts: posts})
            })
        }
    }
})();