import {CSSProperties, useEffect, useState} from 'react';
import {
	AbsoluteFill,
	Img,
	Audio,
	useCurrentFrame,
	interpolate,
	staticFile,
	useVideoConfig,
	Easing,
} from 'remotion';
import {Paint, Mask, Path, Skia} from '@shopify/react-native-skia';
import {SkiaCanvas} from '@remotion/skia';
import Vibrant from 'node-vibrant';
import {SvgPaths} from './assets';
import {colord} from 'colord';

export const Video: React.FC<{}> = () => {
	const background = staticFile('bg14.jpg');
	const audio = staticFile('audio.mp3');
	const {height, width, fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const [palette, setPalette] = useState<string[]>();

	const paths = SvgPaths.defaultPaths.map((p) =>
		Skia.Path.MakeFromSVGString(p)
	);
	const clipPaths = SvgPaths.defaultClipPaths.map((p) =>
		Skia.Path.MakeFromSVGString(p)
	);
	const clamp = {
		easing: Easing.bezier(0.49, 0.19, 0.43, 0.84),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	} as const;

	const startAnimation = 3;
	const logoDuration = 3;
	const endAnimation = 2;

	const animationProgress = interpolate(
		frame,
		[
			0,
			fps * startAnimation,
			fps * (startAnimation + logoDuration),
			fps * (startAnimation + logoDuration + endAnimation),
		],
		[0, 2.5, 2.5, 0],
		clamp
	);
	const strokeProgress = interpolate(
		frame,
		[
			0,
			fps * startAnimation - 100,
			fps * (startAnimation + logoDuration) + 50,
			fps * (startAnimation + logoDuration + endAnimation),
		],
		[0, 30, 30, 0],
		clamp
	);

	useEffect(() => {
		Vibrant.from(background)
			.getPalette()
			.then((palette) => {
				const rgbPalette = Object.keys(palette).map((c) =>
					// @ts-ignore
					palette[c].rgb.toString()
				);
				const parsedPalette = rgbPalette
					.sort(
						(rgb1, rgb2) =>
							colord(`rgb(${rgb2})`).brightness() -
							colord(`rgb(${rgb1})`).brightness()
					)
					.reverse();
				parsedPalette.push('255,255,255');
				setPalette(parsedPalette);
			});
	}, []);

	return (
		<AbsoluteFill>
			<AbsoluteFill style={logo}>
				<SkiaCanvas height={height} width={width}>
					{palette?.map((color, c) => (
						<Mask
							children={clipPaths.map((path) => (
								<Path
									id={c}
									// @ts-ignore
									path={path}
									color={`rgb(${color})`}
								/>
							))}
							mask={paths.map((path, p) => (
								<Path
									id={p}
									// @ts-ignore
									path={path}
									end={animationProgress - 0.1 * (c + p)}
									color={'transparent'}
								>
									<Paint
										style={'stroke'}
										strokeWidth={strokeProgress}
										strokeCap={'round'}
										strokeJoin={'round'}
										color={'white'}
									/>
								</Path>
							))}
						/>
					))}
				</SkiaCanvas>
			</AbsoluteFill>
			<Img style={image} src={background} />
			<Audio src={audio} />
		</AbsoluteFill>
	);
};

const logo: CSSProperties = {
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%) scale(0.5)',
	// background: 'red',
	width: 690,
	height: 170,
};

const image: CSSProperties = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	// objectFit: 'cover',
	// height: '100%',
	zIndex: -99,
};
