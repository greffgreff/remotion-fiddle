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

const CLAMP = {
	easing: Easing.bezier(0.49, 0.19, 0.43, 0.84),
	extrapolateLeft: 'clamp',
	extrapolateRight: 'clamp',
} as const;

export const Video: React.FC<{}> = () => {
	const background = staticFile('bg8.jpg');
	const audio = staticFile('audio.mp3');

	const {height, width} = useVideoConfig();
	const frame = useCurrentFrame();

	const paths = SvgPaths.defaultPaths.map((p) =>
		Skia.Path.MakeFromSVGString(p)
	);
	const clipPaths = SvgPaths.defaultClipPaths.map((p) =>
		Skia.Path.MakeFromSVGString(p)
	);

	const progress = interpolate(frame, [0, 240], [0, 2.5], CLAMP);
	const stroke = interpolate(frame, [0, 100], [0, 30], CLAMP);

	const [palette, setPalette] = useState<string[]>();

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
			<SkiaCanvas height={height} width={width}>
				<>
					{palette?.map((color, c) => (
						<>
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
										end={progress - 0.1 * (c + p)}
										color={'transparent'}
									>
										<Paint
											style={'stroke'}
											strokeWidth={stroke}
											strokeCap={'round'}
											strokeJoin={'round'}
											color={'white'}
										/>
									</Path>
								))}
							/>
						</>
					))}
				</>
				{/* <Mask mask={<Circle cx={128} cy={128} r={128} color="white" />}>
					<Rect x={0} y={0} width={256} height={256} color="lightblue" />
				</Mask> */}
			</SkiaCanvas>
			<Img style={image} src={background} />
			<Audio src={audio} />
		</AbsoluteFill>
	);
};

const logoStyle: CSSProperties = {
	position: 'absolute',
	// top: '50%',
	// left: '50%',
	// transform: 'translate(-50%, -50%)',
	width: 680,
	fontSize: 100,
	fontFamily: 'Bluetea',
	fontWeight: 500,
	color: 'white',
};

const image: CSSProperties = {
	position: 'absolute',
	// top: '50%',
	// left: '50%',
	// transform: 'translate(-50%, -50%)',
	objectFit: 'cover',
	height: '100%',
	zIndex: -99,
};
