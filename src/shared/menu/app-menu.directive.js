angular.module('mainApp').directive('appMenu', function ($timeout) {
	return {
		restrict: 'E',
		scope: {
			menuItems: '=',
			noBuffer: '='
		},
		templateUrl: 'shared/menu/app-menu.html',
		link: function (scope, elem, attr) {

			var menu = elem[0].children[0],
				WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

			function toggleHorizontal () {
				[].forEach.call(
					menu.querySelectorAll('.app-menu-transform'),
					function (el) {
						el.classList.toggle('pure-menu-horizontal');
					}
				);
				[].forEach.call(
					menu.querySelectorAll('.app-menu-item'),
					function (el) {
						el.classList.toggle('open');
					}
				);
			}

			function toggleMenu () {
				if (menu.classList.contains('open')) {
					$timeout(toggleHorizontal, 500);
				}
				else {
					toggleHorizontal();
				}
				menu.classList.toggle('open');
				document.getElementById('app-menu-toggle').classList.toggle('x');
			}

			function closeMenu () {
				if (menu.classList.contains('open')) {
					toggleMenu();
				}
			}

			document.getElementById('app-menu-toggle').addEventListener('click', function (e) {
				toggleMenu();
			});

			window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
		}
	};
});
