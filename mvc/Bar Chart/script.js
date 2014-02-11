(function() {
  //Extending Array Object
  Array.prototype.max = function() {
    return Math.max.apply(Math, this);
  };

  Array.prototype.min = function() {
    return Math.min.apply(Math, this);
  };

  Array.prototype.shuffle = function() {
    this.sort(function() {
      return 0.5 - Math.random();
    });
  };
}());
(function() {
  'use strict';
  var model = {},
    view = {},
    controller = {},
    utilities = {};
  utilities.get_random_color = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  };
  view.displayArea = document.querySelector('#display'),
  view.ascend = document.querySelector('#ascend'),
  view.descend = document.querySelector('#descend');
  view.shuffle = document.querySelector('#shuffle');
  view.chartArea = document.querySelector('#chart');

  model.numbers = [12, 56, 78, 8, 9];
  controller.shuffleNumbers = function() {
    model.numbers.shuffle();
    view.displayArea.value = model.numbers.join(', ');
  };
  controller.ascendNumbers = function() {
    model.numbers.sort(function(a, b) {
      return a - b;
    });
    view.displayArea.value = model.numbers.join(', ');
  };
  controller.descendNumbers = function() {
    model.numbers.sort(function(a, b) {
      return a - b;
    });
    model.numbers.reverse();
    view.displayArea.value = model.numbers.join(', ');
  };
  controller.updateChart = function() {
    var chartArea = $(view.chartArea),
      chartHeight = chartArea.height(),
      chartWidth = chartArea.width(),
      chartLeftGutter = 10,
      numColumns = model.numbers.length,
      numbers = model.numbers,
      colWidth,
      colMeanHeight = 10,
      colGuttur = 2,
      colStyle,
      i;
    chartArea.html('');
    colWidth = (chartWidth - ((colGuttur * numColumns))) / numColumns;

    colMeanHeight = ((chartHeight - 10) / numbers.max());
    for (i = 0; i < numColumns; i++) {
      colStyle = {
        bottom: '5px',
        left: i * (colWidth + colGuttur),
        width: colWidth,
        height: (colMeanHeight * numbers[i]) + 'px',
        backgroundColor: utilities.get_random_color()
      };
      $('<div class="col"><span class="value">' + numbers[i] + '</span></div>').css(colStyle).appendTo(chartArea);
    }

  };

  function init() {
    //Attach events
    view.ascend.onclick = function() {
      controller.ascendNumbers();
      controller.updateChart();
    };
    view.descend.onclick = function() {
      controller.descendNumbers();
      controller.updateChart();
    };
    view.shuffle.onclick = function() {
      controller.shuffleNumbers();
      controller.updateChart();
    };
    view.shuffle.click();
  }
  init();

}());