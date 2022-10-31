import {CSSProperties} from 'react';
import {
	AbsoluteFill,
	Img,
	Audio,
	useCurrentFrame,
	interpolate,
	staticFile,
} from 'remotion';

export const Video: React.FC<{}> = () => {
	const background = staticFile('bg2.jpg');
	const song = staticFile('song.mp3');
	const frame = useCurrentFrame();
	const fadeOut = interpolate(frame, [260, 380], [1, 0]);
	const blur = interpolate(frame, [60, 180], [7, 0]);

	return (
		<AbsoluteFill>
			<div id="clipping" style={{...logoStyle, opacity: fadeOut}}>
				Peacefully
			</div>
			<Img
				id="background"
				style={{...image, filter: `blur(${blur}px)`}}
				src={background}
			/>
			<Audio src={song} />
		</AbsoluteFill>
	);
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
