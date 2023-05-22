function monthAnimations(tl) {
	let s = document.querySelector(".scroll-list");

	for (let index = 0; index <= s.childElementCount; index++) {
		const prevPrevPage = s.children[index - 2];
		const prevPage = s.children[index - 1];
		const page = s.children[index];
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
					color: getComputedStyle(
						document.documentElement
					).getPropertyValue("--color-2"),
				},
				"<"
			);
		}

		if (index < s.childElementCount) {
			tl.to(page, {
				y: 0,
				delay: index == 1 ? 20 : 5,
				onStart: function () {
					let seek = 40;
					switch (index + 1) {
						case 1:
							seek = 51;
							break;
						case 2:
							seek = 64;
							break;
						case 3:
							seek = 65;
							break;
						case 4:
							seek = 35;
						case 5:
							break;
						case 6:
							seek = 60;
							break;
						case 7:
							seek = 71;
							break;
						case 9:
							seek = 42;
							break;
						case 10:
							seek = 37;
							break;

						case 11:
							seek = 45;
							break;
						case 12:
							seek = 43;
							break;
					}
					players[`player${index + 1}`].seekTo(seek);
					players[`player${index + 1}`].unMute();
				},
				onUpdate: function () {
					if (index > 0) {
						players[`player${index}`].setVolume(
							100 - this.ratio * 100
						);
					}
					players[`player${index + 1}`].setVolume(this.ratio * 100);
				},
			});
			tl.fromTo(
				page.firstElementChild,
				{
					fontSize: "7em",
					opacity: 0,
					filter: "blur(40pt)",
					paddingLeft: "1em",
					letterSpacing: "3em",
					fontWeight: 300,
				},
				{
					fontSize: "7em",
					opacity: 1,
					top: "50%",
					filter: "blur(0pt)",
					letterSpacing: "1em",
					fontWeight: 600,
				},
				"<"
			);
			tl.to(
				".music-player-wrapper span ul",
				{
					x: "-=240pt",
				},
				"<"
			);
			if (prevPage) {
				tl.to(
					prevPage.lastElementChild,
					{
						opacity: 0,
						onComplete: function () {
							prevPage.querySelector("lottie-player").pause();
						},
						onStart: function () {
							prevPage.querySelector("lottie-player").play();
						},
					},
					"<"
				);
			}
			tl.to(page.querySelector(".message-container"), {
				opacity: 1,
				duration: 10,
			});
			tl.to(page.querySelector(".message-body"), {
				opacity: 1,
				y: 0,
			});
			tl.to(
				page.querySelector("lottie-player"),
				{
					opacity: 1,
					y: 0,
				},
				"<"
			);
			tl.to(
				page.querySelector(".message-body h6"),
				{
					opacity: 1,
					y: 0,
				},
				"<"
			);
			tl.to(
				page.querySelector(".message-body p"),
				{
					opacity: 1,
					y: 0,
				},
				"<"
			);
		}
	}
}
