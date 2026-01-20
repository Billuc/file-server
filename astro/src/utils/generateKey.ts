// Utility function to generate random keys in the format: [a-z]+(-[a-z]+){3}
// Example: aaaaa-bbbbb-ccccc-ddddd

export function generateRandomKey(): string {
  const generateSegment = (): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let segment = '';
    for (let i = 0; i < 5; i++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return segment;
  };

  const segments = [
    generateSegment(),
    generateSegment(),
    generateSegment(),
    generateSegment(),
  ];

  return segments.join('-');
}