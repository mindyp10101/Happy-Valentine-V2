const textConfig = {
  text1: "Happy Valentine, Viet version!!!",
  text2: "Round 2 nào!! Này nghiêm túc này!",
  text3: "Thế anh Mẫn thích Mindy không???",
  text4: "Nghiêm túc trả lời nha, không đùa! Thanh niên nghiêm túc của năm xem nào!",
  text5: "Ghét chứ thích gì nổi =]",
  text6: "Thích! Thích lắm luôn!",
  text7: "Ơ, thích Mindy à, sao nãy bảo khác cơ mà! Lạ nha! Thích thế nào nè?",
  text8: "Send your confession",
  text9: "Tại MP dễ thương nè, ngoan, hiểu chuyện, lại còn làm bác sĩ, oai ơi là oai!!",
  text10: "Nice~ Phải vậy chứ! Mindy 10 điểm không có nhưng! Best of the worst..., oops, best of the best LOL",
  text11: "P.S: Thank you for being my Valentine, honestly I'm happy spending time together, not needed for all the expensive dining LOL",
  text12: "Valentine vui vẻ!!",
};



function autoplayUnlock(element) {
    var context = new (window.AudioContext || window.webkitAudioContext)();

    return new Promise(function (resolve, reject) {
        if (context.state === 'suspended') {
            var unlock = function unlock() {
                context.resume()
                    .then(function () {
                        window.removeEventListener('keydown', unlock);
                        element.removeEventListener('click', unlock);
                        element.removeEventListener('touchstart', unlock);
                        element.removeEventListener('touchend', unlock);

                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
            };

            window.addEventListener('keydown', unlock, false);
            element.addEventListener('click', unlock, false);
            element.addEventListener('touchstart', unlock, false);
            element.addEventListener('touchend', unlock, false);
        } else {
            resolve();
        }
    });
}

var autoplayUnlockElement = document.getElementById('autoplay-unlock-overlay');
var audioElement = document.getElementById('audio-element');
var videoElement = document.getElementById('video-element');

autoplayUnlock(autoplayUnlockElement)
    .then(function() {
        document.body.removeChild(autoplayUnlockElement);
        audioElement.play();
        videoElement.play();        
    })
    .catch(function(error) {
        console.error(error);
    });

//Testing 1
$(document).ready(function () {
  // process bar
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 600);

  $("#text3").html(textConfig.text3);
  $("#text4").html(textConfig.text4);
  $("#no").html(textConfig.text5);
  $("#yes").html(textConfig.text6);

  
  function firstQuestion() {
    $(".content").hide();
    Swal.fire({
      title: textConfig.text1,
      text: textConfig.text2,
      imageUrl: "img/cuteCat.jpg",
      imageWidth: 300,
      imageHeight: 300,
      background: '#fff url("img/iput-bg.jpg")',
      imageAlt: "Custom image",
    }).then(function () {
      $(".content").show(200);
    });
  }

  // switch button position
  function switchButton() {
    var audio = new Audio("sound/duck.mp3");
    audio.play();
    var leftNo = $("#no").css("left");
    var topNO = $("#no").css("top");
    var leftY = $("#yes").css("left");
    var topY = $("#yes").css("top");
    $("#no").css("left", leftY);
    $("#no").css("top", topY);
    $("#yes").css("left", leftNo);
    $("#yes").css("top", topNO);
  }
  // move random button póition
  function moveButton() {
    var audio = new Audio("sound/Swish1.mp3");
    audio.play();
    if (screen.width <= 600) {
      var x = Math.random() * 300;
      var y = Math.random() * 500;
    } else {
      var x = Math.random() * 500;
      var y = Math.random() * 500;
    }
    var left = x + "px";
    var top = y + "px";
    $("#no").css("left", left);
    $("#no").css("top", top);
  }

  var n = 0;
  $("#no").mousemove(function () {
    if (n < 1) switchButton();
    if (n > 1) moveButton();
    n++;
  });
  $("#no").click(() => {
    if (screen.width >= 900) switchButton();
  });

  // generate text in input
  function textGenerate() {
    var n = "";
    var text = " " + textConfig.text9;
    var a = Array.from(text);
    var textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
    var count = textVal.length;
    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        n = n + a[i];
        if (i == text.length + 1) {
          $("#txtReason").val("");
          n = "";
          break;
        }
      }
    }
    $("#txtReason").val(n);
  }

  // show popup
  $("#yes").click(function () {
    var audio = new Audio("sound/tick.mp3");
    audio.play();
    Swal.fire({
      title: textConfig.text7,
      html: true,
      width: 900,
      padding: "3em",
      html: "<input type='text' class='form-control' id='txtReason'  placeholder='Whyyy'>",
      background: '#fff url("img/iput-bg.jpg")',
      backdrop: `
                    rgba(400,0,123,0.4)
                    url("img/inlove.gif")
                    left top
                    no-repeat
                  `,
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#fe8a71",
      cancelButtonColor: "#f6cd61",
      confirmButtonText: textConfig.text8,
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          width: 900,
          confirmButtonText: textConfig.text12,
          background: '#fff url("img/iput-bg.jpg")',
          backdrop: `
                    rgba(400,800,123,0.4)
                    url("img/inlove3.gif")
                    right top
                    no-repeat
                  `,
          title: textConfig.text10,
          text: textConfig.text11,
          confirmButtonColor: "#83d0c9",
          onClose: () => {
            window.location = "https://mindyp10101.github.io/Fun/";
          },
        });
      }
    });

    $("#txtReason").focus(function () {
      var handleWriteText = setInterval(function () {
        textGenerate();
      }, 10);
      $("#txtReason").blur(function () {
        clearInterval(handleWriteText);
      });
    });
  });
});

