import type { CMP } from '@guardian/libs';
import { from } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { gridItemPlacement } from '../../../styles/grid';
import { WithStandardTopMargin } from '../../shared/WithStandardTopMargin';
import { Lines } from '../identity/Lines';
import { CookiesOnThisBrowserSection } from './CookiesOnTheBrowserSection';
import { dataPrivacyWrapper } from './DataPrivacy.styles';
import { LearnMoreSection } from './LearnMoreSection';

export const DataPrivacyPage = () => {
	const [importedCmp, setImportedCmp] = useState<CMP | null>(null);

	/**
	 * This function imports and loads the cmp app to the state value, importedCmp
	 *
	 */
	const loadCMP = () => {
		import('@guardian/libs').then(({ cmp }) => {
			setImportedCmp(cmp);
		});
	};

	useEffect(() => {
		loadCMP();
	}, [importedCmp]);

	/**
	 * This function triggers importedCmp?.showPrivacyManage
	 * if it has loaded.
	 *
	 * The importedCmp is lazy loaded.
	 *
	 */
	const openManageCookies = () => {
		importedCmp?.showPrivacyManager();
	};

	const content = () => (
		<div css={dataPrivacyWrapper}>
			<div
				css={{
					...gridItemPlacement(1, 12),

					[from.tablet]: {
						...gridItemPlacement(1, 12),
					},

					[from.desktop]: {
						...gridItemPlacement(1, 10),
					},

					[from.wide]: {
						...gridItemPlacement(1, 14),
					},
				}}
			>
				<WithStandardTopMargin>
					<CookiesOnThisBrowserSection onClick={openManageCookies} />
					<Lines n={1} />
					<LearnMoreSection />
				</WithStandardTopMargin>
			</div>
		</div>
	);

	return <>{content()}</>;
};
