    let $ctx = $('body');
    let $marks = $();
    let currentIndex = 0;

    function updateCount() {
      const total = $marks.length;
      const current = total ? currentIndex + 1 : 0;
      $('#matchCount').text(`${current} / ${total}`);
    }

    function scrollToCurrent() {
      if (!$marks.length) return;
      $marks.removeClass('active');
      const $cur = $marks.eq(currentIndex).addClass('active');
      $cur[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    $('#searchBox').on('input', function() {
      const query = $(this).val().trim();
      // Remove previous
        $ctx.unmark({
        done: () => {
          if (!query) {
            $marks = $();
            currentIndex = 0;
            updateCount();
            return;
          }
          // Mark exact phrase (separateWordSearch: false)
          $ctx.mark(query, {
              separateWordSearch: false,
          exclude: ['.search-container', '.no-search'],
            done: () => {
                $marks = $('mark');
              currentIndex = 0;
              scrollToCurrent();
              updateCount();
            }
          });
        }
      });
    });

    $('#nextMatch').on('click', function() {
      if (!$marks.length) return;
      currentIndex = (currentIndex + 1) % $marks.length;
      scrollToCurrent();
      updateCount();
    });

    $('#prevMatch').on('click', function() {
      if (!$marks.length) return;
      currentIndex = (currentIndex - 1 + $marks.length) % $marks.length;
      scrollToCurrent();
      updateCount();
    });
