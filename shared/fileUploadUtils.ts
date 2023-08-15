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
				reject();
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

const removeDataUrlDeclarationFromBase64 = (fileBase64: string) =>
	fileBase64.replace(/data:(.*)base64,/m, '');

export const base64ToBlob = (base64: string) =>
	new Blob([Buffer.from(base64, 'base64')]);
