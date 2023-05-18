function monthAnimations() {
	duration = 2;
	const tl = gsap.timeline();
	let s = document.querySelector(".scroll-list");

	for (let index = 0; index < s.childElementCount; index++) {
		const prevPrevPage = s.children[index - 2];
		const prevPage = s.children[index - 1];
		const page = s.children[index];
		tl.add(
			gsap.to(page, {
				y: 0,
				onStart: () => {
					for (let j = 0; j < s.childElementCount; j++) {
						const element = players[`player${j + 1}`];
						if (j == index) {
							element.unMute();
							element.playVideo();
							element.seekTo(40);
						}
					}
				},
				onUpdate: function () {
					if (index > 0) {
						players[`player${index}`].setVolume(
							100 - this.ratio * 100
						);
					}
					players[`player${index + 1}`].setVolume(this.ratio * 100);
				},
			})
		);

		if (prevPrevPage) {
			tl.to(
				prevPrevPage.firstElementChild,
				{
					opacity: 0,
					top: "0em",
					filter: "blur(10pt)",
				},
				"<"
			);
		}
		if (prevPage) {
			tl.to(
				prevPage.firstElementChild,
				{
					fontSize: "2em",
					opacity: 0.5,
					top: "1em",
					letterSpacing: "0.1em",
					paddingLeft: "0",
				},
				"<"
			);
		}
		tl.fromTo(
			page.firstElementChild,
			{
				fontSize: "7em",
				opacity: 0,
				filter: "blur(40pt)",
				duration: duration / 2,
				paddingLeft: "1em",
				letterSpacing: "3em",
				fontWeight: 300,
			},
			{
				fontSize: "7em",
				opacity: 1,
				top: "50%",
				filter: "blur(0pt)",
				duration: duration / 2,
				letterSpacing: "1em",
				fontWeight: 500,
			},
			"<"
		);

		tl.add(timelines[page.dataset.month]);
	}
	return tl;
}

function janAnimation() {
	const timeline = timelines[page.dataset.month];

	return timeline;
}

function febAnimation() {
	const timeline = timelines[page.dataset.month];

	return timeline;
}

function marAnimation() {
	const timeline = timelines[page.dataset.month];

	return timeline;
}

function aprAnimation() {
	const timeline = timelines[page.dataset.month];

	return timeline;
}

function mayAnimation() {
	const timeline = timelines[page.dataset.month];

	return timeline;
}

function junAnimation() {
	const timeline = timelines[page.dataset.month];

	return timeline;
}

function julAnimation() {
	const timeline = timelines[page.dataset.month];

	return timeline;
}

function augAnimation() {
	const timeline = timelines[page.dataset.month];

	return timeline;
}

function sepAnimation() {
	const timeline = timelines[page.dataset.month];

	return timeline;
}

function octAnimation() {
	const timeline = timelines[page.dataset.month];

	return timeline;
}

function novAnimation() {
	const timeline = timelines[page.dataset.month];

	return timeline;
}

function decAnimation() {
	const timeline = timelines[page.dataset.month];

	return timeline;
}

let timelines = {
	jan: gsap.timeline(),
	feb: gsap.timeline(),
	mar: gsap.timeline(),
	apr: gsap.timeline(),
	may: gsap.timeline(),
	jun: gsap.timeline(),
	jul: gsap.timeline(),
	aug: gsap.timeline(),
	sep: gsap.timeline(),
	oct: gsap.timeline(),
	nov: gsap.timeline(),
	dec: gsap.timeline(),
};
