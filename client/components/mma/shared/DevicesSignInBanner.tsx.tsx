import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans17,
	textSans20,
	textSansBold17,
	textSansBold20,
} from '@guardian/source/foundations';
import { useMemo } from 'react';
import { useWindowWidth } from '@/client/utilities/hooks/useWindowWidth';

interface DownloadAppCtaVariation1Props {
	additionalCss?: SerializedStyles;
}

const containerCss = css`
	display: flex;
	align-items: stretch;
	border-radius: ${space[2]}px;
	background-color: ${palette.brand[500]};
`;

const copyContainerCss = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: ${space[1]}px;

	padding: ${space[3]}px;
	padding-right: 0px;
	color: ${palette.neutral[100]};

	h4 {
		${textSansBold17};
		margin: 0;

		${from.tablet} {
			${textSansBold20};
		}
	}

	p {
		${textSans17};
		margin: 0;

		${from.tablet} {
			${textSans20};
		}
	}
`;

const heroImageCss = css`
	border-radius: 0 ${space[2]}px ${space[2]}px 0;
`;

export const DevicesSignInBanner = (props: DownloadAppCtaVariation1Props) => {
	const { windowWidthIsGreaterThan } = useWindowWidth();

	const heroImage = useMemo(() => {
		if (windowWidthIsGreaterThan('tablet')) {
			return 'https://i.guim.co.uk/img/media/02d38d3e83d0fe0858d3977fe3b5e255e6137c08/0_0_240_110/240.jpg?width=240&quality=100&s=a4926f6d81116f4ef8ea653d62679b5e';
		}

		return 'https://i.guim.co.uk/img/media/9caad9a6d6856ec18ad2f12eb17a0da1c42bcbe6/0_0_196_146/196.jpg?width=196&quality=100&s=390ade47c1278d67e13a1b819b5760e4';
	}, [windowWidthIsGreaterThan]);

	return (
		<div css={[containerCss, props.additionalCss]}>
			<div css={copyContainerCss}>
				<h4>Sign in on all your devices</h4>
				<p>
					To access your exclusive extras on our website and app,
					please sign in. It takes less than a minute.
				</p>
			</div>

			<img css={heroImageCss} src={heroImage} />
		</div>
	);
};
