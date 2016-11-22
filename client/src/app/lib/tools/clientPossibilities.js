module.exports = function() {

  let possibilities = {
    legacy: true,
    flexbox: false,
    json: false,
    localStorage: false
  }

  let detectPossibilities = function() {

  };

  if(window && window.localStorage && JSON) {
    possibilities.json = true;
    possibilities.localStorage = true;

    let savedPossibilities = localStorage.getItem("possibilites");
    let savedPossibilitiesUpdatedAt = localStorage.getItem("possibilitesTimestamp");
    let savedPossibilitiesIsUpToDate = false;
    let savedPossibilitiesLifetime = 3600 * 24 * 3 * 1000;

    if(savedPossibilities && savedPossibilitiesUpdatedAt) {

      let savedPossibilitiesUpdatedAt = parseInt(savedPossibilitiesUpdatedAt);
      if(!isNaN(savedPossibilitiesUpdatedAt)) {
        if((Date.now() - savedPossibilitiesUpdatedAt) < savedPossibilitiesLifetime) {
          savedPossibilitiesIsUpToDate = true;
        }
      }

      if(savedPossibilitiesIsUpToDate === true) {

        let savedPossibilities = JSON.parse(savedPossibilities);

        if(savedPossibilities) {
          for(let curr in savedPossibilities) {
            if(possibilites[curr]) {
              possibilities[curr] = savedPossibilities[curr];
            }
          }
        }
      }
    }
  }

  return possibilities;

}
