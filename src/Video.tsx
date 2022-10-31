import {CSSProperties, useEffect, useState} from 'react';
import {
	AbsoluteFill,
	Img,
	Audio,
	useCurrentFrame,
	interpolate,
	staticFile,
	spring,
	useVideoConfig,
} from 'remotion';

export const Video: React.FC<{}> = () => {
	const background = staticFile('bg2.jpg');
	const song = staticFile('song.mp3');
	const logoAnimation = staticFile('test.svg');

	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	const fadeOut = interpolate(frame, [260, 380], [1, 0]);
	const blur = interpolate(frame, [60, 180], [7, 0]);

	// TweenMax.fromTo('.squiggle', 2, {drawSVG: '0%'}, {drawSVG: '100%'});

	return (
		<AbsoluteFill>
			{/* <div id="clipping" style={{...logoStyle, opacity: fadeOut}}>
				Peacefully
			</div> */}
			<Img style={logoAnimationStyle} src={logoAnimation} />
			<Img
				id="background"
				style={{...image, filter: `blur(${blur}px)`}}
				src={background}
			/>
			<Audio src={song} />
		</AbsoluteFill>
	);
};

const logoAnimationStyle: CSSProperties = {
	clipPath: 'url(#clipping)',
	position: 'absolute',
	top: '54.3%',
	left: '49.4%',
	transform: 'translate(-50%, -50%) scale(0.53)',
	strokeOpacity: 0.5,
};

const logoStyle: CSSProperties = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	fontSize: 100,
	fontFamily: 'Bluetea',
	fontWeight: 500,
};

const image: CSSProperties = {
	position: 'absolute',
	objectFit: 'cover',
	height: '100%',
	zIndex: -99,
};
