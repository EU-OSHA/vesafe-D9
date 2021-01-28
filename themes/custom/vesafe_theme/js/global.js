/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  /**
   * Attaches the key article links.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.VesafeKeyArticle = {
    attach: function (context, settings) {

      var $id = window.location.hash;
      if ($id === 'undefined' || $id === '') {
        $id = '#introduction';
      }

      // Run the following functions to control the elements.
      hiddeElements($id);
      collapseMenuElements($id);
      changePreviusButton($id);
      changeNextButton($id);

      // Bind on hashchanged to control the element when the hash change.
      $(window).bind('hashchange', function (e){
        hiddeElements(window.location.hash);
        collapseMenuElements(window.location.hash);
        changePreviusButton(window.location.hash);
        changeNextButton(window.location.hash);
      });

      // Show the element passed and hide the rest.
      function hiddeElements(id) {
        $('.key-article-items > .key-article-item').hide();
        $('.key-article-items > ' + id).show();
      }

      // Show the menu acordion passed and collapse the rest.
      function collapseMenuElements(id) {
        var $element = $('.key-article-items > ' + id);
        var $section = $element.data('section');
        var $container = $('.key-articles-menu-container');
        $container.find('ul[id!="menu-' + $section + '"]').collapse('hide');
        $container.find('ul#menu-' + $section).collapse('show');
      }

      // Set the link and title of previus button.
      function changePreviusButton(id) {
        var $button = $('span.key-article-previous');
        if (id === '#' + Drupal.t('introduction')) {
          $button.hide();
        }
        else {
          var $links = $('a.key-articles-link');
          var $link_href = '';
          var $link_text = '';
          $links.each(function (i){
            if ($($links[i]).attr('href') === id) {
              $link_href = $($links[(i - 1)]).attr('href');
              $link_text = $($links[(i - 1)]).text();
            }
          });
          $button.html('<a href="' + $link_href + '">' + $link_text + '</a>');
          $button.show();
        }
      }

      // Set the link and title of next button.
      function changeNextButton(id) {
        var $links = $('a.key-articles-link');
        var $link_href = '';
        var $link_text = '';
        var $button = $('span.key-article-next');
        $links.each(function (i){
          if ($($links[i]).attr('href') === id) {
            $link_href = $($links[(i + 1)]).attr('href');
            $link_text = $($links[(i + 1)]).text();
          }
        });

        if ($link_text === 'undefined') {
          $button.hide();
        }
        else {
          $button.html('<a href="' + $link_href + '">' + $link_text + '</a>');
          $button.show();
        }
      }
    }
  };

})(jQuery, Drupal);
