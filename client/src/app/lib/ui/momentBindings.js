function initializeMoment() {
  if(window.Moment) {
    let minimalTime = Moment().subtract(5, 'days');
    $(".moment").each(function(index) {
      let absoluteDate = $(this).data("datetime")
                      || $(this).attr("datetime")
                      || $(this).attr("alt")
                      || false;
      if(absoluteDate && absoluteDate !== "" && absoluteDate !== false) {
        let date = Moment(absoluteDate);
        if(date.isSameOrAfter(minimalTime)) {
          $(this).html(date.fromNow());
        } else {
          $(this).html(date.format('D MMMM Y'));
        }
        $(this).addClass("momentized");
      }
    });
  }
}

module.exports = initializeMoment;
