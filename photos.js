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
	if (92 < imageIndex < 94) {
		src += ".png";
	} else {
		src += ".jpg";
	}
	imageElem.src = src + "?nf_resize=smartcrop&w=200";
	imageElem.classList.add("image");
	imageContainer.appendChild(imageElem);
}
