gsap.registerPlugin("ScrollTrigger");

function togglePageHide() {
	for (let index = 0; index < 3; index++) {
		let elem = document.querySelector(`section[data-page='${index + 1}'`);
		elem.classList.toggle("hidden");
	}
}
function mainTimeline(tl) {
	tl.to("[data-page='4']", { yPercent: -50 });
	tl.to("[data-page='3']", { xPercent: -100 });
	tl.to("#upperTextPre", { filter: "blur(40pt)" }, "<");
	tl.to("#upperTextPost", { filter: "blur(0pt)", opacity: 2 }, "<");
	tl.to("[data-page='4']", { yPercent: -100 });
	tl.to("#textBox h1", {
		filter: "blur(100pt)",
		opacity: 0,
	});

	tl.to("[data-page='4']", { "--bg-opacity": 1, onComplete: addHover }, "<");
}

function finalPage(tl) {
	tl.to(
		".month-page *",
		{
			opacity: 0,
		},
		"<"
	);
	tl.to("section[data-page='1']", {
		opacity: 1,
		scale: 1,
	});
	tl.to(
		".image-container",
		{
			opacity: 0,
			width: "50%",
			onComplete: function () {
				document.body.style.cursor = "unset";
				document.querySelector(
					"section[data-page='1']"
				).style.pointerEvents = "unset";
			},
		},
		"<"
	);
	tl.to("section[data-page='1'] img", {
		left: 0,
		xPercent: 0,
	});
	tl.to(
		".button-container",
		{
			opacity: 1,
			yPercent: -150,
			x: 0,
		},
		"<"
	);
	[2, 3, 10].forEach((e) => {
		tl.to(
			`[data-page='${e}']`,
			{
				opacity: 0,
			},
			"<"
		);
	});
}
function getVideos() {
	gapi.client.youtube.playlistItems
		.list({
			part: ["contentDetails", "snippet"],
			playlistId: "PL694N0YyDpbu_RWWN5GEZHeE0LwHcZWpg",
			maxResults: 15,
		})
		.then(function (response) {
			let content = response.result;
			let i = 1;
			content.items.forEach((videoInfo) => {
				let player = new YT.Player("player" + i, {
					height: "360",
					width: "640",
					videoId: videoInfo.contentDetails.videoId,
					playerVars: {
						autoplay: 1, // Auto-play the video on load
						controls: 1, // Show pause/play buttons in player
					},
					events: {
						onReady: function (e) {
							e.target.playVideo();
							e.target.seekTo(0);
							e.target.playVideo();
							e.target.setVolume(0);
						},
						onStateChange: function (e) {
							if (
								e.data == 1 &&
								Object.entries(players).length == 12 &&
								!playerUpdated
							) {
								mainTL.add(mainTimeline(mainTL));
								gsap.to("#loadButton span", {
									xPercent: 0,
									opacity: 1,
									duration: 0.3,
									delay: 2,
								});
								mainTL.add(monthAnimations(mainTL));
								mainTL.add(imageSlide(mainTL));
								mainTL.add(finalPage(mainTL));

								playerUpdated = true;
								window.scrollTo(0, 0);
							}
						},
					},
				});
				players[`player${i}`] = player;

				i++;
			});
		});
}

function loadClient() {
	gapi.client.setApiKey(key);
	return gapi.client.load(
		"https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
	);
}
let players = {};
let playerUpdated = false;
const key = "AIzaSyDj-jWbR9jnqRlLxOIGTfNeZom0FeqwSBY";
const mainTL = gsap.timeline({
	defaults: {
		duration: 10,
		ease: "power3.inOut",
	},
	scrollTrigger: {
		trigger: ".scroll-elem",
		start: "top top",
		end: "+=4000",
		scrub: 1,
		pin: true,
	},
});

window.scrollTo(0, 0);
gapi.load("client:auth2");
window.addEventListener("load", async () => {
	window.scrollTo(0, 0);
	let a = await loadClient();
	getVideos();
	window.scrollTo(0, 0);
});
const loadBtn = document.querySelector("#loadButton");
loadBtn.addEventListener("click", (e) => {
	loadBtn.children[0].classList.remove("hidden");
	loadBtn.children[0].play();
	let tl1 = gsap.timeline();
	tl1.to("#loadingScreen", {
		filter: "blur(10pt)",
		opacity: 0,

		duration: 0.5,
		delay: 1,
		onComplete: () => {
			document.querySelector("#loadingScreen").classList.add("hidden");
			document.body.style.overflowY = "auto";
		},
	});
	tl1.to(
		".scroll-elem",
		{
			filter: "blur(0pt)",
			opacity: 1,
		},
		"<"
	);
});
