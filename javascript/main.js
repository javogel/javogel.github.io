
var words = ["Humanity", "Art", "Engineering", "Technology", "Poetry", "Curiosity", "Discovery", "Service"];


$( document ).ready(function() {
  var word1 = $( "#word1" );
  var word2 = $( "#word2" );

    setInterval(function(){
        newWordBatch(word1, word2)

     }, 2500);
});

function newWordBatch(word1, word2){
  var words_array = words;
  var new_word1 = new_word2 = words[Math.floor(Math.random()*words.length)];
  while(new_word1 == new_word2){
    new_word2 = words_array[Math.floor(Math.random()*words_array.length)];
  };
  changeWord(word1, new_word1);
  changeWord(word2, new_word2);
}

function changeWord(w, nw){
  w.fadeOut( "slow", function() {
    w.text(nw);
    w.fadeIn( "slow", function() {
      });
  });
}
