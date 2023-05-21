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
			tl.add(
				gsap.to(page, {
					y: 0,
					onUpdate: function () {
						if (index > 0) {
							players[`player${index}`].setVolume(
								100 - this.ratio * 100
							);
						}
						players[`player${index + 1}`].setVolume(
							this.ratio * 100
						);
					},
				})
			);
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
			});
			tl.to(page.querySelector(".message-body"), {
				opacity: 1,
				y: 0,
			});
		}
	}
}
