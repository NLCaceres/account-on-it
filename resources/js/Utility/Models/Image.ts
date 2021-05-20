export default interface Image {
  src: string,
  alt: string
}

export interface HasImage {
  img?: Image
}