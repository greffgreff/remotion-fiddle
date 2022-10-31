import Vibrant from 'node-vibrant';
import {CSSProperties, useEffect, useState} from 'react';
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

	const [palette, setPalette] = useState<string[]>();

	useEffect(() => {
		Vibrant.from(background)
			.getPalette()
			.then((palette) => {
				const parsedPalette = Object.keys(palette).map((c) =>
					// @ts-ignore
					palette[c].rgb.toString()
				);
				setPalette(parsedPalette);
			});
	});

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
			{palette?.map((c, i) => {
				return (
					<AbsoluteFill
						key={i}
						style={{
							backgroundColor: `rgb(${c})`,
							transform: `translateX(${
								i * 50 + (1920 - 50 * palette.length)
							}px)`,
						}}
					/>
				);
			})}
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
	color: 'white',
};

const image: CSSProperties = {
	position: 'absolute',
	objectFit: 'cover',
	height: '100%',
	zIndex: -99,
};
