export const base64FromFile = (file: File) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.addEventListener(
			'load',
			() => {
				resolve(
					removeDataUrlDeclarationFromBase64(reader.result as string),
				);
			},
			false,
		);

		reader.addEventListener(
			'error',
			() => {
				reject(new Error('base64FromFile error'));
			},
			false,
		);

		reader.readAsDataURL(file);
	});
};

export const MAX_FILE_ATTACHMENT_SIZE_KB = 5000;
export const MAX_AVATAR_FILE_SIZE_KB = 1000;

export const VALID_IMAGE_FILE_MIME_TYPES: string[] = [
	'image/png',
	'image/jpeg',
	'image/jpg',
	'image/gif',
	'application/pdf',
];

export const VALID_IMAGE_FILE_EXTENSIONS: string[] = [
	'.png',
	'.jpeg',
	'.jpg',
	'.gif',
	'.pdf',
];

export const VALID_AVATAR_FILE_EXTENSIONS: string[] = [
	'.png',
	'.jpeg',
	'.jpg',
	'.gif',
];

export const VALID_AVATAR_MIME_TYPES: string[] = [
	'image/png',
	'image/jpeg',
	'image/jpg',
	'image/gif',
];

export type FileAttachment = {
	name: string;
	type: string;
	contents: string;
};

export const validateFileAttachment = (
	payload: FileAttachment,
	maxFileSize: number = MAX_FILE_ATTACHMENT_SIZE_KB,
) =>
	validateBase64FileSize(payload.contents, maxFileSize) &&
	validateImageFileExtension(payload.name);

export const validateBase64FileSize = (
	fileBase64: string,
	maxFileSize: number = MAX_FILE_ATTACHMENT_SIZE_KB,
) => {
	// calculate the file size of the image based on the base64 string, as per:
	// https://softwareengineering.stackexchange.com/questions/288670/know-file-size-with-a-base64-string
	const fileSizeInKb = (fileBase64.length * (3 / 4)) / 1024;
	return fileSizeInKb <= maxFileSize;
};

export const validateImageFileExtension = (fileName: string) =>
	VALID_IMAGE_FILE_EXTENSIONS.filter((validFileExtension) =>
		fileName.endsWith(validFileExtension),
	).length > 0;

export const validateAvatarFile = (
	file: File | null,
): { valid: boolean; error?: string } => {
	if (!file) {
		return { valid: false, error: 'Please select an image to upload.' };
	}

	const hasValidExtension = VALID_AVATAR_FILE_EXTENSIONS.some((ext) =>
		file.name.toLowerCase().endsWith(ext),
	);

	const isValidType = file.type
		? VALID_AVATAR_MIME_TYPES.includes(file.type)
		: hasValidExtension;

	if (!isValidType) {
		return {
			valid: false,
			error: `Only ${VALID_AVATAR_FILE_EXTENSIONS.join(', ')} files are accepted.`,
		};
	}

	const maxSizeBytes = MAX_AVATAR_FILE_SIZE_KB * 1024;
	const maxSizeLabel =
		MAX_AVATAR_FILE_SIZE_KB >= 1024
			? `${Math.round(MAX_AVATAR_FILE_SIZE_KB / 1024)}MB`
			: `${MAX_AVATAR_FILE_SIZE_KB}KB`;

	if (file.size > maxSizeBytes) {
		return {
			valid: false,
			error: `File must be ${maxSizeLabel} or smaller. Your file is ${Math.round(file.size / 1024)}KB.`,
		};
	}

	return { valid: true };
};

const removeDataUrlDeclarationFromBase64 = (fileBase64: string) =>
	fileBase64.replace(/data:(.*)base64,/m, '');

export const base64ToBlob = (base64: string) =>
	new Blob([Buffer.from(base64, 'base64')]);
