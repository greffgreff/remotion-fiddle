import {Composition, registerRoot} from 'remotion';
import {Video} from './Video';

//npx remotion render src/index.tsx video out/video.mp4 --props=/Users/chandlergreff/Desktop/my-video/public/data.json

registerRoot(() => {
	return (
		<Composition
			id="video"
			component={Video}
			durationInFrames={120}
			fps={60}
			width={1920}
			height={1080}
		/>
	);
});
