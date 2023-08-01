export const base64ToBlob = (
  base64: string,
  contentType: string
): Blob | undefined => {
  const bin = atob(base64.replace(/^.*,/, ''));

  const buffer = new Uint8Array(bin.length).map((_, i) => bin.charCodeAt(i));

  let blob: Blob;

  try {
    blob = new Blob([buffer.buffer], {
      type: contentType,
    });
  } catch (e) {
    console.error('error : ', e);
    return;
  }
  return blob;
};
