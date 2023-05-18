const page4 = document.querySelector("section[data-page='4'");
function moveGradient(e) {
	gsap.to("section[data-page='4'", {
		"--x": e.clientX + "px",
		"--y": e.clientY + "px",
	});
}

function addHover() {
	document.body.style.cursor = "none";
	gsap.fromTo(
		"section[data-page='4'",
		{
			"--grad-width": "30%",
		},
		{
			"--grad-width": "20%",
			repeat: -1,
			yoyo: true,
			duration: 10,
		}
	);
	window.addEventListener("mousemove", moveGradient);
}
