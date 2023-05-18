gsap.registerPlugin("ScrollTrigger");

// function page4Anim() {
// 	// document.querySelector("[data-page='4']").style.background = "black";
// }
function togglePageHide() {
	for (let index = 0; index < 3; index++) {
		let elem = document.querySelector(`section[data-page='${index + 1}'`);
		elem.classList.toggle("hidden");
	}
}
function mainTimeline() {
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

	tl.add(monthAnimations());
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
					videoId: "eRPF_MR6o4g",
				});
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
const key = "AIzaSyDj-jWbR9jnqRlLxOIGTfNeZom0FeqwSBY";
const tl = gsap.timeline({
	scrollTrigger: {
		trigger: ".scroll-elem",
		start: "top top",
		end: "+=1000",
		scrub: 2,
		pin: true,
	},
});

gapi.load("client:auth2");
window.addEventListener("load", async () => {
	let a = await loadClient();
	getVideos();
	mainTimeline();
});
// tl.to("[data-page='10']", {
// 	yPercent: -200,
// 	onComplete: page4Anim,
// });

// //
// let a = document.querySelector("section[data-page='10']");

// for (let i = 1; i < 5; i++) {
// 	let x = (y = -50);
// 	switch (i) {
// 		case 2:
// 			x = 50;
// 			y = -50;
// 			break;
// 		case 3:
// 			x = -50;
// 			y = 50;
// 			break;
// 		case 4:
// 			x = 50;
// 			y = 50;
// 			break;

// 		default:
// 			break;
// 	}
// 	tl.to("img:nth-child(" + i + ")", {
// 		width: a.clientWidth / 2,
// 		height: a.clientHeight / 2,
// 	});
// 	tl.fromTo(
// 		"img:nth-child(" + i + ")",
// 		{ xPercent: 100 + x, yPercent: 100 + y },
// 		{ xPercent: x, yPercent: y }
// 	);
// 	tl.to("img:nth-child(" + i + ")", {
// 		scale: 1,
// 		opacity: 1,
// 		filter: "blur(0px)",
// 	});
// }
