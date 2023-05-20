function imageSlide(tl) {
	tl.to("[data-page='10']", {
		yPercent: -200,
	});

	//
	let a = document.querySelector("section[data-page='10']");

	[45, 46, 55, 56].forEach((n) => {
		tl.to("img:nth-child(" + n + ")", {
			scale: 1,
			opacity: 1,
			filter: "blur(0px)",
		});
	});
	tl.to(".image-container", {
		width: "150%",
		duration: 5,
	});
}

const page = document.querySelector("[data-page='10']");
let imageContainer = page.querySelector(".image-container");
let a = FileReader;
for (let imageIndex = 0; imageIndex < 100; imageIndex++) {
	const imageElem = document.createElement("img");
	let src = `./images/${imageIndex + 1}`;
	fetch(src + ".png").then((r) => {
		if (r.status == 404) {
			src += ".jpg";
		} else {
			src += ".png";
		}
		imageElem.src = src;
		imageElem.classList.add("image");
		imageContainer.appendChild(imageElem);
	});
}
