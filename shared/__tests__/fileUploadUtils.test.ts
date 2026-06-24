import { base64FromFile } from '../fileUploadUtils';

const HELLO_BASE64 = 'aGVsbG8=';
const helloArrayBuffer = () =>
	new Uint8Array([104, 101, 108, 108, 111]).buffer.slice(0);

class MockFileReader {
	result: string | ArrayBuffer | null = null;
	error: DOMException | null = null;
	protected handlers: Record<string, EventListener[]> = {};

	addEventListener(type: string, listener: EventListener) {
		if (!this.handlers[type]) {
			this.handlers[type] = [];
		}
		this.handlers[type].push(listener);
	}

	readAsDataURL(_file: File) {
		this.result = `data:text/plain;base64,${HELLO_BASE64}`;
		const loadEvent = new Event('load');
		(this.handlers.load || []).forEach((listener) => listener(loadEvent));
	}
}

class MockFileReaderWithError extends MockFileReader {
	override readAsDataURL(_file: File) {
		this.error = new DOMException(
			'Could not read selected file',
			'NotReadableError',
		);
		const errorEvent = new Event('error');
		(this.handlers.error || []).forEach((listener) => listener(errorEvent));
	}
}

const createFileLike = (arrayBufferImpl?: () => Promise<ArrayBuffer>): File =>
	({
		name: 'test.txt',
		type: 'text/plain',
		arrayBuffer: arrayBufferImpl,
	} as unknown as File);

describe('base64FromFile', () => {
	const originalFileReader = globalThis.FileReader;
	const originalBuffer = globalThis.Buffer;
	const originalBtoa = globalThis.btoa;

	afterEach(() => {
		globalThis.FileReader = originalFileReader;
		globalThis.Buffer = originalBuffer;
		globalThis.btoa = originalBtoa;
	});

	test('returns consistent base64 output from FileReader and arrayBuffer paths', async () => {
		globalThis.FileReader = MockFileReader as unknown as typeof FileReader;

		const fileReaderOutput = await base64FromFile(createFileLike());

		globalThis.FileReader = undefined as unknown as typeof FileReader;
		const arrayBufferOutput = await base64FromFile(
			createFileLike(async () => helloArrayBuffer()),
		);

		expect(fileReaderOutput).toBe(HELLO_BASE64);
		expect(arrayBufferOutput).toBe(HELLO_BASE64);
		expect(arrayBufferOutput).toBe(fileReaderOutput);
	});

	test('throws a clear error when file reading is unsupported', async () => {
		globalThis.FileReader = undefined as unknown as typeof FileReader;
		const unsupportedFile = createFileLike(undefined);

		await expect(base64FromFile(unsupportedFile)).rejects.toThrow(
			'This browser does not support reading uploaded files.',
		);
	});

	test('includes FileReader details when read fails', async () => {
		globalThis.FileReader =
			MockFileReaderWithError as unknown as typeof FileReader;

		await expect(base64FromFile(createFileLike())).rejects.toThrow(
			'base64FromFile read error: NotReadableError - Could not read selected file',
		);
	});

	test('throws a clear error when no base64 encoder is available for arrayBuffer path', async () => {
		globalThis.FileReader = undefined as unknown as typeof FileReader;
		globalThis.Buffer = undefined as unknown as typeof Buffer;
		globalThis.btoa = undefined as unknown as typeof btoa;

		const file = createFileLike(async () => helloArrayBuffer());

		await expect(base64FromFile(file)).rejects.toThrow(
			'No available base64 encoder in this browser.',
		);
	});
});
