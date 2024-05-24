import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	background,
	focusHalo,
	height,
	palette,
	space,
	text,
	textSans,
	transitions,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import type * as React from 'react';
import { ErrorIcon } from '../../mma/shared/assets/ErrorIcon';

interface UploadFileUploadProps {
	title: string;
	allowedFileFormats: string[];
	changeSetState?: (value: File | undefined) => void;
	description?: string;
	optional?: true;
	inErrorState?: boolean;
	errorMessage?: string;
	additionalCss?: SerializedStyles;
}

export const UploadFileInput = (props: UploadFileUploadProps) => {
	const [selectedFile, setSelectedFile] = useState<File | undefined>();
	useEffect(() => {
		props.changeSetState?.(selectedFile);
	}, [selectedFile]);
	return (
		<label
			css={css`
				display: block;
				color: ${palette.neutral['7']};
				${textSans.medium()};
				font-weight: bold;
				${props.additionalCss}
			`}
		>
			{props.title}
			{props.optional && (
				<span
					css={css`
						font-style: italic;
						font-weight: normal;
						color: ${palette.neutral['46']};
					`}
				>
					{' '}
					optional
				</span>
			)}
			{props.description && (
				<span
					css={css`
						display: block;
						font-weight: normal;
						color: ${palette.neutral['46']};
					`}
				>
					{props.description}
				</span>
			)}
			{props.inErrorState && (
				<span
					css={css`
						display: block;
						font-weight: normal;
						color: ${palette.error[400]};
					`}
				>
					<ErrorIcon
						additionalCss={css`
							margin-right: 4px;
						`}
					/>
					{props.errorMessage}
				</span>
			)}
			<input
				type="file"
				name="imageAttachment"
				accept={props.allowedFileFormats.join()}
				multiple={false}
				css={css`
					display: none;
				`}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					const file = e.target.files?.[0];
					if (file) {
						setSelectedFile(file);
					}
				}}
			/>
			<div
				css={css`
					display: block;
					margin-top: ${space[2]}px;
				`}
			>
				<span
					css={css`
						height: ${height.ctaMedium}px;
						min-height: ${height.ctaMedium}px;
						padding: 0 ${space[5]}px;
						border-radius: ${height.ctaMedium}px;
						display: inline-flex;
						justify-content: space-between;
						align-items: center;
						box-sizing: border-box;
						border: none;
						background-color: ${background.ctaSecondary};
						color: ${text.ctaSecondary};
						cursor: pointer;
						transition: ${transitions.medium};
						text-decoration: none;
						white-space: nowrap;
						&:focus {
							${focusHalo};
						}
						&:hover {
							background-color: ${background.ctaSecondaryHover};
						}
					`}
				>
					Choose file
				</span>
				{selectedFile && (
					<Button
						priority="subdued"
						cssOverrides={css`
							margin-left: ${space[3]}px;
							text-decoration: underline;
						`}
						onClick={(event) => {
							event.preventDefault();
							setSelectedFile(undefined);
						}}
					>
						Cancel
					</Button>
				)}
				<span
					css={css`
						display: inline-flex;
						margin-left: ${space[3]}px;
						font-weight: normal;
						color: ${props.inErrorState
							? palette.error[400]
							: palette.neutral['46']};
					`}
				>
					{selectedFile?.name}
				</span>
			</div>
		</label>
	);
};
