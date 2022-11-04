import * as React from 'react';

const LogoSvg = (
	props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 690.96 180.75"
		{...props}
	>
		<title>{'Asset 1'}</title>
		<g data-name="Layer 2">
			<text
				transform="translate(6.86 126.81)"
				style={{
					fontSize: 145,
					fill: '#fff',
					fontFamily: 'Bluetea',
				}}
				data-name="Layer 1"
			>
				{'Peacefully'}
			</text>
		</g>
	</svg>
);

export default LogoSvg;
