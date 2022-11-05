import {Composition, registerRoot} from 'remotion';
import {LoadSkia} from '@shopify/react-native-skia/src/web';

//npx remotion render src/index.tsx video out/video.mp4 --props=/Users/chandlergreff/Desktop/my-video/public/data.json

(async () => {
	await LoadSkia();
	const {Video} = await import('./Video');

	registerRoot(() => {
		return (
			<Composition
				id="video"
				component={Video}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>
		);
	});
})();
