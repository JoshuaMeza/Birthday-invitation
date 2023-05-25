var dialogs = [
	{
		index: 0,
		content: "¡Te invito a festejar el cumpleaños de mi mejor amigo! 🎊",
		costume: 1,
	},
	{
		index: 1,
		content: "¡Jorgito Meza! ✨",
		costume: 2,
	},
	{
		index: 2,
		content: "Va a cumplir 10 años y lo vamos a celebrar en grande 🎂",
		costume: 1,
	},
	{
		index: 3,
		content: "La fiesta va a ser el día 27 de Mayo a las 12:30 pm 🎈",
		costume: 1,
	},
	{
		index: 4,
		content: "La dirección es calle 12 #216 x 37 y 39 San Juan Grande 📍",
		costume: 1,
	},
	{
		index: 5,
		content: "Tendremos baño de piscina, así que no olvides traer tu traje 🏄‍♂️",
		costume: 2,
	},
	{
		index: 6,
		content: "Igualmente, recuerda traer tus tapitas para que apoyemos a los niños con cáncer 😊",
		costume: 1,
	},
	{
		index: 7,
		content: "¡Y sobre todo no faltes! Te esperamos 🎉",
		costume: 2,
	},
];
var nextIndex = 0;
var musicPlaying = false;

var showText = function (target, message, index, interval, enableButton) {
	if (index < message.length) {
		$(target).append(message[index++]);
		setTimeout(function () {
			showText(target, message, index, interval, enableButton);
		}, interval);
	} else {
		if (enableButton) {
			$("#dialog-btn").prop("disabled", false);
		} else {
			$("#dialog-btn").html("¡A celebrar!");
			startConfetti();
		}
	}
};

var isLast = function () {
	return nextIndex == dialogs.length;
};

var resetCostumes = function () {
	var stitch = $("#stitch-character");
	stitch.removeClass("stitch-costume-1");
	stitch.removeClass("stitch-costume-2");
};

$(window).on("load", function () {
	$("#loader").hide();

	// Allow Stitch animation
	var stitch = $("#stitch-character");
	stitch.addClass("can-jump");

	// Button listener
	var dialogButton = $("#dialog-btn");
	dialogButton.prop("disabled", false);
	dialogButton.click(function (event) {
		event.preventDefault();

		nextDialog = dialogs.find((dialog) => dialog.index == nextIndex);
		if (nextDialog != null) {
			nextIndex++;

			// Stitch
			resetCostumes();
			stitch.addClass("stitch-costume-" + nextDialog.costume);
			stitch.addClass("jump");
			setTimeout(function () {
				stitch.removeClass("jump");
			}, 100);

			// Text
			dialogButton.prop("disabled", true);
			$("#dialog-content").html("");
			showText("#dialog-content", nextDialog.content, 0, 40, !isLast());
		}
	});

	// Music
	var musicButton = $("#music-button");
	var song = $("#song")[0];
	musicButton.click(function (event) {
		event.preventDefault();

		if (musicPlaying) {
			musicButton.children("i").removeClass("fa-beat-fade");
			song.pause();
		} else {
			musicButton.children("i").addClass("fa-beat-fade");
			song.play();
		}

		musicPlaying = !musicPlaying;
	});
});
