/**
 * @file
 * Global utilities.
 *
 */


(function ($, Drupal) {


  Drupal.behaviors.VesafeGpSearch = {
    attach: function (context, settings) {
      $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
          return null;
        }
        return decodeURI(results[1]) || 0;
      }
      var $search = $.urlParam('search_api_fulltext');
      if (!Drupal.isEmpty($.urlParam('search_api_fulltext')) && $search !== 0) {
        $('.search-results-title').show();
      }
    }
  };

  Drupal.behaviors.VesafeGplinks = {
    attach: function (context, settings) {
      $('.field--name-field-media-gp-factsheet').find('a').once('gplinks').text(Drupal.t('Download factsheet'));
    }
  };

  // Toggle Menu
  $(".dropdown").each(function(){
    $(this).find('.dropdown-toggle').on('click', function(){
      let idRef=$(this).attr('id');
      let $toggleElement=$(this).closest(".dropdown");
      $toggleElement.stop().toggleClass('open');
      $toggleElement.find('[aria-labelledby="'+idRef+'"]').stop().slideToggle();
    });
  });

  // Scroll to top
  $("#scroll-top").on("click", function(e) {
    e.preventDefault();
    $("html, body").stop().animate({"scrollTop": "0px"}, 200);
  });

  'use strict';

  /**
   * Attaches the key article links.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.VesafeAdditionalResources = {
    attach: function (context, settings) {
      var $view = $('div.field.field--name-field-additional-resources')

      // Run the function if the view exists.
      if ($view !== 'undefined' && $view !== '' && $view.length !== 0) {
        // Include the button
        $view.once('more-link').append($('<a href="#" class="additional-resources-link-more">' + Drupal.t("See more links") + '</a>').on('click', function (e) {
          e.preventDefault();
          if ($(this).hasClass('additional-resources-link-less')) {
            // Hide the elements.
            hideItems($view);
            $(this).text(Drupal.t('See more links')).removeClass('additional-resources-link-less').addClass('additional-resources-link-more')
          }
          else {
            // Show the elements.
            showItems($view);
            $(this).text(Drupal.t('See fewer links')).removeClass('additional-resources-link-more').addClass('additional-resources-link-less')
          }
        }));

        // Hide the elements by default.
        hideItems($view);
      }

      // Function to hide the view elements, by default only will be shown 4.
      function hideItems(view) {
        var $items = view.find('div.field__item');
        $items.each(function (i) {
          if (i > 3) {
            $($items[i]).hide();
          }
        });
      }

      // Function to show the view elements.
      function showItems(view) {
        var $items = view.find('div.field__item');
        $items.each(function (i) {
          $($items[i]).show();
        });
      }
    }
  };

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
        $('a.key-articles-link').removeClass('item-active');
        $('a.key-articles-link[href="' + id +'"]').addClass('item-active');
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

        if (typeof $link_href === 'undefined') {
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

