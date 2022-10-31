gsap.registerPlugin(CustomEase, CustomBounce);

gsap.set('.path', {
	drawSVG: '0% 0%',
});
gsap.set('.dot-group', {
	yPercent: 100,
});

CustomBounce.create('myBounce', {strength: 0.6, squash: 2});

let tl = gsap.timeline();

tl.addLabel('i', 2.85)
	.set('.logo', {autoAlpha: 1})
	.to('.cPath', {
		duration: 0.5,
		drawSVG: '100%',
		ease: Linear.easeNone,
		stagger: 0.2,
	})
	.to(
		'.a1Path',
		{duration: 0.25, drawSVG: '100%', ease: Linear.easeNone, stagger: 0.2},
		'-=0.35'
	)
	.to(
		'.a2Path',
		{duration: 0.25, drawSVG: '100%', ease: Linear.easeNone, stagger: 0.1},
		'-=0.04'
	)
	.to(
		'.s1Path',
		{duration: 0.4, drawSVG: '100%', ease: Linear.easeNone, stagger: 0.1},
		'-=0.02'
	)
	.to(
		'.s2Path',
		{duration: 0.3, drawSVG: '100%', ease: Linear.easeNone, stagger: 0.07},
		'-=0.1'
	)
	.to(
		'.s3Path',
		{duration: 0.4, drawSVG: '100%', ease: Linear.easeNone, stagger: 0.1},
		'-=0.4'
	)
	.to(
		'.s4Path',
		{duration: 0.2, drawSVG: '100%', ease: Linear.easeNone, stagger: 0.07},
		'-=0.1'
	)
	.from('#dot', {duration: 0.01, autoAlpha: 0}, '-=0.03')
	.to('#dot', {duration: 0.4, yPercent: -500, ease: Power4.easeOut}, '-=0.01')
	.to('.dot-group', {duration: 0.4, scale: 1.4, ease: Power4.easeOut}, '-=0.4')
	.to('#dot', {duration: 0.9, yPercent: -150, ease: 'myBounce'})
	.to('#dot', {
		duration: 0.9,
		scaleY: 0.6,
		scaleX: 1.2,
		ease: 'myBounce-squash',
		transformOrigin: 'bottom',
		delay: -0.9,
	})
	.to(
		'.iPath',
		{duration: 0.5, drawSVG: '100%', ease: Linear.easeNone, stagger: 0.05},
		'i'
	)
	.to(
		'.ePath',
		{duration: 0.5, drawSVG: '100%', ease: Linear.easeNone, stagger: 0.05},
		'-=0.3'
	);

// GSDevTools.create();
