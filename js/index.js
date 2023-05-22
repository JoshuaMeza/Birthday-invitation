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
		content: "La fiesta va a ser el día 25 de Mayo en la escuela 🎈",
		costume: 1,
	},
	{
		index: 4,
		content: "No hace falta que traigas tu lunch, de eso yo me encargo 😄",
		costume: 2,
	},
	{
		index: 5,
		content: "También, no olvides traer tus tapitas para que apoyemos a los niños con cáncer 😊",
		costume: 1,
	},
	{
		index: 6,
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
