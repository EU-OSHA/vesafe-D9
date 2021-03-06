/**
 * @file
 * Global utilities.
 *
 */


(function ($, Drupal) {


  Drupal.behaviors.VesafeGpSearch = {
    attach: function (context, settings) {
      $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
          return null;
        }
        return decodeURI(results[1]) || 0;
      }
      var $search = $.urlParam('search_api_fulltext');
      if (!Drupal.isEmpty($.urlParam('search_api_fulltext')) && $search !== 0) {
        $('.search-results-title').show();
        $('.search-results-title').parents('.lc-container-cols').addClass('success-results');
      }
    }
  };

  // Tooltip for the Gtranslate machine translation
  Drupal.behaviors.GTranslateTooltip = {
    attach: function (context, settings) {

      $('span[class*="gtranslate-machine-tooltip"]').tooltip({
        delay: {show: 0, hide: 1000}
      });

    }
  };

  Drupal.behaviors.VesafeGplinks = {
    attach: function (context, settings) {
      $('.field--name-field-media-gp-factsheet').find('a').once('gplinks').text(Drupal.t('Download factsheet'));
    }
  };

  // Toggle Menu
  $(".dropdown").each(function () {
    $(this).find('.dropdown-toggle').on('click', function () {
      let idRef = $(this).attr('id');
      let $toggleElement = $(this).closest(".dropdown");
      $toggleElement.stop().toggleClass('open');
      $toggleElement.find('[aria-labelledby="' + idRef + '"]').stop().slideToggle();

    });
  });
  $(window).on('resize', function(){
    let windowWidth=$(window).width();
    if(windowWidth>=992) {
      $(".dropdown").each(function(){
        $(this).find('ul').stop().show();
        $(this).addClass('open');
        if(!$(this).find('#dropdownMenuButton').hasClass('active')){
          $(this).find('#dropdownMenuButton').addClass('active');
        }
      });
    }
    else{
      $(".dropdown").each(function(){
        if($(this).hasClass('open')){
          if(!$(this).find('#dropdownMenuButton').hasClass('active')){
            $(this).find('#dropdownMenuButton').addClass('active');
          }
          $(this).find('ul').stop().show();
        }
      });

    }
  });




  // Aside menu
  $(".aside-column").each(function(){
    if($(this).find('.is-active')){
      let $activeElement=$(this).find('.is-active');
      $activeElement.closest('.facets-widget-links').toggleClass('open');
      $activeElement.closest('.facets-widget-links').find('ul').stop().slideDown(0);
    }
    $(this).find('h3').on('click', function(){
      let $dropdownElement=$(this).closest('.facets-widget-links');
      $dropdownElement.toggleClass('open')
      $dropdownElement.find('ul').stop().slideToggle();
    });

    $(this).find('h1').on('click', function(){
      $(this).stop().toggleClass('active');
      let $dropdownElement=$(this).closest('.aside-column');
      $dropdownElement.toggleClass('open')
      $dropdownElement.find('.lc-inline_column_first-content-edit').stop().slideToggle();
    });
  });
  $(window).on('resize', function(){
    let windowWidth=$(window).width();
    if(windowWidth>=992) {
      $(".aside-column").each(function(){
        $(this).find('.lc-inline_column_first-content-edit').stop().show();
        $(this).addClass('open');
        if(!$(this).find('h1').hasClass('active')){
          $(this).find('h1').addClass('active');
        }
      });
    }
    else{
      $(".aside-column").each(function(){
        if($(this).hasClass('open')){
          if(!$(this).find('h1').hasClass('active')){
            $(this).find('h1').addClass('active');
          }
          $(this).find('.lc-inline_column_first-content-edit').stop().show();
        }
      });

    }
  });


  // Sticky top menu
  $(window).on("scroll", function (e) {
    e.preventDefault();
    let $header = $('#header');
    let headerHeight = $header.outerHeight();
    let windowScroll = $(this).scrollTop();
    if (windowScroll > headerHeight) {
      if (!$header.hasClass("sticky-menu")) {
        $header.addClass("sticky-menu");
        $('#main-wrapper').css({'margin-top':headerHeight});
      }
    } else {
      $header.removeClass("sticky-menu");
      $('#main-wrapper').css({'margin-top':'0'});
    }
  });


  // Header tooltip

  $('.header').on('mouseenter','.gtranslate-machine-tooltip',function(){
    $(this).closest('.block-simple-blockgtranslate-machine-tooltip').find('.content').find('p:last-child').removeClass('hidden');
  });

  $('.header').on('mouseleave','.block-simple-blockgtranslate-machine-tooltip .content p:last-child',function(){
    $(this).addClass('hidden');
  });


  // Pager index
    $('.pagination').each(function () {
      let itemLength = $(this).find('.page-item').length;
      let lastItemIndex=itemLength - 1;
      $(this).find('.page-item').eq(lastItemIndex).addClass('last');
    });

  // Scroll to top
  $("#scroll-top").on("click", function (e) {
    e.preventDefault();
    $("html, body").stop().animate({"scrollTop": "0px"}, 200);
  });

  //  Display Show More Links
  $('.field--name-field-additional-resources').each(function(){
    let listItemsLength = $(this).find('.field__item').length;
    if(listItemsLength>=4){
      $(this).addClass('show-more-links')
    }

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
          var $items = $view.find('div.field__item');
          if ($items.length > 4) {
            if ($(this).hasClass('additional-resources-link-less')) {
              // Hide the elements.
              hideItems($view);
              $(this).text(Drupal.t('See more links')).removeClass('additional-resources-link-less').addClass('additional-resources-link-more')
            } else {
              // Show the elements.
              showItems($view);
              $(this).text(Drupal.t('See fewer links')).removeClass('additional-resources-link-more').addClass('additional-resources-link-less')
            }
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
      $(window).bind('hashchange', function (e) {
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
        $('a.key-articles-link[href="' + id + '"]').addClass('item-active');
      }

      // Set the link and title of previus button.
      function changePreviusButton(id) {
        var $button = $('span.key-article-previous');
        if (id === '#' + Drupal.t('introduction')) {
          $button.hide();
        } else {
          var $links = $('a.key-articles-link');
          var $link_href = '';
          var $link_text = '';
          $links.each(function (i) {
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
        $links.each(function (i) {
          if ($($links[i]).attr('href') === id) {
            $link_href = $($links[(i + 1)]).attr('href');
            $link_text = $($links[(i + 1)]).text();
          }
        });

        if (typeof $link_href === 'undefined') {
          $button.hide();
        } else {
          $button.html('<a href="' + $link_href + '">' + $link_text + '</a>');
          $button.show();
        }
      }
    }
  };


})(jQuery, Drupal);

